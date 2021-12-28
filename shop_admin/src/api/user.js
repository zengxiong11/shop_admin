import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}
export function getUser() {
    return request({
        url: '/users',
        method: 'get'
    })
}

export function updateUser(userId, data) {
    return request({
        url: `users/${userId}`,
        method: 'put',
        data
    })
}

export function addUser(data) {
    console.log(data, '增加')
    return request({
        url: 'users',
        method: 'post',
        data
    })
}

export function changeUserState(params) {
    console.log(params, '修改状态')
    let userId = params.Pid;
    let data = params.event
    return request({
        url: `users/${userId}/state/${data}`,
        method: 'put',
        data
    })
}

export function getList(params) {
    return request({
        url: '/users',
        method: 'get',
        params
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function deleteUser(userId) {
    return request({
        url: `users/${userId}`,
        method: 'delete',
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}