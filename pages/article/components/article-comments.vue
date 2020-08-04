<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="comment"></textarea>
      </div>
      <div class="card-footer">
        <!-- <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" /> -->
        <!-- localhost:3000/article/my-first-post-zpuxos -->
        <img v-if="user.image" :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click="addComment">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{name:'profile',params:{username:comment.author.username}}"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        <nuxt-link
          :to="{name:'profile',params:{username:comment.author.username}}"
          class="comment-author"
        >{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{comment.createdAt|date('MMM DD YYYY')}}</span>

        <span
          class="mod-options"
          v-if="comment.author.username === user.username"
          @click="deleteComment(comment.id)"
        >
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment, deleteComment } from '@/api/article'
import { mapState } from 'vuex'
export default {
  nam: 'ArtcileComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      comments: [],
      comment: ''
    }
  },
  async mounted() {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 添加comment
    async addComment() {
      const params = {
        comment: {
          body: this.comment
        }
      }
      await addComment(this.article.slug, params)
    },
    // 删除comment
    async deleteComment(id) {
      await deleteComment(this.article.slug, id)
      // 页面数据删除记录
      this.comments = this.comments.filter(item => item.id != id)
    }
  }
}
</script>

<style>
</style>