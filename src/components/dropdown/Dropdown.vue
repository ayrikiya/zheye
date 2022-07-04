<!--
 * @Author: 王荣
 * @Date: 2020-10-15 11:23:59
 * @LastEditors: 王荣
 * @LastEditTime: 2022-06-17 17:50:32
 * @Description: 填写简介
-->
<template>
<div class="dropdown" ref="dropdownRef">
  <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
    {{title}}
  </a>
  <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
    <!-- vue的slot：插槽 其实就是react中的render props: {this.props.children} -->
    <slot></slot>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../../hooks/useClickOutside'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const isClickOutside = useClickOutside(dropdownRef)

    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
