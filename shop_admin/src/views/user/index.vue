<template>
  <div class="app-container">
    <search-cont :isShow="addFundDialog.show" @searchForm="search" @showDialog="showAddFundDialog"></search-cont>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @showDialog="showAddFundDialog"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role_name }}</span>
        </template>
      </el-table-column>
       <el-table-column label="电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-switch
            :active-value=true
            :inactive-value=false
            v-model="scope.row.mg_state" 
            @change="changeState($event,scope.row,scope.$index)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="时间" width="110" align="center">
        <template slot-scope="scope">
         {{ scope.row.create_time | dateFormat}}
        </template>
      </el-table-column>
       <el-table-column class-name="status-col" label="时间" align="center" width="230">
        <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edituserlist(scope.row)">编辑</el-button>
            <el-button type="warning" size="mini" @click="showPermission(scope.row.id)">权限</el-button>
            <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5,10,15,20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
  <pop-up v-if="addFundDialog.show" :isShow="addFundDialog.show" @getRestList="fetchData" :dialogRow="addFundDialog.dialogRow" @closeDialog="hideAddFundDialog"></pop-up>
  </div>
</template>

<script>
import { changeUserState,getList,deleteUser} from "@/api/user";
import popUp from "./components/popUp.vue";
import searchCont from "./components/searchCont.vue";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5
      },
      isShow:false,
      addFundDialog:{
        show:false,
        dialogRow:{}
      },
      list: null,
      listLoading: true,
      count: 0,
    }
  },
  computed:{
  },
  created() {
    this.fetchData()
  },
  methods: {

    showAddFundDialog(val) {
      console.log(val,'参数')
      this.$store.commit('user/SET_DIALOG_TITLE',val)
      this.addFundDialog.show = true
    },
    hideAddFundDialog() {
      this.addFundDialog.show = false
    },
    //每页几条
    handleSizeChange(val) {
        this.queryInfo.pagesize = val,
        this.fetchData()
      },
    //当前页
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.fetchData()
    },
    //用户列表
    fetchData() {
      this.listLoading = true
      getList(this.queryInfo).then(response => {
        console.log(response,'user')
        this.list = response.data.users
        this.count = response.data.total
        this.listLoading = false
      })
    },
    //编辑
    edituserlist(row) {
      console.log(row,'信')
      this.addFundDialog.dialogRow = {...row};
      this.showAddFundDialog()
    },
    //删除
    deleteItem(row) {
       let id = row.id
       console.log(row)
       this.$confirm(`此操作将永久删除${row.username}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser(id).then(response=>{
            if(response.meta.status == 200) {
                this.fetchData()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //修改权限
    showPermission(row) {
      console.log(row,'权限')
    },
    //改变状态
    changeState(event,data,index) {
        let Pid = data.id
       changeUserState({Pid,event}).then(response => {
        console.log(response)
      })
    },
     //搜索
    search(val) {
      console.log(val)
      this.queryInfo.query = val
      this.fetchData()
    }
  },
  components:{
    popUp,
    searchCont
  }

}
</script>
<style>
  .el-pagination {
    margin: 10px 0px;
    float: right;
  }
</style>
