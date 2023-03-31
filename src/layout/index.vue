<template>
  <el-container>
      <el-header>
          <header-temp></header-temp>
      </el-header>
      <el-container>
          <el-aside width="200px"><sidebar class="sidebar-container"></sidebar></el-aside>
          <el-main><app-main></app-main></el-main>
      </el-container>
  </el-container>
</template>
<script>
import AppMain  from './appMain'      // 页面布局的右侧区域
import sidebar  from './sideBar'      // 页面布局的左侧菜单
import headerTemp from "./headerTemp" // 页面布局的header菜单
export default {
  name: 'layout',
  components: { sidebar, AppMain, headerTemp }
}
</script>
<style>
.el-header{padding: 0!important;margin-left: 180px;}
</style>