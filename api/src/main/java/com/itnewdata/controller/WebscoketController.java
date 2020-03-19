package com.itnewdata.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.itnewdata.utils.Result;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/websocket/{id}")
@Component
public class WebscoketController {
    private static int onlineCount = 0;
    private static Map<String, WebscoketController> clients = new ConcurrentHashMap<String, WebscoketController>();
    private Session session;
    private String id;
    private Boolean ready = false;

    @OnOpen
    public void onOpen(@PathParam("id") String id, Session session) throws IOException {
        this.id = id;
        this.session = session;
        addOnlineCount();
        clients.put(id, this);
        System.out.println(id+"已连接");
        if (clients.size() > 1) {
            String to = this._getRandomId(id);
            this.sendMessageTo(new Result(101, id), to);
            this.sendMessageTo(new Result(101, to), id);
        }
    }

    private String _getRandomId(String id) {
        for (WebscoketController item : clients.values()) {
            if (!item.id.equals(id)) {
                return item.id;
            }
        }
        return "";
    }

    @OnClose
    public void onClose() throws IOException {
        clients.remove(id);
        subOnlineCount();
        System.out.println(id+"连接已关闭");
    }

    @OnMessage
    public void onMessage(String json) throws IOException {
        JSONObject jsonTo = JSON.parseObject(json);
        if (!jsonTo.get("to").equals("1")) {
            sendMessageTo(jsonTo.get("result"), (String) jsonTo.get("to").toString());
        } else {
            sendMessageAll(jsonTo.get("result"));
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }

    public void sendMessageTo(Object res, String to) throws IOException {
        for (WebscoketController item : clients.values()) {
            if (item.id.equals(to)) {
                item.session.getAsyncRemote().sendText(JSON.toJSONString(res));
            }
        }
    }

    public void sendMessageAll(Object res) throws IOException {
        for (WebscoketController item : clients.values()) {
            item.session.getAsyncRemote().sendText(JSON.toJSONString(res));
        }
    }

    public static synchronized void addOnlineCount() {
        WebscoketController.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebscoketController.onlineCount--;
    }
}
