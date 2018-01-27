import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getter'

Vue.use(Vuex)

const state = {
  datasourceList: null, // 数据源列表
  dataviewList: null,
  dataMonitorviewList: null
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
