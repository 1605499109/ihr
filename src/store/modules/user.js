import { login, getInfo, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken, settimeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
// import userinfo from '@/router/modules/userinfo'
// import { get } from 'core-js/core/dict'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userDetali: {}
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
  SET_USER_DETAIL: (state, userDetali) => {
    state.userDetali = userDetali
  },
  SETDETAIL_vuex: (state, userDetali) => {
    state.userDetali = {}
  }

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // console.log(userInfo)
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ mobile: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_TOKEN', data)
        setToken(data)
        const time = Date.now()
        settimeToken(time)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user
  // 获取用户信息
  async  getInfo({ commit, state }) {
    const { data: userInfo } = await getInfo()
    const { data: userDetali } = await getUserInfo(userInfo.userId)
    commit('SET_USER_DETAIL', { ...userInfo, ...userDetali }) // 合并用户信息
    return userInfo
    // console.log(state.userDetali)
    // console.log(11111, userDetali)
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response

    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }

    //     const { name, avatar } = data

    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  logout({ commit, state }) {
    // console.log(2222)
    removeToken()
    commit('SETDETAIL_vuex')
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
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

