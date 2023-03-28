<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :action="uploadURL"
          :show-file-list="false"
          :data="fileData"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.pic" :src="form.pic" class="avatar" width="400" height="300"/>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">建议尺寸：200*100px</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="菜品名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price" />
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="form.intro" />
      </el-form-item>
      <el-form-item label="详细介绍">
        <el-input v-model="form.detail" type="textarea" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option v-for="(item,index) in typeList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addDish } from '@/api/dish'
import { getTypes } from '@/api/type'

export default {
  data() {
    return {
      form: {
        name: '',
        pic: '',
        price: '',
        intro: '',
        detail: '',
        type: ''
      },
      typeList: [],
      fileData: { // 接口需要的额外参数
        category: 12
      },
      headers: { // 请求头部参数
        accessToken: ''
      },
      uploadURL: process.env.VUE_APP_BASE_API + '/dish/upload',
      picURL: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSubmit() {
      var isNumber = this.form.price === '' || (!isNaN(parseFloat(this.form.price)) && isFinite(this.form.price))
      if (isNumber) {
        addDish(this.form).then(response => {
          this.$message({
            message: response.message
          })
          this.$router.push('/dish/list')
        })
      } else {
        this.$message.error('价格只能是数字')
      }
    },
    onCancel() {
      this.$router.push('/dish/list')
    },
    // 获取菜品信息和类目信息
    fetchData() {
      getTypes({ pageNum: 1, pageSize: 20 }).then(response => {
        this.typeList = response.data.list
      })
    },
    // 图片上传成功的操作
    handleAvatarSuccess(res, file) {
      if (res.code === 20000) {
        this.form.pic = URL.createObjectURL(file.raw)
        this.picURL = res.data
      } else {
        this.$message.error(res.message)
      }
    },
    // 图片上传前的判断
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024
      if (isLt1M > 1) {
        this.$message.error('上传头像图片大小不能超过1MB')
      }
      return isLt1M
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

