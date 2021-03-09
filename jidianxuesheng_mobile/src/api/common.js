import request from '@/utils/request'

/**
 * get方法示例
 * @param {Object} param
 */

// /api/sys-user/get-user/{content}
//--------get
// 个人信息回显 zed
// export function getInfoEcho() {
//     return request.get('/api/sys-user/info-echo')
// }
// // 美音体列表查询 jh
// export function getArtList(param) {
//     return request.get('/api/sys-user/get-all-column/' + param)
// }
// // 美音体详情回显 jh
// export function getArt(param) {
//     return request.get('/api/ams/' + param)
// }

//-------post
/**
 * post方法示例
 * @param {Object} param
 */
// export function post(param){
// 	return request({
// 		url: '/test/post',
// 		method: 'post',
// 		data: {
// 			param: param
// 		}
// 	})
// }



//修改个人信息 zed
export function putUpdateUser(param) {
    return request({
        url: '/api/sys-user/update-user',
        method: 'put',
        data: {
            param: param
        }
    })
}

// //修改密码 zed
// export function putUpdatePass(newPass, oldPass) {
//     return request({
//         url: '/api/users/updatePass',
//         method: 'post',
//         data: {
//             newPass: newPass,
//             oldPass: oldPass
//         }
//     })
// }

// //修改论文 zed
// export function putUpdatePaper(param) {
//     return request({
//         url: '/api/paper/update-paper',
//         method: 'put',
//         data: param
//     })
// }