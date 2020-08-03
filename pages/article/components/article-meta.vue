<template>
  <div class="article-meta">
    <nuxt-link :to="{to:'profile',params:{username:article.author.username}}">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{to:'profile',params:{username:article.author.username}}"
      >{{article.author.username}}</nuxt-link>
      <span class="date">{{article.createAt|date('MMM DD YYYY')}}</span>
    </div>
    <!-- DONE: 关注作者 -->
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{active: article.author.following}"
      @click="onFollowing(article)"
      :disabled="article.followingDisable"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      {{article.author.following ? `unfollowing ${article.author.username}`:`following ${article.author.username}`}}
      <!-- <span
        class="counter"
      ></span>-->
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{active: article.favorited}"
      @click="onFavorite(article)"
      :disabled="article.favoriteDisable"
    >
      <i class="ion-heart"></i>
      &nbsp;
      {{article.favorited ? 'unfavorite Post':'Favorite Post'}}
      <span
        class="counter"
      >({{article.favoritesCount}})</span>
    </button>
  </div>
</template>

<script>
import { addFavorite, deleteFavorite } from '@/api/article'
import { followingUser, unfollowingUser } from '@/api/profile'

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 关注文章
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
    },
    // 关注用户
    async onFollowing(article) {
      const { author } = article
      article.followingDisable = true
      if (author.following) {
        // 取注
        await unfollowingUser(author.username)
        author.following = false
        // author.followingsCount += -1
      } else {
        // 关注
        await followingUser(author.username)
        author.following = true
        // author.followingsCount += 1
      }
      article.followingDisable = false
    }
  }
}
</script>

<style>
</style>