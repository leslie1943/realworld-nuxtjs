module.exports = {
  router: {
    // 🚀 linkActiveClass:nuxt-active-link 高亮类名默认值 [nuxt-active-link]
    linkActiveClass: 'active', /* 匹配到的路由会自动添加 classs="active", active 已经在默认样式中设置了 修改 color: rgba(0, 0, 0, .8) ==> #409EFF */

    // 🚀 自定义路由表规则
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)

      // 展开数组,再push
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/'),
            },
            {
              path: '/login', // 登录页面
              name: 'login',
              component: resolve(__dirname, 'pages/login/'),
            },
            {
              path: '/register', // 注册页面
              name: 'register',
              component: resolve(__dirname, 'pages/login/'),
            },
            {
              path: '/profile/:username', // 用户页面
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/'),
            },
            {
              path: '/settings', // 设置
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/'),
            },
            {
              path: '/editor', // 创建文章
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/'),
            },
            {
              path: '/editor/:slug', // 创建文章
              name: 'editor-edit',
              component: resolve(__dirname, 'pages/editor/'),
            },
            {
              path: '/article/:slug', // 
              name: 'article',
              component: resolve(__dirname, 'pages/article/'),
            }
          ]
        },
      ])
    }
  },
  // 运行服务相关
  server: {
    // host: '0.0.0.0',
    host: 'localhost',
    port: 3000
  },
  // 注册插件
  plugins: [
    // 波浪线出发,从根路径触发
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
    // { src: '~/plugins/request.js', ssr: true },
    // { src: '~/plugins/dayjs.js', ssr: true },
  ]
}