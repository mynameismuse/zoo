<template>
  <div class="monitorView">
    <div class="container">
      <div class="monitorView-header">
        <span class="monitorView-header_title">监控视图列表 (Monitor View)</span>
        <el-button class="monitorView-header_button" size="small" icon="el-icon-refresh" type="primary" v-on:click="refresh">刷新列表</el-button>
        <el-button class="monitorView-header_button" size="small" type="primary" v-on:click="newMonitorView">创建监控视图</el-button>
      </div>
      <el-table
        :data="dataMonitorviewList"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="monitorViewName"
          label="监控视图名称 (monitorViewName)">
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
      title='添加监控视图 (Add Monitor View)'
      :visible.sync="addDialogVisible"
      width="50%"
      @close="resetForm('addMonitorViewForm')">
      <el-form ref="addMonitorViewForm" :rules="rules" :model="addMonitorViewForm" label-width="240px" label-position="left">
        <el-form-item prop="monitorViewName" label="监控视图名称 (monitorViewName)">
          <el-input v-model="addMonitorViewForm.monitorViewName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addMonitorView('addMonitorViewForm')">添加</el-button>
          <el-button @click="resetForm('addMonitorViewForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title='修改监控视图 (Modify Monitor View)'
      :visible.sync="updateDialogVisible"
      width="50%">
      <el-form ref="updateMonitorViewForm" :rules="rules" :model="updateMonitorViewForm" label-width="240px" label-position="left">
        <el-form-item prop="monitorViewName" label="监控视图名称 (monitorViewName)">
          <el-input v-model="updateMonitorViewForm.monitorViewName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeMonitorView('updateMonitorViewForm')">修改</el-button>
          <el-button @click="updateDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/babel">
  import {reqQueryMonitorView, reqAddMonitorView, reqModifyMonitorView, reqDeleteMonitorView} from '../../service/getData'
  import {isSuccess, parseReq} from '../../config/mUtils'
  import {mapState, mapMutations} from 'vuex'

  export default {
    data () {
      return {
        addMonitorViewForm: {
          monitorViewName: ''
        },
        updateMonitorViewForm: {
          monitorViewId: '',
          monitorViewName: ''
        },
        addDialogVisible: false,
        updateDialogVisible: false,
        rules: {
          dataViewId: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          monitorViewName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ]
        }
      }
    },
    computed: {
      ...mapState([
        'dataMonitorviewList'
      ])
    },
    mounted () {
      this.initData()
    },
    methods: {
      ...mapMutations([
        'DATA_MONITORVIEW_LIST',
        'DATA_MONITORVIEW_ADD'
      ]),
      async initData () {
        let tmp = await reqQueryMonitorView()
        if (isSuccess(tmp.code)) {
          this.DATA_MONITORVIEW_LIST(tmp.data)
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
      newMonitorView () {
        this.addDialogVisible = true
      },
      async addMonitorView (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let item = await reqAddMonitorView(parseReq(this.addMonitorViewForm))
            if (isSuccess(item.code)) {
              this.DATA_MONITORVIEW_ADD(item.data)
              this.resetForm(formName)
              this.addDialogVisible = false
              this.$notify({
                title: '添加监控视图',
                message: '添加成功',
                type: 'success',
                duration: 2000,
                position: 'bottom-right'
              })
            } else {
              this.$notify({
                title: '添加监控视图',
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
        this.updateMonitorViewForm.monitorViewId = this.dataMonitorviewList[index].monitorViewId
        this.updateMonitorViewForm.monitorViewName = this.dataMonitorviewList[index].monitorViewName
        this.index = index
      },
      async changeMonitorView (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let item = await reqModifyMonitorView(parseReq({'monitorViewId': this.updateMonitorViewForm.monitorViewId, 'monitorViewName': this.updateMonitorViewForm.monitorViewName}))
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
        let result = await reqDeleteMonitorView(parseReq({'monitorViewId': this.dataMonitorviewList[index].monitorViewId}))
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

  .monitorView-header {
    padding: 30px 0;
    .monitorView-header_title {
      font-size: 24px;
      vertical-align: middle;
    }

    .monitorView-header_button {
      margin: 0 5px;
      float: right;
    }

    .monitorView-header-input {
      width: 200px;
      float: right;
    }
  }
</style>
