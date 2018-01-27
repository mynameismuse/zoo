import Vue from 'vue'
import Router from 'vue-router'
import landing from '@/page/landing/landing'
import source from '@/page/source/source'
import sql from '@/page/sql/sql'
import view from '@/page/view/view'
import index from '@/page/index/index'
import monitorView from '@/page/monitorView/monitorView'
import monitorList from '@/page/monitorList/monitorList'
import monitorJob from '@/page/monitorJob/monitorJob'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: landing
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/index/source',
          name: 'source',
          component: source
        },
        {
          path: '/index/sql',
          name: 'sql',
          component: sql
        },
        {
          path: '/index/view',
          name: 'view',
          component: view
        },
        {
          path: '/index/monitorView',
          name: 'monitorView',
          component: monitorView
        },
        {
          path: '/index/monitorList',
          name: 'monitorList',
          component: monitorList
        },
        {
          path: '/index/monitorJob',
          name: 'monitorJob',
          component: monitorJob
        }
      ]
    }
  ]
})
