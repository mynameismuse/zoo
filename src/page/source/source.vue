<template>
  <div class="source">
    <div class="container">
      <div class="source-header">
        <span class="source-header_title">数据源列表 (DataSource List)</span>
        <el-button class="source-header_button" size="small" icon="el-icon-refresh" type="primary" v-on:click="refresh">刷新列表</el-button>
        <el-button class="source-header_button" size="small" type="primary" v-on:click="newSource">创建数据源</el-button>
      </div>
      <el-table
        :data="datasourceList"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="dataSourceAlias"
          label="别名 (Alias)">
        </el-table-column>
        <el-table-column
          prop="dataSourceDesc"
          label="描述 (Desc)">
        </el-table-column>
        <el-table-column
          prop="dataSourceType"
          label="数据源类型 (Type)">
        </el-table-column>
        <el-table-column
          prop="dataSourceName"
          label="数据源名称 (sourceName)">
        </el-table-column>
        <el-table-column
          prop="url"
          label="数据源路径 (URL)">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名 (Username)">
        </el-table-column>
        <el-table-column
          label="密码 (Password)">
          <template slot-scope="scope">
            <el-input type="password" v-model="scope.row.password" :readonly="true">
            </el-input>
          </template>
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
      title='添加数据源 (Add DataSource)'
      :visible.sync="addDialogVisible"
      width="40%"
      @close="resetForm('addSourceForm')">
      <el-form ref="addSourceForm" :rules="rules" :model="addSourceForm" label-width="200px" label-position="left">
        <el-form-item prop="alias" label="别名 (Alias)">
          <el-input v-model="addSourceForm.alias"></el-input>
        </el-form-item>
        <el-form-item prop="desc" label="描述 (Desc)">
          <el-input v-model="addSourceForm.desc"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="数据源类型 (Type)">
          <el-select v-model="addSourceForm.type" placeholder="请选择数据源类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="driverName" label="数据源名称 (sourceName)">
          <el-input v-model="addSourceForm.driverName"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="数据源路径 (URL)">
          <el-input v-model="addSourceForm.url"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="用户名 (Username)">
          <el-input v-model="addSourceForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码 (Password)">
          <el-input :type="inputType" v-model="addSourceForm.password">
            <el-button slot="append" v-on:click="pwVisibleChange">{{ passwordButtonText }}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSource('addSourceForm')">添加</el-button>
          <el-button @click="resetForm('addSourceForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title='修改数据源 (Modify DataSource)'
      :visible.sync="updateDialogVisible"
      width="40%">
      <el-form ref="updateSourceForm" :rules="rules" :model="updateSourceForm" label-width="200px" label-position="left">
        <el-form-item prop="alias" label="别名 (Alias)">
          <el-input v-model="updateSourceForm.alias"></el-input>
        </el-form-item>
        <el-form-item prop="desc" label="描述 (Desc)">
          <el-input v-model="updateSourceForm.desc"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="数据源类型 (Type)">
          <el-select v-model="updateSourceForm.type" placeholder="请选择数据源类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="driverName" label="数据源名称 (sourceName)">
          <el-input v-model="updateSourceForm.driverName"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="数据源路径 (URL)">
          <el-input v-model="updateSourceForm.url"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="用户名 (Username)">
          <el-input v-model="updateSourceForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码 (Password)">
          <el-input :type="inputType" v-model="updateSourceForm.password">
            <el-button slot="append" v-on:click="pwVisibleChange">{{ passwordButtonText }}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeSource('updateSourceForm')">修改</el-button>
          <el-button @click="updateDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/babel">
  import {reqDatasource, reqModifyDatasource, reqAddDatasource, reqDeleteDatasource} from '../../service/getData'
  import {mapState, mapMutations} from 'vuex'
  import {isSuccess, parseReq} from '../../config/mUtils'

  export default {
    data: function () {
      return {
        addSourceForm: {
          desc: '',
          alias: '',
          driverName: '',
          url: '',
          username: '',
          password: '',
          type: ''
        },
        updateSourceForm: {
          id: '',
          desc: '',
          alias: '',
          driverName: '',
          url: '',
          username: '',
          password: '',
          type: ''
        },
        options: [
          {
            value: 'oracle',
            label: 'Oracle'
          }
        ],
        addDialogVisible: false,
        updateDialogVisible: false,
        passwordVisible: false,
        rules: {
          id: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          alias: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          driverName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          url: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          username: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          password: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          type: [
            {required: true, message: '不能为空', trigger: 'change'}
          ]
        }
      }
    },
    computed: {
      ...mapState([
        'datasourceList'
      ]),
      passwordButtonText: function () {
        if (this.passwordVisible) return '隐藏'
        else return '显示'
      },
      inputType: function () {
        if (this.passwordVisible) return 'text'
        else return 'password'
      }
    },
    mounted () {
      this.initData()
    },
    methods: {
      ...mapMutations([
        'DATA_SOURCE_LIST',
        'DATA_SOURCE_MODIFY',
        'DATA_SOURCE_ADD',
        'DATA_SOURCE_DELETE'
      ]),
      newSource () {
        this.addDialogVisible = true
      },
      pwVisibleChange () {
        // eslint-disable-next-line no-unneeded-ternary
        this.passwordVisible = this.passwordVisible ? false : true
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.passwordVisible = false
      },
      async initData () {
        let tmp = await reqDatasource()
        if (isSuccess(tmp.code)) {
          this.DATA_SOURCE_LIST(tmp.data)
          this.$notify({
            title: '初始化数据源',
            message: '刷新成功',
            type: 'success',
            duration: 2000,
            position: 'bottom-right'
          })
        } else {
          this.$notify({
            title: '初始化数据源',
            message: '刷新失败',
            type: 'error',
            duration: 2000,
            position: 'bottom-right'
          })
        }
      },
      async addSource (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let addSourceItem = {}
            addSourceItem.dataSourceAlias = this.addSourceForm.alias
            addSourceItem.dataSourceName = this.addSourceForm.driverName
            addSourceItem.dataSourceType = this.addSourceForm.type
            addSourceItem.dataSourceDesc = this.addSourceForm.desc
            addSourceItem.url = this.addSourceForm.url
            addSourceItem.username = this.addSourceForm.username
            addSourceItem.password = this.addSourceForm.password
            let item = await reqAddDatasource(parseReq(addSourceItem))
            if (isSuccess(item.code)) {
              this.DATA_SOURCE_ADD(item.data)
              this.resetForm(formName)
              this.addDialogVisible = false
              this.$notify({
                title: '添加数据源',
                message: '添加成功',
                type: 'success',
                duration: 2000,
                position: 'bottom-right'
              })
            } else {
              this.$notify({
                title: '添加数据源',
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
      async changeSource (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let updateSourceItem = {}
            updateSourceItem.dataSourceId = this.updateSourceForm.id
            updateSourceItem.dataSourceAlias = this.updateSourceForm.alias
            updateSourceItem.dataSourceName = this.updateSourceForm.driverName
            updateSourceItem.dataSourceType = 'oracle'
            updateSourceItem.dataSourceDesc = this.updateSourceForm.desc
            updateSourceItem.url = this.updateSourceForm.url
            updateSourceItem.username = this.updateSourceForm.username
            updateSourceItem.password = this.updateSourceForm.password
            let item = await reqModifyDatasource(parseReq(updateSourceItem))
            if (isSuccess(item.code)) {
              this.DATA_SOURCE_MODIFY(item.data)
              this.resetForm(formName)
              this.updateDialogVisible = false
              this.$notify({
                title: '修改数据源',
                message: '修改成功',
                type: 'success',
                duration: 2000,
                position: 'bottom-right'
              })
            } else {
              this.$notify({
                title: '修改数据源',
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
      handleEdit (index, row) {
        this.updateDialogVisible = true
        this.updateSourceForm.id = this.datasourceList[index].dataSourceId
        this.updateSourceForm.desc = this.datasourceList[index].dataSourceDesc
        this.updateSourceForm.alias = this.datasourceList[index].dataSourceAlias
        this.updateSourceForm.driverName = this.datasourceList[index].dataSourceName
        this.updateSourceForm.url = this.datasourceList[index].url
        this.updateSourceForm.username = this.datasourceList[index].username
        this.updateSourceForm.password = this.datasourceList[index].password
        this.updateSourceForm.type = this.datasourceList[index].dataSourceType
        this.index = index
      },
      async handleDelete (index, row) {
        let result = await reqDeleteDatasource(parseReq({'dataSourceId': this.datasourceList[index].dataSourceId}))
        if (isSuccess(result.code)) {
          this.DATA_SOURCE_DELETE(this.datasourceList[index].dataSourceId)
          this.$notify({
            title: '删除数据源',
            message: '删除成功',
            type: 'success',
            duration: 2000,
            position: 'bottom-right'
          })
        } else {
          this.$notify({
            title: '删除数据源',
            message: '删除失败',
            type: 'error',
            duration: 2000,
            position: 'bottom-right'
          })
        }
      },
      refresh () {
        this.initData()
      }
    }
  }
</script>
<style lang="less" scoepd>
  @import "../../style/common.less";
  @import "../../style/setting.less";

  .el-dialog {
    padding: 20px;
  }

  .source-header {
    padding: 30px 0;
    .source-header_title {
      font-size: 24px;
      vertical-align: middle;
    }

    .source-header_button {
      margin: 0 5px;
      float: right;
    }
  }
  .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #d8dce5;
  }
  .el-table {
    margin-top: 10px;

    thead {
      color: #2c3e50;
    }

    input {
      border: none;
      background-color: transparent;
    }

    .el-input-group__append {
      border: none;
      background-color: transparent;
    }
  }
</style>
