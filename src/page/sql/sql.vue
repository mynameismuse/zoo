<template>
  <div class="id">
    <div class="container">
      <div class="sql-header">
        <span class="sql-header_title">搜索任务列表 (SQL List)</span>
        <el-button class="sql-header_button" size="small" type="primary" v-on:click="newSql">创建搜索任务</el-button>
        <el-button class="sql-header_button" size="small" type="primary" v-on:click="search">查询</el-button>
        <el-select class="sql-header-select" size="small" v-model="sqlSearchInput" placeholder="请输入dataViewId">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-table
        :data="sqlList"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题 (Title)">
        </el-table-column>
        <el-table-column
          prop="dataSourceViewName"
          label="搜索名称 (dataSourceViewName)">
        </el-table-column>
        <el-table-column
          prop="describe"
          label="描述 (Desc)">
        </el-table-column>
        <el-table-column
          prop="viewType"
          label="类型 (Type)">
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
      title='添加搜索任务 (Add Search Job)'
      :visible.sync="addDialogVisible"
      width="60%"
      @close="resetForm('addSqlForm')">
      <el-form ref="addSqlForm" :rules="rules" :model="addSqlForm" label-width="260px" label-position="left">
        <el-form-item prop="dataSourceViewName" label="搜索任务名称 (dataSourceViewName)">
          <el-input v-model="addSqlForm.dataSourceViewName"></el-input>
        </el-form-item>
        <el-form-item prop="dataSourceId" label="数据源 (dataSource)">
          <el-select class="sql-header-select" v-model="addSqlForm.dataSourceId" placeholder="请选择数据源">
            <el-option
              v-for="item in datasourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="dataViewId" label="数据视图 (dataView)">
          <el-select class="sql-header-select" v-model="addSqlForm.dataViewId" placeholder="请选择数据视图">
            <el-option
              v-for="item in dataviewOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="viewType" label="数据类型 (viewType)">
          <el-select class="sql-header-select" v-model="addSqlForm.viewType" placeholder="请选择数据类型">
            <el-option
              v-for="item in viewTypesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="fields" label="域 (fields)">
          <el-input v-model="addSqlForm.fields"></el-input>
        </el-form-item>
        <el-form-item prop="sql" label="数据库语句 (SQL)">
          <el-input v-model="addSqlForm.sql"></el-input>
        </el-form-item>
        <el-form-item prop="sqlConditions" label="数据库语句条件 (sqlConditions)">
          <el-input v-model="addSqlForm.sqlConditions"></el-input>
        </el-form-item>
        <el-form-item prop="unit" label="单位 (unit)">
          <el-input v-model="addSqlForm.unit"></el-input>
        </el-form-item>
        <el-form-item prop="refreshTime" label="刷新时间 (refreshTime)">
          <el-input v-model="addSqlForm.refreshTime"></el-input>
        </el-form-item>
        <el-form-item prop="title" label="标题 (title)">
          <el-input v-model="addSqlForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="subTitle" label="副标题 (subTitle)">
          <el-input v-model="addSqlForm.subTitle"></el-input>
        </el-form-item>
        <el-form-item prop="tipName" label="提示名称 (tipName)">
          <el-input v-model="addSqlForm.tipName"></el-input>
        </el-form-item>
        <el-form-item prop="describe" label="描述 (describe)">
          <el-input v-model="addSqlForm.describe"></el-input>
        </el-form-item>
        <el-form-item prop="priorityLevel" label="优先级 (priorityLevel)">
          <el-input v-model="addSqlForm.priorityLevel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSql('addSqlForm')">添加</el-button>
          <el-button @click="resetForm('addSqlForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title='修改搜索任务 (Modify Search Job)'
      :visible.sync="updateDialogVisible"
      width="60%"
      @close="resetForm('updateSqlForm')">
      <el-form ref="updateSqlForm" :rules="rules" :model="updateSqlForm" label-width="260px" label-position="left">
        <el-form-item prop="dataSourceViewName" label="搜索任务名称 (dataSourceViewName)">
          <el-input v-model="updateSqlForm.dataSourceViewName"></el-input>
        </el-form-item>
        <el-form-item prop="dataSourceId" label="数据源 (dataSource)">
          <el-select class="sql-header-select" v-model="updateSqlForm.dataSourceId" placeholder="请选择数据源">
            <el-option
              v-for="item in datasourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="dataViewId" label="数据视图 (dataView)">
          <el-select class="sql-header-select" v-model="updateSqlForm.dataViewId" placeholder="请选择数据视图">
            <el-option
              v-for="item in dataviewOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="viewType" label="数据类型 (viewType)">
          <el-select class="sql-header-select" v-model="updateSqlForm.viewType" placeholder="请选择数据类型">
            <el-option
              v-for="item in viewTypesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="fields" label="域 (fields)">
          <el-input v-model="updateSqlForm.fields"></el-input>
        </el-form-item>
        <el-form-item prop="sql" label="数据库语句 (SQL)">
          <el-input v-model="updateSqlForm.sql"></el-input>
        </el-form-item>
        <el-form-item prop="sqlConditions" label="数据库语句条件 (sqlConditions)">
          <el-input v-model="updateSqlForm.sqlConditions"></el-input>
        </el-form-item>
        <el-form-item prop="unit" label="单位 (unit)">
          <el-input v-model="updateSqlForm.unit"></el-input>
        </el-form-item>
        <el-form-item prop="refreshTime" label="刷新时间 (refreshTime)">
          <el-input v-model="updateSqlForm.refreshTime"></el-input>
        </el-form-item>
        <el-form-item prop="title" label="标题 (title)">
          <el-input v-model="updateSqlForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="subTitle" label="副标题 (subTitle)">
          <el-input v-model="updateSqlForm.subTitle"></el-input>
        </el-form-item>
        <el-form-item prop="tipName" label="提示名称 (tipName)">
          <el-input v-model="updateSqlForm.tipName"></el-input>
        </el-form-item>
        <el-form-item prop="describe" label="描述 (describe)">
          <el-input v-model="updateSqlForm.describe"></el-input>
        </el-form-item>
        <el-form-item prop="priorityLevel" label="优先级 (priorityLevel)">
          <el-input v-model="updateSqlForm.priorityLevel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeSql('updateSqlForm')">修改</el-button>
          <el-button @click="updateDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/babel">
  import {reqQuerySqlsource, reqAddSqlsource, reqDeleteSqlsource, reqModifySqlsource, reqQuerySqlviews, reqDatasource} from '../../service/getData'
  import {isSuccess, parseReq} from '../../config/mUtils'

  export default {
    data: function () {
      return {
        addSqlForm: {
          dataSourceViewName: '',
          dataSourceId: '',
          dataViewId: '',
          viewType: '',
          fields: '',
          sql: '',
          sqlConditions: '',
          unit: '',
          refreshTime: '',
          title: '',
          subTitle: '',
          tipName: '',
          describe: '',
          priorityLevel: ''
        },
        updateSqlForm: {
          dataSourceViewId: '',
          dataSourceViewName: '',
          dataSourceId: '',
          dataViewId: '',
          viewType: '',
          fields: '',
          sql: '',
          sqlConditions: '',
          unit: '',
          refreshTime: '',
          title: '',
          subTitle: '',
          tipName: '',
          describe: '',
          priorityLevel: ''
        },
        options: [
          {
            value: '',
            label: '全部'
          }
        ],
        viewTypesOptions: [
          {
            value: 'tip',
            label: '文字图(tip)'
          },
          {
            value: 'line',
            label: '线状图(line)'
          },
          {
            value: 'bar',
            label: '柱状图(bar)'
          },
          {
            value: 'area',
            label: '面积图(area)'
          },
          {
            value: 'pie',
            label: '扇形图(pie)'
          }
        ],
        dataviewOptions: [],
        datasourceOptions: [],
        sqlSearchInput: '',
        searchHistory: '',
        sqlList: [],
        addDialogVisible: false,
        updateDialogVisible: false,
        rules: {
          dataSourceViewId: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          dataSourceViewName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          dataSourceId: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          dataViewId: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          viewType: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          sql: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          unit: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          refreshTime: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          title: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          subTitle: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          tipName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          describe: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          priorityLevel: [
            {required: true, message: '不能为空', trigger: 'change'}
          ]
        }
      }
    },
    mounted () {
      this.queryDataViews()
      this.queryDataSources()
    },
    methods: {
      async queryDataViews () {
        let result = await reqQuerySqlviews()
        if (isSuccess(result.code)) {
          for (var i = 0; i < result.data.length; i++) {
            this.options.push({value: result.data[i].dataViewId, label: result.data[i].dataViewName})
            this.dataviewOptions.push({value: result.data[i].dataViewId, label: result.data[i].dataViewName})
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
      async queryDataSources () {
        let result = await reqDatasource()
        if (isSuccess(result.code)) {
          for (var i = 0; i < result.data.length; i++) {
            this.datasourceOptions.push({value: result.data[i].dataSourceId, label: result.data[i].dataSourceName})
          }
          this.$notify({
            title: '初始化数据源列表',
            message: '刷新成功',
            type: 'success',
            duration: 2000,
            position: 'bottom-right'
          })
        } else {
          this.$notify({
            title: '初始化数据源列表',
            message: '刷新失败',
            type: 'error',
            duration: 2000,
            position: 'bottom-right'
          })
        }
      },
      async search () {
        let result = await reqQuerySqlsource(parseReq({'dataViewId': this.sqlSearchInput}))
        if (isSuccess(result.code)) {
          this.searchHistory = this.sqlSearchInput
          if (result.data.length === 0) {
            this.sqlList = []
            this.$notify({
              title: '查询数据',
              message: '未查询到记录',
              type: 'warning',
              duration: 2000,
              position: 'bottom-right'
            })
          } else {
            this.sqlList = result.data
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
      async addSql (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let item = await reqAddSqlsource(parseReq(this.addSqlForm))
            this.resetForm(formName)
            this.addDialogVisible = false
            if (isSuccess(item.code)) {
              this.$notify({
                title: '添加搜索任务',
                message: '添加成功',
                type: 'success',
                duration: 2000,
                position: 'bottom-right'
              })
              if (this.searchHistory === item.data[0].dataViewId) {
                this.sqlList.push(item.data[0])
              }
            } else {
              this.$notify({
                title: '添加搜索任务',
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
      newSql () {
        this.addDialogVisible = true
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.passwordVisible = false
      },
      async handleDelete (index, row) {
        let tmpid1 = this.sqlList[index].dataSourceViewId
        let tmpid2 = this.sqlList[index].dataViewId
        let result = await reqDeleteSqlsource(parseReq({'dataSourceViewId': tmpid1, 'dataViewId': tmpid2}))

        if (isSuccess(result.code)) {
          this.sqlList = this.sqlList.filter(function (item) {
            return item.dataSourceViewId !== tmpid1 || item.dataViewId !== tmpid2
          })
          this.$notify({
            title: '删除搜索任务',
            message: '删除成功',
            type: 'success',
            duration: 2000,
            position: 'bottom-right'
          })
        } else {
          this.$notify({
            title: '删除搜索任务',
            message: '删除失败',
            type: 'error',
            duration: 2000,
            position: 'bottom-right'
          })
        }
      },
      handleEdit (index, row) {
        this.updateDialogVisible = true
        this.updateSqlForm.dataSourceViewId = this.sqlList[index].dataSourceViewId
        this.updateSqlForm.dataSourceViewName = this.sqlList[index].dataSourceViewName
        this.updateSqlForm.dataSourceId = this.sqlList[index].dataSourceId
        this.updateSqlForm.dataViewId = this.sqlList[index].dataViewId
        this.updateSqlForm.viewType = this.sqlList[index].viewType
        this.updateSqlForm.fields = this.sqlList[index].fields
        this.updateSqlForm.sql = this.sqlList[index].sql
        this.updateSqlForm.sqlConditions = this.sqlList[index].sqlConditions
        this.updateSqlForm.unit = this.sqlList[index].unit
        this.updateSqlForm.refreshTime = this.sqlList[index].refreshTime
        this.updateSqlForm.title = this.sqlList[index].title
        this.updateSqlForm.subTitle = this.sqlList[index].subTitle
        this.updateSqlForm.tipName = this.sqlList[index].tipName
        this.updateSqlForm.describe = this.sqlList[index].describe
        this.updateSqlForm.priorityLevel = this.sqlList[index].priorityLevel
        this.index = index
      },
      async changeSql (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let result = await reqModifySqlsource(parseReq(this.updateSqlForm))
            if (isSuccess(result.code)) {
              this.sqlList = result.data
              this.resetForm(formName)
              this.updateDialogVisible = false
              this.$notify({
                title: '修改搜索任务',
                message: '修改成功',
                type: 'success',
                duration: 2000,
                position: 'bottom-right'
              })
            } else {
              this.$notify({
                title: '修改搜索任务',
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
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../style/common.less";
  @import "../../style/setting.less";

  .sql-header {
    padding: 30px 0;
    .sql-header_title {
      font-size: 24px;
      vertical-align: middle;
    }

    .sql-header_button {
      margin: 0 5px;
      float: right;
    }

    .sql-header-select {
      float: right;
    }
  }
</style>
