<!--
 * @Author: 王荣
 * @Date: 2020-10-15 11:23:59
 * @LastEditors: 王荣
 * @LastEditTime: 2022-06-17 17:51:56
 * @Description: 填写简介
-->
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <!-- 和router-view一样，无需引入直接使用，但如果我没用使用router，这里会报错么？还是有点难以接受，vue背后做的事太多了，反开发者直觉。 -->
    <router-link class="navbar-brand" to="/">者也专栏</router-link>
     <!-- v-if指令 条件渲染 根据监听变量的boolean类型切换被绑定组件的显隐 -->
     <!-- 指令的值就是一个js表达式 -->
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item"><router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <!-- v-if条件渲染指令的else分支，个人感觉这种指令真不直观，既然采用了if else的做法，但在模版内又没有常规if else的闭合，看到v-if并不能知道下面是否有else的内容。如果条件渲染内的dom内容稍微长点，内容就无法阅读，而且嵌套if else更无法阅读，只能说这种指令只适用于比较短的代码，或者切换组件。但实际开发中随着业务的迭代，根本没法控制。 -->
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <!-- v-bind指令就是react常规的props传值 但vue对bind class做了些优化 可以理解bind class内置了react的classNames库 -->
        <dropdown :title="`你好 ${user.nickName}`">
          <dropdown-item><router-link to="/create" class="dropdown-item">新建文章</router-link></dropdown-item>
          <dropdown-item><router-link :to="`/column/${user.column}`" class="dropdown-item">我的专栏</router-link></dropdown-item>
          <dropdown-item disabled><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>
          <dropdown-item><a href="#" class="dropdown-item">退出登陆</a></dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './dropdown/Dropdown.vue'
import DropdownItem from './dropdown/DropdownItem.vue'
import { UserProps } from '../store'

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>
