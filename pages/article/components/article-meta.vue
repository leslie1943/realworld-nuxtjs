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
    <!-- TODO: 关注作者 -->
    <button class="btn btn-sm btn-outline-secondary" :class="{active: article.following}">
      <i class="ion-plus-round"></i>
      &nbsp;
      {{article.following ? `unfollowing ${article.author.username}`:`following ${article.author.username}`}}
      <!-- <span
        class="counter"
      ></span>-->
    </button>
    &nbsp;&nbsp;
    <!-- TODO: 关注文章 -->
    <button class="btn btn-sm btn-outline-primary" :class="{active: article.favorited}">
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
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>