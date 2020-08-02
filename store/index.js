// import cookieparser from 'cookieparser'
const cookieparser = process.server ? require('cookieparser') : undefined
// 在服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突,务必把state定义成一个函数, 返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

// 同步数据修改
export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

// 异步数据修改
export const actions = {
  // 初始化容器以及需要传递给客户端的数据
  // nuxtServerInit 这是个特殊的action  会在服务端渲染期间自动运行
  // 作用: 初始化容器数据, 传递数据给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let user = null
    // 如果请求头中有 Cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转换为 JS 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      // console.info(parsed.user)
      try {
        // 获取 cookie 中的 user 数据
        user = JSON.parse(parsed.user)
      } catch (err) {

      }
    }
    commit('setUser', user)
  }
}