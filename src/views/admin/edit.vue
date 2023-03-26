<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadURL"
          :show-file-list="false"
          :data="fileData"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.pic" :src="form.pic" class="avatar" width="240" height="240"/>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">建议尺寸：200*100px</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.role" placeholder="请选择">
          <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否生效">
        <el-select v-model="form.isVal" placeholder="请选择">
          <el-option v-for="(item,index) in binList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否锁定">
        <el-select v-model="form.isLock" placeholder="请选择">
          <el-option v-for="(item,index) in binList" :key="index" :label="item.name" :value="item.id"></el-option>
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
import { getAdminById, updateAdmin } from '@/api/admin'

export default {
  data() {
    return {
      form: {
        name: '',
        password: '',
        price: '',
        intro: '',
        detail: '',
        type: ''
      },
      roleList: [{ id: 0, name: '管理员' }, { id: 1, name: '服务员' }, { id: 2, name: '后厨' }],
      binList: [{ id: 0, name: '否' }, { id: 1, name: '是' }],
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
      updateAdmin(this.form).then(response => {
        this.$message({
          message: response.message
        })
        this.$router.push('/admin/list')
      })
    },
    onCancel() {
      this.$router.push('/admin/list')
    },
    // 获取菜品信息和类目信息
    fetchData() {
      var id = this.$route.params.id
      getAdminById(id).then(response => {
        this.form = response.data
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

