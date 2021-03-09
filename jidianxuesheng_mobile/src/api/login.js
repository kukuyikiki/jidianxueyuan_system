import request from '@/utils/request'


// 获取验证码
export function getCode() {
    const params = {}
    return request({
        url: '/auth/code',
        method: 'get',
        params
    })
}

export function loginNoCode(user) {
    return request({
        url: '/auth/login-no-code',
        method: 'post',
        data: user
    })
}
export function login(user) {
    return request({
        url: '/auth/login',
        method: 'post',
        data: user
    })
}

//登录失败 存储用户失败次数加一
export function failed (username) {
    return request({
        url: '/api/sys-user/add-fail-count',
        method: 'post',
        // data: user
        params: {
            username: username
        }
    })
}

//判断当前用户是否需要验证码
export function ifCode(params) {
    // const params = {
    //     uuid:user.uuid
    // }
    return request({
        url: '/api/sys-user/is-need-code',
        method: 'get',
        params: {
            username: params
        }
    })
}
