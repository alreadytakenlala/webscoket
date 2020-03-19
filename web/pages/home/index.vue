<template>
	<view class="home_view-box">
		<view class="top">
			<text class="run" @click="start">{{run}}</text>
			<image class="avatar" src="../../static/img/opponent.jpg"></image>
			<image class="result" :src="oresult"></image>
		</view>
		<view class="bottom">
			<image class="result" :src="mresult"></image>
			<image class="avatar" src="../../static/img/avatar.jpg"></image>
			<view class="options" @click="shot">
				<image src="../../static/img/fist.png" data-tab="fist"></image>
				<image src="../../static/img/shears.png" data-tab="shears"></image>
				<image src="../../static/img/cloth.png" data-tab="cloth"></image>
			</view>
		</view>
	</view>
</template>

<script>
	'use scrict';
	
	export default {
		data() {
			return {
				oresult: "",
				mresult: "",
				run: "未匹配",
				socketOpen: false,
				id: parseInt(Math.random()*1000),
				to: "",
				toReady: false
			}
		},
		onShow: function () {
			uni.connectSocket({
				url: "wss://itnewdata.com:12002/websocket/"+this.id
			});
			uni.onSocketOpen(res => {
				console.log("已接建立连接");
				this.socketOpen = true;
			});
			uni.onSocketMessage(response => {
				let res = JSON.parse(response.data);
				console.log("接收", res);
				if (res.code == 101) {
					this.to = res.data;
					this.run = "已连接";
				} else if (res.code == 102) {
					this.toReady = true;
					this.run === "准备" && (this.run = "开始");
				} else if (res.code == 103) {
					this.oresult = res.url;
				}
			});
		},
		onHide: function () {
			uni.onSocketClose(res => {
				console.log(res);
			});
		},
		methods: {
			send: function (data) {
				console.log("发送", data);
				this.socketOpen && uni.sendSocketMessage({
					data: JSON.stringify(data)
				});
			},
			shot: function (e) {
				const tab = e.target.dataset.tab;
				if (tab === "fist") {
					this.mresult = "../../static/img/fist.png";
				} else if (tab === "shears") {
					this.mresult = "../../static/img/shears.png";
				} else if (tab === "cloth") {
					this.mresult = "../../static/img/cloth.png";
				}
			},
			start: function () {
				if (this.run === "已连接") {
					this.run = this.toReady ? "开始" : "准备";
					this.send({
						to: this.to,
						result: {
							code: 102
						}
					});
				} else if (this.run === "开始") {
					if (!this.mresult) {
						this.$toast({
							title: "请选择出拳|剪|布",
							icon: "none"
						});
						return;
					}
					this.run = 3;
					let time = setInterval(() => {
						 if (this.run <= 0) {
							clearInterval(time);
							this.send({
								to: this.to,
								result: {
									code: 103,
									url: this.mresult
								}
							});
							this.toReady = false;
						} else {
							this.run--;
						}
					}, 1000);
				} else if (this.run === 0) {
					this.run = "已连接";
					this.oresult = "";
					this.mresult = "";
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-image: url(../../static/img/background.png);
	}
	.home_view-box {
		width: 100%;
		height: 100vh;
	}
	.top, .bottom {
		width: 100%;
		height: 50vh;
		position: relative;
		.result {
			width: 200rpx;
			height: 200rpx;
			position: absolute;
			background-color: white;
		}
	}
	.run {
		width: 100rpx;
		text-align: center;
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		padding: 10rpx;
		background-color: #AAAAAA;
		color: white;
		border-radius: 10rpx;
		font-size: 28rpx;
	}
	.avatar {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
	}
	.top {
		border-bottom: 10rpx solid white;
		display: flex;
		flex-direction: column;
		align-items: center;
		.avatar {
			margin-top: 20rpx;
		}
		.result {
			bottom: 50rpx;
			left: calc(50% - 100rpx);
		}
	}
	.bottom {
		.avatar {
			left: 20rpx;
			bottom: 20rpx;
			position: absolute;
		}
		.result {
			position: absolute;
			top: 50rpx;
			left: calc(50% - 100rpx);
		}
		.options {
			position: absolute;
			bottom: 20rpx;
			right: 50rpx;
			image {
				width: 100rpx;
				height: 100rpx;
			}
			image + image {
				margin-left: 50rpx;
			}
		}
	}
</style>
