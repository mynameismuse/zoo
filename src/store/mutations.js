import {
  DATA_SOURCE_LIST,
  DATA_SOURCE_MODIFY,
  DATA_SOURCE_ADD,
  DATA_SOURCE_DELETE,
  DATA_VIEW_LIST,
  DATA_VIEW_ADD,
  DATA_VIEW_MODIFY,
  DATA_VIEW_DELETE,
  DATA_MONITORVIEW_LIST,
  DATA_MONITORVIEW_ADD
} from './mutation-types'

export default {
  [DATA_SOURCE_LIST] (state, datasource) {
    state.datasourceList = datasource
  },
  [DATA_SOURCE_MODIFY] (state, items) {
    state.datasourceList = items
  },
  [DATA_SOURCE_ADD] (state, items) {
    state.datasourceList = items
  },
  [DATA_SOURCE_DELETE] (state, id) {
    state.datasourceList = state.datasourceList.filter(function (item) {
      return item.dataSourceId !== id
    })
  },
  [DATA_VIEW_LIST] (state, viewList) {
    state.dataviewList = viewList
  },
  [DATA_VIEW_ADD] (state, items) {
    state.dataviewList = items
  },
  [DATA_VIEW_MODIFY] (state, items) {
    state.dataviewList = items
  },
  [DATA_VIEW_DELETE] (state, id) {
    state.dataviewList = state.dataviewList.filter(function (item) {
      return item.dataViewId !== id
    })
  },
  [DATA_MONITORVIEW_LIST] (state, viewList) {
    state.dataMonitorviewList = viewList
  },
  [DATA_MONITORVIEW_ADD] (state, items) {
    state.dataMonitorviewList = items
  }
}
