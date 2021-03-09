/**
 * token处理
 */
import Cookies from 'js-cookie'
import Config from '@/settings'

const TokenKey = 'tokenKey';
const UserName = 'userName';

/**
 * 获取token
 */
export function getToken() {
    return Cookies.get("EL-ADMIN-TOEKN");
}

/**
 * 把toke和用户名 存储在cookie里,30天过期,需要重新登录
 * @param {Object} token
 * @param {Object} rememberMe 是否记住密码
 */
export function setToken(token, userName, rememberMe) {
    if (rememberMe) {
		Cookies.set(TokenKey, token, {expires: Config.tokenCookieExpires});
		Cookies.set(UserName, userName, {expires: Config.tokenCookieExpires});
	} else {
		Cookies.set(TokenKey, token);
		Cookies.set(UserName, userName);
	}
}

/**
 * 获取用户名
 */
export function getUserName() {
    return Cookies.get(UserName);
}

/**
 * 移除token与用户名
 */
export function removeToken() {
	Cookies.remove(TokenKey);
	Cookies.remove(UserName);
}

