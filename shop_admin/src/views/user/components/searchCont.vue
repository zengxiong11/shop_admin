<template>
  <el-form :inline="true" class="demo-form-inline">
  <el-form-item>
    <el-input v-model="key" placeholder="搜索"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="default" @click="searchForm">查询</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="addUser">新增用户</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    props:{
      isShow:Boolean
    },
    data() {
      return {
          key: ''
      }
    },
    // watch:{
    // //监听搜索关键字实时变化
    //  key() {
    //   clearTimeout(timer)
    //     let timer = setTimeout(()=>{
    //         this.$emit('searchForm',this.key)
    //      },200)
    //  }
    // },
    methods: {
      searchForm() {
        this.$emit('searchForm',this.key)
      },
      addUser() {
          this.$emit("showDialog",'add');
      }
    }
  }
</script>

<style>
</style>