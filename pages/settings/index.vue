<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="user.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="user.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
            </fieldset>
          </form>
          <button class="btn btn-outline-danger" @click="logout">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from '@/api/user'
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: ['authenticated'],
  name: 'SettingsIndex',
  data() {
    return {
      user: {}
    }
  },
  async mounted() {
    const { data } = await getUser()
    this.user = data.user
  },
  methods: {
    // 修改用户设置
    async onSubmit() {
      // 接口参数
      const params = {
        user: {
          email: this.user.email,
          bio: this.user.bio,
          username: this.user.username,
          image: this.user.image,
          password: this.user.password
        }
      }
      const { data } = await updateUser(params)
      this.$store.commit('setUser', data.user)
      // 为了防止刷新,需要数据持久化
      Cookie.set('user', data.user)
      this.$router.push(`/profile/${data.user.username}`)
    },

    // 退出登录
    async logout() {
      this.$store.commit('setUser', null)
      Cookie.remove('user')
      this.$router.push(`/login`)
    }
  }
}
</script>

<style>
</style>