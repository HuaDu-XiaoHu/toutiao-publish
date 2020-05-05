<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.id?'修改文章':'发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="publish-form"
               :rules="formRules"
               :model="article"
               label-width="60px">
        <el-form-item label="标题"
                      prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容"
                      prop="content">
          <el-tiptap v-model="article.content"
                     :extensions="extensions"
                     height="400"
                     placeholder="请输入文章内容">

          </el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="0">单图</el-radio>
            <el-radio :label="0">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道"
                      prop="channel_id">
          <el-select v-model="article.channel_id"
                     placeholder="请选择频道">
            <el-option :label="channel.name"
                       :value="channel.id"
                       v-for="(channel,index) in channels"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onPublish">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getArticleChannels,
  addArticle,
  updateArticle,
  getArticle
} from '@/api/article'
import {
  // 需要的 extensions
  ElementTiptap,
  Doc,
  Image,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule

} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import { uploadImage } from '@/api/image'
export default {
  name: 'PublishIndex',
  components: { 'el-tiptap': ElementTiptap },
  data () {
    return {
      channels: [],
      article: {
        // article: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          // 默认生成base格式
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            })
          }
        }),
        new Underline(),
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new HorizontalRule()
      ],
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        content: [
          // { required: true, message: '请输入文章内容', trigger: 'change' },
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请文章内容'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请输入文章频道' }
        ]
      }
    }
  },
  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      // 编辑文章
      this.loadArticle()
    }
  },
  methods: {
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    // 提交表单
    onPublish (draft = false) {
      this.$refs['publish-form'].validate(valid => {
        // 表单验证失败，停止提交表单
        if (!valid) {
          return
        }
        // 验证通过，提交表单
        // 判断是发布文章还是修改文章
        const articleId = this.$route.query.id
        if (articleId) {
          // 有id就是修改文章
          updateArticle(articleId, this.article, draft).then(res => {
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            // 跳转到内容管理页面
            this.$router.push('/article')
          })
        } else {
          // 发布文章
          addArticle(this.article, draft = false).then(res => {
            // addArticle(this.article).then(res => {
            console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              // message: '发布文章成功成功',
              type: 'success'
            })
            // 跳转到内容管理页面
            this.$router.push('/article')
          })
        }
      })
    },
    // 修改文章
    loadArticle () {
      // 获取指定文章内容
      getArticle(this.$route.query.id).then(res => {
        // console.log(res)
        // 模板数据绑定
        this.article = res.data.data
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
