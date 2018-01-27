<template>
  <div class="view">
    <div class="container">
      <div class="view-header">
        <span class="view-header_title">视图列表 (DataView List)</span>
        <el-button class="view-header_button" size="small"  icon="el-icon-refresh" type="primary" v-on:click="refresh">刷新列表</el-button>
        <el-button class="view-header_button" size="small"  type="primary" v-on:click="newView">创建视图</el-button>
      </div>
      <el-table
        :data="dataviewList"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="dataViewName"
          label="数据视图名称 (dataViewName)">
        </el-table-column>
        <el-table-column label="操作 (Actions)">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title='添加视图 (Add DataView)'
      :visible.sync="addDialogVisible"
      width="40%"
      @close="resetForm('addViewForm')">
      <el-form ref="addViewForm" :rules="rules" :model="addViewForm" label-width="240px" label-position="left">
        <el-form-item prop="dataViewName" label="数据视图名称 (dataViewName)">
          <el-input v-model="addViewForm.dataViewName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addView('addViewForm')">添加</el-button>
          <el-button @click="resetForm('addViewForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title='修改视图 (Modify DataView)'
      :visible.sync="updateDialogVisible"
      width="40%">
      <el-form ref="updateViewForm" :rules="rules" :model="updateViewForm" label-width="240px" label-position="left">
        <el-form-item prop="dataViewName" label="数据视图名称 (dataViewName)">
          <el-input v-model="updateViewForm.dataViewName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeView('updateViewForm')">修改</el-button>
          <el-button @click="updateDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/babel">
  import {reqQueryView, reqAddView, reqModifyView, reqDeleteView} from '../../service/getData'
  import {mapState, mapMutations} from 'vuex'
  import {isSuccess, parseReq} from '../../config/mUtils'

  export default {
    data () {
      return {
        addViewForm: {
          dataViewName: ''
        },
        updateViewForm: {
          dataViewId: '',
          dataViewName: ''
        },
        addDialogVisible: false,
        updateDialogVisible: false,
        rules: {
          dataViewId: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          dataViewName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ]
        }
      }
    },
    computed: {
      ...mapState([
        'dataviewList'
      ])
    },
    mounted () {
      this.initData()
    },
    methods: {
      ...mapMutations([
        'DATA_VIEW_LIST',
        'DATA_VIEW_ADD',
        'DATA_VIEW_MODIFY',
        'DATA_VIEW_DELETE'
      ]),
      async initData () {
        let tmp = await reqQueryView()
        if (isSuccess(tmp.code)) {
          this.DATA_VIEW_LIST(tmp.data)
          this.$notify({
            title: '初始化数据',
            message: '刷新成功',
            type: 'success',
            duration: 2000,
            position: 'bottom-right'
          })
        } else {
          this.$notify({
            title: '初始化数据',
            message: '刷新失败',
            type: 'error',
            duration: 2000,
            position: 'bottom-right'
          })
        }
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.passwordVisible = false
      },
      refresh () {
        this.initData()
      },
      newView () {
        this.addDialogVisible = true
      },
      async addView (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let item = await reqAddView(parseReq(this.addViewForm))
            if (isSuccess(item.code)) {
              this.DATA_VIEW_ADD(item.data)
              this.resetForm(formName)
              this.addDialogVisible = false
              this.$notify({
                title: '添加视图',
                message: '添加成功',
                type: 'success',
                duration: 2000,
                position: 'bottom-right'
              })
            } else {
              this.$notify({
                title: '添加视图',
                message: '添加失败',
                type: 'error',
                duration: 2000,
                position: 'bottom-right'
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleEdit (index, row) {
        this.updateDialogVisible = true
        this.updateViewForm.dataViewId = this.dataviewList[index].dataViewId
        this.updateViewForm.dataViewName = this.dataviewList[index].dataViewName
        this.index = index
      },
      async changeView (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let item = await reqModifyView(parseReq({'dataViewId': this.updateViewForm.dataViewId, 'dataViewName': this.updateViewForm.dataViewName}))
            if (isSuccess(item.code)) {
              this.initData()
              this.resetForm(formName)
              this.updateDialogVisible = false
              this.$notify({
                title: '修改视图',
                message: '修改成功',
                type: 'success',
                duration: 2000,
                position: 'bottom-right'
              })
            } else {
              this.$notify({
                title: '修改视图',
                message: '修改失败',
                type: 'error',
                duration: 2000,
                position: 'bottom-right'
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      async handleDelete (index, row) {
        let result = await reqDeleteView(parseReq({'dataViewId': this.dataviewList[index].dataViewId}))
        if (isSuccess(result.code)) {
          this.initData()
          this.$notify({
            title: '删除视图',
            message: '删除成功',
            type: 'success',
            duration: 2000,
            position: 'bottom-right'
          })
        } else {
          this.$notify({
            title: '删除视图',
            message: '删除失败',
            type: 'error',
            duration: 2000,
            position: 'bottom-right'
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../style/common.less";
  @import "../../style/setting.less";

  .view-header {
    padding: 30px 0;
    .view-header_title {
      font-size: 24px;
      vertical-align: middle;
    }

    .view-header_button {
      margin: 0 5px;
      float: right;
    }

    .view-header-input {
      width: 200px;
      float: right;
    }
  }
</style>
