module.exports = {
    /**
     * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
     */
    tokenCookieExpires: 30,

    /**
     * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天s
     */
    passCookieExpires: 30,

    /**
     * @description 请求超时时间，毫秒（默认5秒）
     */
    timeout: 8000,

    /**
     * @description 后端接口地址
     */
    baseURL: process.env.VUE_APP_API_HOST,
    // baseURL: 'https://kygl.hist.edu.cn/',

    /**
     * @description 后端下载/查看文件接口地址
     */
    downloadUrl: 'http://localhost:8090/',

    /**
     * @description 后端上传文件接口地址
     */
    uploadUrl: 'http://localhost:8090/',

    /**
     * 请求体数据类型
     */
    // contentType: 'application/x-www-form-urlencoded',
    contentType: 'application/json',
};