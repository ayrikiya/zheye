<!--
 * @Author: 王荣
 * @Date: 2020-10-15 11:23:59
 * @LastEditors: 王荣
 * @LastEditTime: 2022-06-17 10:44:37
 * @Description: 填写简介
-->
<template>
  <div class="container">
    <!-- v-bind指令 父组件向子组件传值 props方式传递 -->
    <global-header :user="currentUser"></global-header>
    <!-- v-if指令 条件渲染 根据监听变量的boolean类型切换被绑定组件的显隐 -->
    <loader v-if="isLoading"></loader>
    <!-- const app = createApp(App); app.use(router); 在App组件内通过router-view嵌入切换的路由 -->
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
// static
import 'bootstrap/dist/css/bootstrap.min.css'
// vuex
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
// components
import GlobalHeader from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
//utils
import createMessage from './components/createMessage'
import axios from 'axios'

// defineComponent是为了支持ts vue3直接这么写composition api就行
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  // 组件在js层级就是类的实例化：new Vue()；setup执行时机在所有生命周期之前，此时data method都没初始化好。
  // this也不指向当前的实例，因为初始化未完成，用了this也没什么用，所以不要和选项式api混用。
  setup() {
    // 在setup中使用数仓
    const store = useStore<GlobalDataProps>()
    // store中的数据是不能直接在setup中使用的 console出来可以看到state是灰色不可使用状态
    // v3中允许用computed这样的方式简便使用了
    const currentUser = computed(() => store.state.user)
    // loading error状态设计在根组件展示，由store内的state控制。
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    // ref()和computed()返回的都是包装对象（value reference）。它只有一个属性.value
    // 包装对象的意义在于可以在函数之间以引用的方式传递任意类型值的容器 有点像react的useRef
    // 不同的是vue的包装对象同时还是响应式的数据源。有了这样的容器，我们就可以在封装了逻辑的组合函数中将状态以引用的方式传回给组件。组件负责展示（追踪依赖），组合函数负责管理状态（触发更新）
    // 包装对象也可以包装非原始值类型的对象，如数组等
    // 如果依然像创建一个没有包装的响应式对象。可以使用reactive API（和2.x的Vue.observable()等同）
    // 注意到在使用时虽然包装对象取它的值应该用.value访问，但是我们可以在模版中省略.value，它会自动展开。
    // 当包装对象被暴露给模版渲染上下文，或者被嵌套在另一个响应式对象中时，它会被自动展开成它内部的值。当一个包装对象被作为另一个响应式对象的属性引用的时候也会被自动展开 详见尤的知乎RFC。

    // 侦听属性 侦听error.value.status 如果发生改变则运行处理函数
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        // 请求返回错误时弹出错误信息
        createMessage(message, 'error')
      }
    })
    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>

<style>

</style>
