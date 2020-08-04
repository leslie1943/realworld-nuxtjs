<template>
  <div class="article-meta">
    <nuxt-link :to="{to:'profile',params:{username:article.author.username}}">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{name:'profile',params:{username:article.author.username}}"
      >{{article.author.username}}</nuxt-link>
      <span class="date">{{article.createAt|date('MMM DD YYYY')}}</span>
    </div>

    <!-- 如果不是自己的文章 -->
    <template v-if="article.author.username != user.username">
      <!-- DONE: 关注作者 -->
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{active: article.author.following}"
        @click="onFollowing(article)"
        :disabled="article.followingDisable"
      >
        <i class="ion-plus-round"></i>
        {{article.author.following ? `unfollowing ${article.author.username}`:`following ${article.author.username}`}}
        <!-- <span
        class="counter"
        ></span>-->
      </button>
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{active: article.favorited}"
        @click="onFavorite(article)"
        :disabled="article.favoriteDisable"
      >
        <i class="ion-heart"></i>
        {{article.favorited ? 'unfavorite Post':'Favorite Post'}}
        <span
          class="counter"
        >({{article.favoritesCount}})</span>
      </button>
    </template>
    <!-- 如果是自己的文章 -->
    <template v-else>
      <nuxt-link
        class="btn btn-outline-secondary btn-sm"
        :to="{name: 'editor-edit', params:{slug: article.slug}}"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>

      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle(article.slug)">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
  </div>
</template>

<script>
import { addFavorite, deleteFavorite, deleteArticle } from '@/api/article'
import { followingUser, unfollowingUser } from '@/api/profile'
import { mapState } from 'vuex'

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
    },
    async deleteArticle(slug) {
      await deleteArticle(slug)
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>
</style>