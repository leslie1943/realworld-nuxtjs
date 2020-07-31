/**
 * 验证是否登录的中间件 => home
 */

export default function ({ store, redirect }) {
  if (store.state.user) {
    return redirect('/')
  }
}