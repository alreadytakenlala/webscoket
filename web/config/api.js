// #ifdef H5
const baseUrl = "/proxy";
// #endif
// #ifdef MP-WEIXIN
const baseUrl = "http://zkapi.zhaobas.com";
// #endif

export default {
	// 获取平台信息
	GET_PLATFORM_INFO: `${baseUrl}/comm/getPlatformInfo`,
	// 发送验证码
	SEND_VERIFICATION_CODE: `${baseUrl}/comm/sendSmsCode`,
	// 注册
	REGISTER: `${baseUrl}/user/register`,
	// 登陆
	LOGIN: `${baseUrl}/auth/login`,
	// 微信登陆
	WX_LOGIN: `${baseUrl}/auth/wxMpLogin`,
	// 获取用户信息
	GET_USER_INFO: `${baseUrl}/user/getUserInfo`,
	// 获取角色列表
	GET_ROLE_LIST: `${baseUrl}/user/getRoleList`,
	// 获取学校列表
	GET_SCHOOL_LIST: `${baseUrl}/comm/getSchoolList`,
	// 绑定手机号
	BIND_PHONE: `${baseUrl}/user/bindMobile`,
	// 绑定角色
	BIND_ROLE: `${baseUrl}/user/bindRole`,
	// 获取通知列表
	GET_NOTICE_LIST: `${baseUrl}/cms/notice/list`,
	// 发送通知
	SEND_NOTICE: `${baseUrl}/cms/notice/send`,
	// 获取通知详情
	GET_NOTICE_DETAIL: `${baseUrl}/cms/notice/detail`,
	// 获取部门或班级列表
	GET_DEPARTMENT_LIST: `${baseUrl}/contacts/getDepartmentList`,
	// 获取联系人列表
	GET_CONTACTS_LIST: `${baseUrl}/contacts/getContactsList`,
	// 获取类目列表
	GET_CATEGORY_LIST: `${baseUrl}/cms/getCategoryList`,
	// 获取科目列表
	GET_SUBJECT_LIST: `${baseUrl}/comm/getSubjectList`,
	
	/* 首页
	----------------------------*/
	
	// 轮播图
	HOME_SLIDE: `${baseUrl}/cms/getSlideList`,
}