<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" />
            <h4>{{profile.username}}</h4>
            <p>{{profile.bio || 'No bio yet :('}}</p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="onFollow"
              :disabled="profile.followDisable"
              :class="{active: profile.following}"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{profile.following ? 'Unfollow':'Follow'}} {{profile.username}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <!-- <a class="nav-link active" href>My Articles</a> -->
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{active: tab == 'author'}"
                  :to="{query:{tab: 'author'}}"
                >My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <!-- <a class="nav-link" href>Favorited Articles</a> -->
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{active: tab == 'favorited'}"
                  :to="{query:{tab: 'favorited'}}"
                >Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <!-- 文章列表 -->
          <div class="article-preview" v-for="article in articles">
            <div class="article-meta">
              <nuxt-link :to="{name: 'profile',params:{username: article.author.username}}">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{name: 'profile',params:{username: article.author.username}}"
                >{{article.author.username}}</nuxt-link>
                <span class="date">{{article.createdAt | date('MMM DD YYYY')}}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{active: article.favorited}"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisable"
              >
                <i class="ion-heart"></i>
                {{article.favoritesCount}}
              </button>
            </div>

            <nuxt-link :to="{name: 'article', params:{slug: article.slug}}" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile, followingUser, unfollowingUser } from '@/api/profile'
import { getArticles, addFavorite, deleteFavorite } from '@/api/article'

export default {
  middleware: ['authenticated'],
  name: 'UserProfile',
  watchQuery: ['tab'],
  // For SEO
  async asyncData({ params, query }) {
    const username = params.username // username
    // 获取 Profile
    const { data } = await getProfile(username)
    const { profile } = data
    profile.followDisable = false

    // 获取文章列表
    const tab = query.tab || 'favorited' // tab页
    let queryParams = tab == 'favorited' ? { favorited: params.username } : { author: params.username }
    const { data: articleData } = await getArticles(queryParams)
    const { articles } = articleData
    articles.forEach(article => article.favoriteDisable = false)
    return {
      profile,
      tab,
      articles
    }
  },
  head() {
    return {
      title: `${this.profile.username} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.profile.username },
      ]
    }
  },
  methods: {
    async onFollow() {
      // 关注用户
      this.profile.followDisable = true
      if (this.profile.following) {
        // 取注
        await unfollowingUser(this.username)
        this.profile.following = false
      } else {
        // 关注
        await followingUser(this.username)
        this.profile.following = true
        // author.followingsCount += 1
      }
      this.profile.followDisable = false
    },
    async onFavorite(article) {
      article.favoriteDisable = true
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisable = false
    }
  }
}
</script>

<style>
</style>