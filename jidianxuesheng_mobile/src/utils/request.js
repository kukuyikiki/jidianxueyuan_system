import axios from 'axios'
import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import Config from '@/settings'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
    baseURL: Config.baseURL, // api 的 base_url
    timeout: Config.timeout // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Authorization'] = getToken() //让每个请求携带自定义token
                // config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIzMGQ2NjU2Y2YwZTA0ZTFhODQ2Y2Q2ZGE0OTBhZmJlOCIsImF1dGgiOiJhZG1pbiIsInN1YiI6ImFkbWluIn0.owHaRwQYsSIBb8h5EjABbNsmNnjefVGemuR51iTdWw5cZDuwMd6BKzc5_RyV8STBZyPO_krte4qRZb3-D_n6zQ'; //让每个请求携带自定义token
        }
        config.headers['Content-Type'] = Config.contentType;
        //对参数进行qs的序列化
        config.data = JSON.stringify(config.data);
        return config;
    },
    error => {
        // 对请求错误做些什么，自己定义
        //...
        return new Promise(function(resolve, reject) {
            reject(error);
        }).catch(function(reason) {
            console.log('catch:', reason);
        });
    }
);
// response 拦截器
service.interceptors.response.use(

    response => {
        console.log(response.status);
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return new Promise(function(resolve, reject) {
                reject(response);
            }).catch(function(reason) {
                console.log('catch:', reason);
            });
        }
    },
    error => {
        if (error.response.data.status === 401) {
            console.log(123);
            Cookies.remove('EL-ADMIN-TOEKN');
        }
        let code = 0;
        let message = error.response.data.message;
        //网络请求超时
        try {
            code = error.response.status;
        } catch (e) {
            if (error.toString().indexOf('Error: timeout') !== -1) {
                //...
                return new Promise(function(resolve, reject) {
                    reject(error);
                }).catch(function(reason) {
                    console.log('catch:', reason);
                });
            }
        }
        //其它有状态码的返回情况
        if (code) {
            return new Promise(function(resolve, reject) {
                    reject(message);
                })
                // .catch(function(reason) {
                // 	console.log('catch:', reason);
                // });
        }
        //网络断开情况
        if (error.toString().indexOf('Error: Network Error') !== -1) {
            //...
            return new Promise(function(resolve, reject) {
                reject(error);
            }).catch(function(reason) {
                console.log('catch:', reason);
            });
        }
        //其他情况
        //...
        return new Promise(function(resolve, reject) {
            reject(error);
        }).catch(function(reason) {
            console.log('catch:', reason);
        });
    }
);
export default service