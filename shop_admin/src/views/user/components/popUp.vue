<template>
    <el-dialog 
        :visible.sync="isShow"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body="false"
        :before-close="closeDialog"
        @click="closeDialog">
        <div class="form">
            <el-form 
                ref="form"
                :model="form"
                :label-width="dialog.formLabelWidth"
                :rules="rules"
                style="margin:10px;width:auto;">
                <el-form-item prop='username' label="姓名:">
                    <el-input v-model.number="form.username" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item v-if="!disabled" prop='password' label="密码:">
                    <el-input v-model.number="form.password"></el-input>
                </el-form-item>
                <el-form-item prop='email' label="邮箱:">
                    <el-input type="text" v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item prop='mobile'  label="电话:">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item  class="text_center">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="onSubmit('form')">提  交</el-button>
                </el-form-item>

            </el-form>
        </div>
    </el-dialog>
</template>

<script>
  import { updateUser,addUser} from "@/api/user";
  export default {
    name:'addFundDialogs',
    props:{
          isShow:Boolean,
          dialogRow:Object
      },
    data() {
        //邮箱合法验证
        var validateemail = (rule, value, callback) => {
            const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
            if (!reg.test(value)) {
                callback(new Error('邮箱格式有误'));
            } else {
                callback();
            }
        }
        //电话号码验证
        var validateemobile = (rule, value, callback) => {
            const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if (!reg.test(value)) {
                callback(new Error('电话格式有误'));
            } else {
                callback();
            }
        }
        return {
            dialog: {
                width:'400px',
                formLabelWidth:'120px'
            },
            addForm: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            rules:{
                email: [
                    { validator: validateemail, trigger: 'blur' }
                ],
                mobile: [
                    { validator: validateemobile, trigger: 'blur' }
                ],
        },
        }
    },
    // watch:{
    //     id() {
    //         return this.dialogRow.id
    //     }
    // },
    computed:{
        disabled() {
            if(this.$store.getters.addFundDialog.type === 'edit') {
                return true
            }else {
                return false
            }
        }
    },
    mounted(){
        //页面操作逻辑
        if(this.$store.getters.addFundDialog.type === 'edit'){
            this.form = this.dialogRow;
        }else{
            this.$nextTick(() => {
                this.$refs['form'].resetFields()
        })
    }
    },
    methods:{
        closeDialog(){
            this.$emit('closeDialog');
        },
        update() {

        },
        //表单提交
        onSubmit(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.$store.getters.addFundDialog.type === "edit") {
                    let Pid = this.id
                    updateUser(Pid,{email: this.form.email, mobile: this.form.mobile}).then(response=>{
                        console.log(response,'更新')
                        if(response.meta.status === 200) {
                            this.$emit('closeDialog')
                            this.$refs['form'].resetFields()
                            this.$emit('getRestList')
                        }else {
                            
                        }
                    })
                }else {
                     //有bug
                     updateUser(this.form).then(response=>{
                         console.log(response,'增加')
                    })
                }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
  }
</script>

<style lang="scss" scoped>
    .search_container{
        margin-bottom: 20px;
    }
    .btnRight{
        float: right;
        margin-right: 0px !important;
    }
    .searchArea{
        background:rgba(255,255,255,1);
        border-radius:2px;
        padding: 18px 18px 0;
    }
    .text_center{
        text-align: center;
    }
</style>
