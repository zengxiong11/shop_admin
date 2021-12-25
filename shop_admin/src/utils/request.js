import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// axios实例
const service = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/',
    timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        //判断token是否存在
        if (store.getters.token) {
            //携带token
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data

        // if (res.code !== 20000) {
        //     Message({
        //         message: res.message || 'Error',
        //         type: 'error',
        //         duration: 5 * 1000
        //     })

        //     // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //         // to re-login
        //         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //             confirmButtonText: 'Re-Login',
        //             cancelButtonText: 'Cancel',
        //             type: 'warning'
        //         }).then(() => {
        //             store.dispatch('user/resetToken').then(() => {
        //                 location.reload()
        //             })
        //         })
        //     }
        //     return Promise.reject(new Error(res.message || 'Error'))
        // } else {
        //     return res
        // }
        return res
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service