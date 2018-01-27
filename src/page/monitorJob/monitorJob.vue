<template>
  <div class="monitorJob">
    <div class="container">
      <div class="monitorJob-header">
        <span class="monitorJob-header_title">监控任务列表 (Monitor Detail List)</span>
        <el-button class="monitorJob-header_button" size="small" type="primary" v-on:click="newMonitorDetail">创建监控列表</el-button>
        <el-button class="monitorJob-header_button" size="small" type="primary" v-on:click="queryMonitorDetails">查询</el-button>
        <el-select class="monitorJob-header-select" size="small" v-model="monitorInfoSearchInput" placeholder="请选择监控列表">
          <el-option
            v-for="item in InfoOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="monitorJob-header-select" size="small" v-model="monitorViewSearchInput" placeholder="请选择监控视图" @change="unionSelect">
          <el-option
            v-for="item in ViewOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-table
        :data="monitorJobs"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="monitorDetailName"
          label="监控任务名称 (monitorDetailName)">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="ip地址 (ip)">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名 (userName)">
        </el-table-column>
        <el-table-column
          prop="userPwd"
          label="密码 (userPwd)">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径 (path)">
        </el-table-column>
        <el-table-column
          prop="command"
          label="命令 (command)">
        </el-table-column>
        <el-table-column
          prop="param"
          label="参数 (param)">
        </el-table-column>
        <el-table-column
          prop="charset"
          label="字符集 (charset)">
        </el-table-column>
        <el-table-column
          prop="autoExeState"
          label="自动执行状态 (autoExeState)">
        </el-table-column>
        <el-table-column
          prop="autoExeTime"
          label="自动执行时间 (autoExeTime)">
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
      title='添加监控任务 (Add Monitor Detail)'
      :visible.sync="addDialogVisible"
      width="60%"
      @close="resetForm('addMonitorDetailForm')">
      <el-form ref="addMonitorDetailForm" :rules="rules" :model="addMonitorDetailForm" label-width="250px" label-position="left">
        <el-form-item prop="monitorViewId" label="监控视图名称 (monitorView)">
          <el-select v-model="addMonitorDetailForm.monitorViewId" placeholder="请选择监控视图" @change="unionDistinctSelect">
            <el-option
              v-for="item in monitorViewOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="monitorInfoId" label="监控列表名称 (monitorList)">
          <el-select v-model="addMonitorDetailForm.monitorInfoId" placeholder="请选择监控列表">
            <el-option
              v-for="item in monitorInfoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="monitorDetailName" label="监控任务名称 (monitorDetailName)">
          <el-input v-model="addMonitorDetailForm.monitorDetailName"></el-input>
        </el-form-item>
        <el-form-item prop="ip" label="ip地址 (ip)">
          <el-input v-model="addMonitorDetailForm.ip"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="用户名 (userName)">
          <el-input v-model="addMonitorDetailForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="userPwd" label="密码 (userPwd)">
          <el-input v-model="addMonitorDetailForm.userPwd"></el-input>
        </el-form-item>
        <el-form-item prop="path" label="路径 (path)">
          <el-input v-model="addMonitorDetailForm.path"></el-input>
        </el-form-item>
        <el-form-item prop="command" label="命令 (command)">
          <el-input v-model="addMonitorDetailForm.command"></el-input>
        </el-form-item>
        <el-form-item prop="param" label="参数 (param)">
          <el-input v-model="addMonitorDetailForm.param"></el-input>
        </el-form-item>
        <el-form-item prop="charset" label="字符集 (charset)">
          <el-input v-model="addMonitorDetailForm.charset"></el-input>
        </el-form-item>
        <el-form-item prop="autoExeState" label="自动执行状态 (autoExeState)">
          <el-input v-model="addMonitorDetailForm.autoExeState"></el-input>
        </el-form-item>
        <el-form-item prop="autoExeTime" label="自动执行时间 (autoExeTime)">
          <el-input v-model="addMonitorDetailForm.autoExeTime"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addMonitorJob('addMonitorDetailForm')">添加</el-button>
          <el-button @click="resetForm('addMonitorDetailForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title='修改监控任务 (Modify Monitor Detail)'
      :visible.sync="updateDialogVisible"
      width="60%"
      @close="resetForm('updateMonitorDetailForm')">
      <el-form ref="updateMonitorDetailForm" :rules="rules" :model="updateMonitorDetailForm" label-width="250px" label-position="left">
        <el-form-item prop="monitorViewId" label="监控视图名称 (monitorView)">
          <el-select v-model="updateMonitorDetailForm.monitorViewId" placeholder="请选择监控视图" @change="updateSelect">
            <el-option
              v-for="item in monitorViewOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="monitorInfoId" label="监控列表名称 (monitorInfoId)">
          <el-select v-model="updateMonitorDetailForm.monitorInfoId" placeholder="请选择监控列表">
            <el-option
              v-for="item in monitorUpdateInfoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="monitorDetailName" label="监控任务名称 (monitorDetailName)">
          <el-input v-model="updateMonitorDetailForm.monitorDetailName"></el-input>
        </el-form-item>
        <el-form-item prop="ip" label="ip地址 (ip)">
          <el-input v-model="updateMonitorDetailForm.ip"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="用户名 (userName)">
          <el-input v-model="updateMonitorDetailForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="userPwd" label="密码 (userPwd)">
          <el-input v-model="updateMonitorDetailForm.userPwd"></el-input>
        </el-form-item>
        <el-form-item prop="path" label="路径 (path)">
          <el-input v-model="updateMonitorDetailForm.path"></el-input>
        </el-form-item>
        <el-form-item prop="command" label="命令 (command)">
          <el-input v-model="updateMonitorDetailForm.command"></el-input>
        </el-form-item>
        <el-form-item prop="param" label="参数 (param)">
          <el-input v-model="updateMonitorDetailForm.param"></el-input>
        </el-form-item>
        <el-form-item prop="charset" label="字符集 (charset)">
          <el-input v-model="updateMonitorDetailForm.charset"></el-input>
        </el-form-item>
        <el-form-item prop="autoExeState" label="自动执行状态 (autoExeState)">
          <el-input v-model="updateMonitorDetailForm.autoExeState"></el-input>
        </el-form-item>
        <el-form-item prop="autoExeTime" label="自动执行时间 (autoExeTime)">
          <el-input v-model="updateMonitorDetailForm.autoExeTime"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeMonitorJob('updateMonitorDetailForm')">修改</el-button>
          <el-button @click="updateDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/babel">
  import {reqQueryMonitorView, reqQueryMonitorDetails, reqQueryMonitorInfo, reqAddMonitorDetail, reqModifyMonitorDetail, reqDeleteMonitorDetail} from '../../service/getData'
  import {isSuccess, parseReq} from '../../config/mUtils'

  export default {
    data () {
      return {
        addMonitorDetailForm: {
          monitorViewId: '',
          monitorInfoId: '',
          monitorDetailName: '',
          ip: '',
          userName: '',
          userPwd: '',
          path: '',
          command: '',
          param: '',
          charset: '',
          autoExeState: '',
          autoExeTime: ''
        },
        updateMonitorDetailForm: {
          monitorViewId: '',
          monitorInfoId: '',
          monitorDetailId: '',
          monitorDetailName: '',
          ip: '',
          userName: '',
          userPwd: '',
          path: '',
          command: '',
          param: '',
          charset: '',
          autoExeState: '',
          autoExeTime: ''
        },
        monitorViewSearchInput: '',
        monitorInfoSearchInput: '',
        ViewOptions: [
          {
            value: '',
            label: '全部'
          }
        ],
        InfoOptions: [
          {
            value: '',
            label: '全部'
          }
        ],
        monitorViewOptions: [],
        monitorInfoOptions: [],
        monitorUpdateInfoOptions: [],
        monitorJobs: [],
        addDialogVisible: false,
        updateDialogVisible: false,
        rules: {
          monitorViewId: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          monitorInfoId: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          monitorDetailName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          ip: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          userName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          userPwd: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          path: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          command: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          param: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          charset: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          autoExeState: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          autoExeTime: [
            {required: true, message: '不能为空', trigger: 'change'}
          ]
        }
      }
    },
    mounted () {
      this.queryMonitorViews()
      this.queryMonitorList()
    },
    methods: {
      async queryMonitorViews () {
        let result = await reqQueryMonitorView()
        if (isSuccess(result.code)) {
          for (var i = 0; i < result.data.length; i++) {
            this.ViewOptions.push({value: result.data[i].monitorViewId, label: result.data[i].monitorViewName})
            this.monitorViewOptions.push({value: result.data[i].monitorViewId, label: result.data[i].monitorViewName})
          }
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
      async queryMonitorList () {
        let result = await reqQueryMonitorInfo(parseReq({'monitorViewId': this.monitorViewSearchInput}))
        if (isSuccess(result.code)) {
          for (var i = 0; i < result.data.length; i++) {
            this.InfoOptions.push({value: result.data[i].monitorInfoId, label: result.data[i].monitorInfoName})
          }
        } else {
          this.$notify({
            title: '初始化监控列表',
            message: '刷新失败',
            type: 'error',
            duration: 2000,
            position: 'bottom-right'
          })
        }
      },
      async unionSelect () {
        let result = await reqQueryMonitorInfo(parseReq({'monitorViewId': this.monitorViewSearchInput}))
        if (isSuccess(result.code)) {
          this.InfoOptions = [
            {
              value: '',
              label: '全部'
            }
          ]
          for (var i = 0; i < result.data.length; i++) {
            this.InfoOptions.push({value: result.data[i].monitorInfoId, label: result.data[i].monitorInfoName})
          }
        } else {
          this.$notify({
            title: '初始化下拉框',
            message: '刷新失败',
            type: 'error',
            duration: 2000,
            position: 'bottom-right'
          })
        }
      },
      async unionDistinctSelect () {
        let result = await reqQueryMonitorInfo(parseReq({'monitorViewId': this.addMonitorDetailForm.monitorViewId}))
        if (isSuccess(result.code)) {
          this.monitorInfoOptions = []
          for (var i = 0; i < result.data.length; i++) {
            this.monitorInfoOptions.push({value: result.data[i].monitorInfoId, label: result.data[i].monitorInfoName})
          }
        } else {
          this.$notify({
            title: '初始化下拉框',
            message: '刷新失败',
            type: 'error',
            duration: 2000,
            position: 'bottom-right'
          })
        }
      },
      async updateSelect () {
        let result = await reqQueryMonitorInfo(parseReq({'monitorViewId': this.updateMonitorDetailForm.monitorViewId}))
        if (isSuccess(result.code)) {
          this.monitorUpdateInfoOptions = []
          for (var i = 0; i < result.data.length; i++) {
            this.monitorUpdateInfoOptions.push({value: result.data[i].monitorInfoId, label: result.data[i].monitorInfoName})
          }
        } else {
          this.$notify({
            title: '初始化下拉框',
            message: '刷新失败',
            type: 'error',
            duration: 2000,
            position: 'bottom-right'
          })
        }
      },
      async queryMonitorDetails () {
        let result = await reqQueryMonitorDetails(parseReq({'monitorViewId': this.monitorViewSearchInput, 'monitorInfoId': this.monitorInfoSearchInput}))
        if (isSuccess(result.code)) {
          if (result.data.length === 0) {
            this.monitorJobs = []
            this.$notify({
              title: '查询数据',
              message: '未查询到记录',
              type: 'warning',
              duration: 2000,
              position: 'bottom-right'
            })
          } else {
            this.monitorJobs = result.data
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
      newMonitorDetail () {
        this.addDialogVisible = true
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      async addMonitorJob (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let item = await reqAddMonitorDetail(parseReq(this.addMonitorDetailForm))
            this.monitorJobs = item.data
            this.resetForm(formName)
            this.addDialogVisible = false
            if (isSuccess(item.code)) {
              this.$notify({
                title: '添加监控任务',
                message: '添加成功',
                type: 'success',
                duration: 2000,
                position: 'bottom-right'
              })
            } else {
              this.$notify({
                title: '添加监控任务',
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
        this.updateMonitorDetailForm.monitorViewId = this.monitorJobs[index].monitorViewId
        this.updateMonitorDetailForm.monitorInfoId = this.monitorJobs[index].monitorInfoId
        this.updateMonitorDetailForm.monitorDetailId = this.monitorJobs[index].monitorDetailId
        this.updateMonitorDetailForm.monitorDetailName = this.monitorJobs[index].monitorDetailName
        this.updateMonitorDetailForm.ip = this.monitorJobs[index].ip
        this.updateMonitorDetailForm.userName = this.monitorJobs[index].userName
        this.updateMonitorDetailForm.userPwd = this.monitorJobs[index].userPwd
        this.updateMonitorDetailForm.path = this.monitorJobs[index].path
        this.updateMonitorDetailForm.command = this.monitorJobs[index].command
        this.updateMonitorDetailForm.param = this.monitorJobs[index].param
        this.updateMonitorDetailForm.charset = this.monitorJobs[index].charset
        this.updateMonitorDetailForm.autoExeState = this.monitorJobs[index].autoExeState
        this.updateMonitorDetailForm.autoExeTime = this.monitorJobs[index].autoExeTime
        this.index = index
        this.updateSelect()
      },
      async changeMonitorJob (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let result = await reqModifyMonitorDetail(parseReq(this.updateMonitorDetailForm))
            if (isSuccess(result.code)) {
              this.monitorJobs = result.data
              this.resetForm(formName)
              this.updateDialogVisible = false
              this.$notify({
                title: '修改监控任务',
                message: '修改成功',
                type: 'success',
                duration: 2000,
                position: 'bottom-right'
              })
            } else {
              this.$notify({
                title: '修改监控任务',
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
        let tmpid1 = this.monitorJobs[index].monitorViewId
        let tmpid2 = this.monitorJobs[index].monitorInfoId
        let tmpid3 = this.monitorJobs[index].monitorDetailId
        let result = await reqDeleteMonitorDetail(parseReq({'monitorViewId': tmpid1, 'monitorInfoId': tmpid2, 'monitorDetailId': tmpid3}))

        if (isSuccess(result.code)) {
          this.monitorJobs = this.monitorJobs.filter(function (item) {
            return item.monitorViewId !== tmpid1 || item.monitorInfoId !== tmpid2 || item.monitorDetailId !== tmpid3
          })
          this.$notify({
            title: '删除监控任务',
            message: '删除成功',
            type: 'success',
            duration: 2000,
            position: 'bottom-right'
          })
        } else {
          this.$notify({
            title: '删除监控任务',
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

  .monitorJob-header {
    padding: 30px 0;
    .monitorJob-header_title {
      font-size: 24px;
      vertical-align: middle;
    }

    .monitorJob-header_button {
      margin: 0 5px;
      float: right;
    }

    .monitorJob-header-select {
      float: right;
      margin-left: 10px;
    }
  }
</style>
