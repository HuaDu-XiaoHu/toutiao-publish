<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="padding-bottom:20px;">
      <el-radio-group v-model="collect"
                      @change="onCollectChange"
                      size="mini">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
    </div>
    <!-- 图片 -->
    <el-row :gutter="10">
      <el-col :xs="12"
              :sm="6"
              :md="6"
              :lg="4"
              v-for="(img,index) in images"
              :key="index">
        <el-image style="height: 100px"
                  :src="img.url"
                  fit="cover"></el-image>
      </el-col>

    </el-row>

  </el-card>
</template>

<script>
import { getImages } from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    return {
      collect: '全部',
      images: []
    }
  },
  computed: {},
  created () {
    this.loadImages(false)
  },
  methods: {
    loadImages (collect = false) {
      getImages({
        collect
      }).then(res => {
        // console.log(res)
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
      console.log(value)
      this.loadImages(value)
    }
  }
}
</script>

<style>
</style>
