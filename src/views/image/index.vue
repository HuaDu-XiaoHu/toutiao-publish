<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="action-head">
        <el-radio-group v-model="collect"
                        @change="onCollectChange"
                        size="mini">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="mini"
                   type="primary"
                   @click="dialogVisible=true">上传素材</el-button>
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
    <el-dialog title="上传图片"
               :visible.sync="dialogVisible"
               width="40%"
               :before-close="handleClose">
      <el-upload class="upload-demo"
                 drag
                 action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                 :headers="uploadHeaders"
                 name="image"
                 multiple
                 :show-file-list="false"
                 :on-success="onUploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip"
             slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages } from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: '全部',
      images: [],
      dialogVisible: false,
      uploadHeaders: {

        Authorization: `Bearer ${user.token}`
      }
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
    },
    handleClose () {
      console.log('handleClose')
    },
    onUploadSuccess () {
      // 关闭对话款
      this.dialogVisible = false
      // 更新素材列表
      this.loadImages(false)
    }
  }
}
</script>

<style lang="less" scoped>
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
