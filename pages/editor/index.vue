<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="article.tagListStr"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >{{isNew ? 'Publish' : 'Update'}} Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, createArticle, updateArticle } from '@/api/article'
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: ['authenticated'],
  name: 'EditorIndex',
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: [],
        tagListStr: ''
      }
    }
  },
  async mounted() {
    if (!this.isNew) {
      const slug = this.$route.params.slug
      const { data } = await getArticle(slug)
      this.article = data.article
      this.article.tagListStr = data.article.tagList.join(' ')
    }
  },
  methods: {
    async onSubmit() {
      const params = {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.tagList ? this.tagListStr.split(' ') : []
      }
      if (this.isNew) {
        const { data } = await createArticle(params)
        this.$router.push(`/article/${data.article.slug}`)
      } else {
        const { data } = await updateArticle(this.$route.params.slug, params)
        this.$router.push(`/article/${data.article.slug}`)
      }
    }
  },
  computed: {
    isNew() {
      return !this.$route.params.slug
    }
  }
}
</script>

<style>
</style>