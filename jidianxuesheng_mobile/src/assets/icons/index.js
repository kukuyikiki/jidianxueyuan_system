import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 注册为系统组件
Vue.component('svg-icon', SvgIcon)

//在src/icons/index.js中使用webpack的require.context自动引入src/icons下面的所有图标
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

/*
使用步骤:
1. 在 assets/icon/svg 添加 图标名称.svg 图标
2. 在组件中使用标签: <svg-icon icon-class="图标名称"/>
 */
