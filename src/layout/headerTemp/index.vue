<template>
  <div class="header-temp-container">
    <div class="userInfo">
      <el-image :src="avatar" class="eImage"></el-image>
      <el-dropdown @command="handleLogout">
        <div class="detail user-link">
          <span>{{ username }}</span>
          <span>{{ desc }}</span>
          <i class="el-icon--right"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui"
import {mapState} from 'vuex'
export default {
  name: "header-temp-container",
  data () {
    return {
    }
  },
  computed:{
    ...mapState('User',{
      avatar:'avatar',
      username:'username',
      desc:'desc'
    })
  },
  methods: {
    // 退出登录
    handleLogout () {
      console.log(111);
      window.localStorage.removeItem("token")
      this.$store.commit('User/removeUserInfo')
      Message({ type: 'success', message: "退出登录", showClose: true, duration: 3000 })
      this.$router.push({ path: "/login" })
      // if (key == "logout") {
      //   window.localStorage.removeItem("userInfo")
      //   Message({ type: 'success', message: "退出登录", showClose: true, duration: 3000 })
      //   this.$router.replace({ path: "/login" })
      //   location.reload()
      // }
    }
  }
}
</script>
<style scoped>
.header-temp-container {
  border-bottom: 1px solid #ddd;
  width: 100%;
  height: 60px;
}

.userInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  margin-right: 20px;
}

.eImage {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.detail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}</style>