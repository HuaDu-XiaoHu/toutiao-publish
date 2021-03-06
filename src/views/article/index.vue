<template>
  <div class="article-container">

    <el-card class="filter-card">
      <div slot="header"
           class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">

        <el-form ref="form"
                 :model="form"
                 label-width="40px"
                 size="mini">
          <el-form-item label="状态">
            <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="频道">
            <el-select v-model="channelId"
                       placeholder="请选择频道">
              <el-option label="全部"
                         :value="null"></el-option>
              <el-option :label="channel.name"
                         :value="channel.id"
                         v-for="(channel,index) in channels"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="rangeDate"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       :disabled="loading"
                       @click="loadArticle(1)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        根据筛选条件共查询到{{totalCount}}条结果：
      </div>
      <template>
        <el-table :data="articles"
                  stripe
                  style="width: 100%"
                  class="list-table"
                  size="mini"
                  v-loading="loading">
          <el-table-column label="封面">
            <template slot-scope="scope">
              <img v-if="scope.row.cover.images[0]"
                   class="article-cover"
                   :src="scope.row.cover.images[0]"
                   alt="">
              <img v-else
                   class="article-cover"
                   src="./no-cover.gif"
                   alt="">
            </template>
          </el-table-column>
          <el-table-column prop="title"
                           label="标题">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
              <!-- <el-tag v-if="scope.row.status===0">草稿</el-tag>
              <el-tag v-else-if="scope.row.status===1">待审核</el-tag>
              <el-tag type="success"
                      v-else-if="scope.row.status===2">审核通过</el-tag>
              <el-tag type="info"
                      v-else-if="scope.row.status===3">审核失败</el-tag>
              <el-tag type="danger"
                      v-else-if="scope.row.status===4">已删除</el-tag> -->
            </template>
          </el-table-column>
          <el-table-column prop="pubdate"
                           label="发布时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         circle
                         type="primary"
                         @click="$router.push('/publish?id='+scope.row.id)"
                         icon="el-icon-edit"></el-button>
              <el-button size="mini"
                         type="danger"
                         icon="el-icon-delete"
                         @click="onDeleteArticle(scope.row.id)"
                         circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background
                       layout="prev, pager, next"
                       :total="totalCount"
                       @current-change="onCurrentChange"
                       :disabled="loading"
                       :page-size="pageSize"
                       :current-page.sync="page">
        </el-pagination>
      </template>

    </el-card>

  </div>

</template>

<script>
// 加载请求方法
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article'
export default {

  name: 'ArticleIndex',
  components: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'warning' },
        { status: 3, text: '审核失败', type: 'success' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      totalCount: 0,
      // 每页的大小
      pageSize: 20,
      // 查询文章的状态，
      status: null,
      // 文章频道列表
      channels: [],
      // 查询文章的频道
      channelId: null,
      // 请求日期
      rangeDate: null,
      // 表格数据加载
      loading: true,
      // 当前页码
      page: 1
    }
  },
  // created生命周期
  created () {
    this.loadChannels()
    this.loadArticle()
  },
  methods: {
    loadArticle (page = 1) {
      // 请求一开始开启loading中
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        // console.log(res)
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount

        // 请求结束关闭加载中loading
        this.loading = false
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    onCurrentChange (page) {
      this.loadArticle(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      // console.log(articleId.toString())
      this.$confirm('确认删除吗？', '删除提示', {
        confimButtonTexr: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          // console.log(res)
          this.loadArticle(this.page)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }).catch((err) => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '删除失败'
          })
        })
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style>
.filter-card {
  margin-bottom: 20px;
}
.list-table {
  margin-bottom: 20px;
}
.article-cover {
  width: 80px;
  background-size: cover;
}
</style>
