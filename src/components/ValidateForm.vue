<!--
 * @Author: 王荣
 * @Date: 2020-10-15 11:23:59
 * @LastEditors: 王荣
 * @LastEditTime: 2022-06-10 10:08:07
 * @Description: 填写简介
-->
<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean

// vue2x使用eventBus进行组件通信，而vue3推荐使用mitt
// 足够小，200B，不依赖vue实例可以跨框架使用。
export const emitter = mitt()
export default defineComponent({
  emits: ['form-submit'],
  setup(props, context) {
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func)
      }
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>
