<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <!-- 🚀 Your Feed -->
              <li class="nav-item" v-if="user">
                <!-- 🎃点击#tag 清空 tag / page 🎃-->
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{active: tab==='your_feed' }"
                  :to="{
                  name: 'home',
                  query:{
                    tab: 'your_feed'
                  }
                }"
                >Your Feed</nuxt-link>
              </li>
              <!-- 🚀 Global Feed -->
              <li class="nav-item">
                <!-- 🎃点击#tag 清空 tag / page 🎃-->
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{active: tab==='global_feed' }"
                  :to="{
                  name: 'home',
                  query:{
                    tab: 'global_feed'
                  }
                }"
                >Global Feed</nuxt-link>
              </li>
              <!-- 🚀 Tag Special  -->
              <!-- 🎃点击#tag 的时候, 只保持tag的路由query参数 🎃-->
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{active: tab==='tag' }"
                  :to="{
                  name: 'home',
                  query:{
                    tab: 'tag',
                    tag: tag
                  }
                }"
                ># {{tag}}</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
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

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <!-- 🎃点击tag 的时候,只设置tab=tag(标识为tag操作) #tag 出现 🎃-->
              <nuxt-link
                v-for="item in tags"
                :key="item"
                :to="{
                  name:'home',
                  query: {
                      tab: 'tag', 
                      tag: item
                    }
                  }"
                class="tag-pill tag-default"
              >{{item}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页列表 -->
      <nav>
        <ul class="pagination">
          <li
            v-for="item in totalPage"
            :key="item"
            class="page-item"
            :class="{active: item===page}"
          >
            <!-- <a class="page-link" :href="'/?page='+item">{{item}}</a> -->
            <!-- 🎃 phase-1: 点击分页 query参数只保留Tag 🎃 -->
            <!-- 🎃 phase-2: 点击分页 保留tab,否则分页数据错误 🎃 -->
            <nuxt-link
              class="page-link"
              :to="{
              name: 'home',
              query: {
                  page : item,
                  tag: $route.query.tag,
                  tab: $route.query.tab
                }
              }"
            >{{item}}</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { getArticles, getYourFeedArticles, addFavorite, deleteFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',

  // watchQuery属性: 监听参数字符串更改并在更改时执行组件方法(asyncData,fetch,validate,layout,...)
  // watchQuery: true, // true, 所有参数属性
  watchQuery: ['page', 'tag', 'tab'],

  // asyncData 有利于SEO
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1) // 通过上下文 query 获取路由的page属性
    const tag = query.tag || '' // 哪个标签被选中
    const limit = 20
    const tab = query.tab || 'global_feed' // tab页
    const params = {
      limit: limit,
      offset: (page - 1) * limit,
      tag
    }
    // 根据tab决定调用哪个articles
    const loadArticles = tab === 'global_feed' ? getArticles : getYourFeedArticles
    // 并行执行接口调用
    const [articleRes, tagRes] = await Promise.all([
      loadArticles(params),
      getTags()
    ])
    // 串行执行接口调用
    // const { data } = await getArticles(params)
    // const { data: tagData } = await getTags()

    const { articles, articlesCount } = articleRes.data

    // 添加自定义属性,防止一直点击
    articles.forEach(article => article.favoriteDisable = false)

    const { tags } = tagRes.data

    return {
      articles, // 文章列表
      articlesCount, // 文章数量
      limit, // 单页个数
      page, // 页码
      tags, // 标签列表
      tab, // 选项卡
      tag // 数据标签名
    }
  },
  computed: {
    // 总页码
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
    ...mapState(['user'])
  },
  methods: {
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