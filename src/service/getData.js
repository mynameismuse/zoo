import fetch from '../config/fetch'

// 数据源交互
export const reqDatasource = () => fetch('/dataview/querydatasources', {}, 'POST', 'fetch')

export const reqAddDatasource = (data) => fetch('/dataview/adddatasource', data, 'POST', 'test')

export const reqDeleteDatasource = (data) => fetch('/dataview/deldatasource', data, 'POST', 'test')

export const reqModifyDatasource = (data) => fetch('/dataview/updatedatasource', data, 'POST', 'test')

// Sql交互
export const reqQuerySqlsource = (id) => fetch('/dataview/querydatasourceviews', id, 'POST', 'test')

export const reqQuerySqlviews = () => fetch('/dataview/querydataviews', {}, 'POST', 'test')

export const reqAddSqlsource = (data) => fetch('/dataview/adddatasourceview', data, 'POST', 'test')

export const reqDeleteSqlsource = (data) => fetch('/dataview/deldatasourceview', data, 'POST', 'test')

export const reqModifySqlsource = (data) => fetch('/dataview/updatedatasourceview', data, 'POST', 'test')

// 视图交互
export const reqQueryView = () => fetch('/dataview/querydataviews', {}, 'POST', 'fetch')

export const reqAddView = (data) => fetch('/dataview/adddataview', data, 'POST', 'test')

export const reqDeleteView = (data) => fetch('/dataview/deldataview', data, 'POST', 'test')

export const reqModifyView = (data) => fetch('/dataview/updatedataview', data, 'POST', 'test')

// 监控视图交互
export const reqQueryMonitorView = () => fetch('/monitor/querymonitorviews', {}, 'POST', 'test')

export const reqAddMonitorView = (data) => fetch('/monitor/addmonitorview', data, 'POST', 'test')

export const reqDeleteMonitorView = (data) => fetch('/monitor/delmonitorview', data, 'POST', 'test')

export const reqModifyMonitorView = (data) => fetch('/monitor/updatemonitorview', data, 'POST', 'test')

// 监控列表交互

export const reqQueryMonitorInfo = (id) => fetch('/monitor/querymonitorinfos', id, 'POST', 'test')

export const reqAddMonitorInfo = (data) => fetch('/monitor/addmonitorinfo', data, 'POST', 'test')

export const reqModifyMonitorInfo = (data) => fetch('/monitor/updatemonitorinfo', data, 'POST', 'test')

export const reqDeleteMonitorInfo = (data) => fetch('/monitor/delmonitorinfo', data, 'POST', 'test')

// 监控任务交互
export const reqQueryMonitorDetails = (data) => fetch('/monitor/querymonitordetails', data, 'POST', 'test')

export const reqAddMonitorDetail = (data) => fetch('/monitor/addmonitordetail', data, 'POST', 'test')

export const reqModifyMonitorDetail = (data) => fetch('/monitor/updatemonitordetail', data, 'POST', 'test')

export const reqDeleteMonitorDetail = (data) => fetch('/monitor/delmonitordetail', data, 'POST', 'test')
