<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' :'Sign up'}}</h1>
          <p class="text-xs-center">
            <!-- <a href>Have an account?</a> -->
            <!-- 使用 router-link 也可以 -->
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages,field) in errors">
              <li v-for="(message,index) in messages" :key="index">{{field}} {{message}}</li>
            </template>
            <!-- <li>That email is already taken</li> -->
          </ul>
          <!-- prevent 阻止默认行为 -->
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.email"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.password"
                type="password"
                placeholder="Password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">{{ isLogin ? 'Sign in' :'Sign up'}}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  // 拦截处理
  middleware: ['notAuthenticated'],
  name: 'LoginIndex',
  computed: {
    isLogin() {
      return this.$route.name == 'login'
    }
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    async onSubmit() {
      try {
        // 提交表单登录/注册
        const { data } = this.isLogin ? await login({ user: this.user }) : await register({ user: this.user })
        console.info(data)
        // TODO: 处理用户的登录状态
        this.$store.commit('setUser', data.user)

        // 为了防止刷新,需要数据持久化
        Cookie.set('user', data.user)

        // 必须设置到Cookie中,使用localStorage只能被客户端访问到,不能被服务端访问
        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        console.dir(err)
        this.errors = err.response.data.errors
      }
    },
  }
}
</script>

<style>
</style>