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
            <el-radio-group v-model="form.resource">
              <el-radio label="全部"></el-radio>
              <el-radio label="草稿"></el-radio>
              <el-radio label="待审核"></el-radio>
              <el-radio label="审核通过"></el-radio>
              <el-radio label="审核失败"></el-radio>
              <el-radio label="已删除"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="频道">
            <el-select v-model="form.region"
                       placeholder="请选择频道">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="form.date1"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        根据筛选条件共查询到4147条结果：
      </div>
      <template>
        <el-table :data="articles"
                  stripe
                  style="width: 100%"
                  class="list-table"
                  size="mini">
          <el-table-column prop="date"
                           label="封面">
          </el-table-column>
          <el-table-column prop="title"
                           label="标题">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag :type="artcleStatus[scope.row.start].type">{{artcleStatus[scope.row.start].text}}</el-tag>
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
            <template>
              <el-button size="mini"
                         circle
                         type="primary"
                         icon="el-icon-edit"></el-button>
              <el-button size="mini"
                         type="danger"
                         icon="el-icon-delete"
                         circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background
                       layout="prev, pager, next"
                       :total="1000">
        </el-pagination>
      </template>

    </el-card>

  </div>

</template>

<script>
// 加载请求方法
import { getArticle } from '@/api/article'
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
      ]
    }
  },
  // created生命周期
  created () {
    this.loadArticle()
  },
  methods: {
    loadArticle () {
      getArticle().then(res => {
        // console.log(res)
        this.articles = res.data.data.results
      })
    },
    onSubmit () {
      console.log('submit!')
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
</style>
