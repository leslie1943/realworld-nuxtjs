/**
 * 基于 axios 封装的请求模块
 */

// 插件文档: https://zh.nuxtjs.org/guide/plugins
import axios from 'axios'

// 创建请求对象
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
  // baseURL: 'https://realworld.api.fed.lagounews.com'
})

// 💛💛💛💛💛
// 💛通过插件机制获取上下文对象(query,params,req,res,app,store)💛
// 💛💛💛💛💛
// 插件导出函数必须作为 default 成员
export default ({ store }) => {

  // 🚀🚀 请求拦截器
  request.interceptors.request.use(function (config) {
    // 任何请求都要经过请求拦截器
    // 我们可以在请求拦截器中做一些公共的业务处理,例如统一设置 Token
    // 请求正确的情况经过这里

    // 加载store中的user
    const { user } = store.state
    if (user && user.token) {
      // 请求token
      config.headers.Authorization = `Token ${user.token}`
    }

    // 返回请求配置对象
    return config
  }, function (error) {
    // 如果请求失败(此时请求还没有发出来)就会进入这里
    return Promise.reject(error)
  })
}





// export default request