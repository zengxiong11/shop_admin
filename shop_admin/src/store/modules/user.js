import { login, logout, getUser, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        addFundDialog: {
            title: '新增资金信息',
            type: 'add'
        },
    }
}

const state = getDefaultState()
const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    //弹窗页面类型
    SET_DIALOG_TITLE: (state, type) => {
        if (type === 'add') {
            state.addFundDialog.type = 'add'
            state.addFundDialog.title = '新增页面信息'
        } else {
            state.addFundDialog.type = 'edit'
            state.addFundDialog.title = '编辑页面信息'
        }
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                console.log(response, '登录')
                commit('SET_TOKEN', data.token)
                console.log(data.token, 'token')
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    gitUserData({ commit }) {
        return new Promise((resolve, reject) => {
            getUser().then(response => {
                console.log(response, '用户')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },



    // get user info
    // getInfo({ commit, state }) {
    //     return new Promise((resolve, reject) => {
    //         getInfo(state.token).then(response => {
    //             const { data } = response

    //             if (!data) {
    //                 return reject('Verification failed, please Login again.')
    //             }

    //             const { name, avatar } = data

    //             commit('SET_NAME', name)
    //             commit('SET_AVATAR', avatar)
    //             resolve(data)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}