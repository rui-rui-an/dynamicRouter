<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form :model="user" status-icon :rules="rules" ref="userForm">
        <div class="title">动态路由</div>
        <el-form-item prop="username">
          <el-input type="text" prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="user.username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="el-icon-view" placeholder="请输入密码" v-model="user.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="login">登录</el-button>
        </el-form-item>
        <div class="toast">
          <span>管理员账号：admin </span>
          <span>密码：654321</span>
        </div>
        <div class="toast">
          <span>普通人员账号：people</span>
          <span>密码：123456</span>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import dynamicUserData from "@/mock/data.js"
import { Message } from "element-ui"

export default {
  name: 'login',
  data () {
    return {
      user: {
        username: "admin",
        password: "654321"
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          // 模拟登录接口去请求用户数据
          setTimeout(() => {
            // 这里的res就是模拟后台返回的用户数据（不包含路由菜单，一般菜单是由单独的一个接口返回）
            const res = dynamicUserData.filter((item) => item.username === this.user.username)[0]
            console.log(res)
            // 存储用户的信息及token到vuex,并做sessionStorage持久化处理
            this.$store.commit('User/saveUserInfo',res)
            Message({ type: 'success', message: "登录成功", showClose: true, duration: 3000 })
            this.$router.push({ path: "/index" })
          }, 1000)
        } else return false
      })
    }
  }
}
</script>
<style scoped>
.login-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 100vw;
  height: 100vh;
}

.modal {
  width: 360px;
  height: 380px;
  box-shadow: 0 0 10px 5px #ddd;
  padding: 50px;
  border-radius: 5px;
}

.title {
  width: 100%;
  text-align: center;
  line-height: 1.5;
  font-size: 50px;
  margin-bottom: 30px;
}

.btn-login {
  width: 100%;
}

.toast {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
</style>