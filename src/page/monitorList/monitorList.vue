<template>
  <div class="monitorList">
    <div class="container">
      <div class="monitorList-header">
        <span class="monitorList-header_title">监控列表 (Monitor List)</span>
        <el-button class="monitorList-header_button" size="small" type="primary" v-on:click="newMonitorList">创建监控列表</el-button>
        <el-button class="monitorList-header_button" size="small" type="primary" v-on:click="search">查询</el-button>
        <el-select class="monitorList-header-select" size="small" v-model="monitorListSearchInput" placeholder="请输入monitorViewId">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-table
        :data="monitorList"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="monitorViewName"
          label="监控视图名称 (monitorViewName)">
        </el-table-column>
        <el-table-column
          prop="monitorInfoName"
          label="监控列表名称 (monitorInfoName)">
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
      title='添加监控列表 (Add Monitor List)'
      :visible.sync="addDialogVisible"
      width="60%"
      @close="resetForm('addMonitorListForm')">
      <el-form ref="addMonitorListForm" :rules="rules" :model="addMonitorListForm" label-width="240px" label-position="left">
        <el-form-item prop="monitorViewId" label="监控视图名称 (monitorView)">
          <el-select class="monitorList-header-select" v-model="addMonitorListForm.monitorViewId" placeholder="请选择监控视图">
            <el-option
              v-for="item in monitorViewOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="monitorInfoName" label="监控列表名称 (monitorInfoName)">
          <el-input v-model="addMonitorListForm.monitorInfoName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addMonitorList('addMonitorListForm')">添加</el-button>
          <el-button @click="resetForm('addMonitorListForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title='修改监控列表 (Modify Monitor List)'
      :visible.sync="updateDialogVisible"
      width="60%"
      @close="resetForm('updateMonitorListForm')">
      <el-form ref="updateMonitorListForm" :rules="rules" :model="updateMonitorListForm" label-width="240px" label-position="left">
        <el-form-item prop="monitorViewId" label="监控视图名称 (monitorView)">
          <el-select class="monitorList-header-select" v-model="updateMonitorListForm.monitorViewId" placeholder="请选择监控视图">
            <el-option
              v-for="item in monitorViewOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="monitorInfoName" label="监控列表名称 (monitorInfoName)">
          <el-input v-model="updateMonitorListForm.monitorInfoName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeMonitorList('updateMonitorListForm')">修改</el-button>
          <el-button @click="updateDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/babel">
  import {reqQueryMonitorInfo, reqAddMonitorInfo, reqModifyMonitorInfo, reqDeleteMonitorInfo, reqQueryMonitorView} from '../../service/getData'
  import {isSuccess, parseReq} from '../../config/mUtils'

  export default {
    data () {
      return {
        addMonitorListForm: {
          monitorViewId: '',
          monitorInfoName: ''
        },
        updateMonitorListForm: {
          monitorViewId: '',
          monitorInfoName: '',
          monitorInfoId: ''
        },
        monitorListSearchInput: '',
        searchHistory: '',
        monitorList: [],
        addDialogVisible: false,
        updateDialogVisible: false,
        rules: {
          monitorViewId: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          monitorInfoName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          monitorInfoId: [
            {required: true, message: '不能为空', trigger: 'change'}
          ]
        },
        options: [
          {
            value: '',
            label: '全部'
          }
        ],
        monitorViewOptions: []
      }
    },
    mounted () {
      this.queryMonitorViews()
    },
    methods: {
      async queryMonitorViews () {
        let result = await reqQueryMonitorView()
        if (isSuccess(result.code)) {
          for (var i = 0; i < result.data.length; i++) {
            this.options.push({value: result.data[i].monitorViewId, label: result.data[i].monitorViewName})
            this.monitorViewOptions.push({value: result.data[i].monitorViewId, label: result.data[i].monitorViewName})
          }
          this.$notify({
            title: '初始化视图列表',
            message: '刷新成功',
            type: 'success',
            duration: 2000,
            position: 'bottom-right'
          })
        } else {
          this.$notify({
            title: '初始化视图列表',
            message: '刷新失败',
            type: 'error',
            duration: 2000,
            position: 'bottom-right'
          })
        }
      },
      async search () {
        let result = await reqQueryMonitorInfo(parseReq({'monitorViewId': this.monitorListSearchInput}))
        if (isSuccess(result.code)) {
          this.searchHistory = this.monitorListSearchInput
          if (result.data.length === 0) {
            this.monitorList = []
            this.$notify({
              title: '查询数据',
              message: '未查询到记录',
              type: 'warning',
              duration: 2000,
              position: 'bottom-right'
            })
          } else {
            this.monitorList = result.data
            this.$notify({
              title: '查询数据',
              message: '查询成功',
              type: 'success',
              duration: 2000,
              position: 'bottom-right'
            })
          }
        } else {
          this.$notify({
            title: '查询数据',
            message: '查询失败',
            type: 'error',
            duration: 2000,
            position: 'bottom-right'
          })
        }
      },
      async addMonitorList (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let item = await reqAddMonitorInfo(parseReq(this.addMonitorListForm))
            this.resetForm(formName)
            this.addDialogVisible = false
            if (isSuccess(item.code)) {
              this.$notify({
                title: '添加监控列表',
                message: '添加成功',
                type: 'success',
                duration: 2000,
                position: 'bottom-right'
              })
              if (this.searchHistory === item.data[0].monitorViewId) {
                this.monitorListSearchInput = this.searchHistory
                this.search()
              }
            } else {
              this.$notify({
                title: '添加监控列表',
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
      newMonitorList () {
        this.addDialogVisible = true
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.passwordVisible = false
      },
      handleEdit (index, row) {
        this.updateDialogVisible = true
        this.updateMonitorListForm.monitorViewId = this.monitorList[index].monitorViewId
        this.updateMonitorListForm.monitorInfoName = this.monitorList[index].monitorInfoName
        this.updateMonitorListForm.monitorInfoId = this.monitorList[index].monitorInfoId
        this.index = index
      },
      async changeMonitorList (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let result = await reqModifyMonitorInfo(parseReq(this.updateMonitorListForm))
            if (isSuccess(result.code)) {
              this.monitorList = result.data
              this.resetForm(formName)
              this.updateDialogVisible = false
              this.$notify({
                title: '修改监控列表',
                message: '修改成功',
                type: 'success',
                duration: 2000,
                position: 'bottom-right'
              })
            } else {
              this.$notify({
                title: '修改监控列表',
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
        let tmpid1 = this.monitorList[index].monitorViewId
        let tmpid2 = this.monitorList[index].monitorInfoId
        let result = await reqDeleteMonitorInfo(parseReq({'monitorViewId': tmpid1, 'monitorInfoId': tmpid2}))

        if (isSuccess(result.code)) {
          this.monitorList = this.monitorList.filter(function (item) {
            return item.monitorViewId !== tmpid1 || item.monitorInfoId !== tmpid2
          })
          this.$notify({
            title: '删除监控列表',
            message: '删除成功',
            type: 'success',
            duration: 2000,
            position: 'bottom-right'
          })
        } else {
          this.$notify({
            title: '删除监控列表',
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

  .monitorList-header {
    padding: 30px 0;
    .monitorList-header_title {
      font-size: 24px;
      vertical-align: middle;
    }

    .monitorList-header_button {
      margin: 0 5px;
      float: right;
    }

    .monitorList-header-select {
      float: right;
    }
  }
</style>
