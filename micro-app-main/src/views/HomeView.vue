<script lang="ts" setup>
import { ref } from 'vue'
let cur = ref(0)
const list = ['http://localhost:3000/dialog', 'http://localhost:3000/']
</script>

<template>
  <div>
    <el-button @click="cur = 0">dialog</el-button>
    <el-button @click="cur = 1">map</el-button>
    <micro-app name="vue3" :url="list[cur]" iframe></micro-app>
  </div>
</template>

<style lang="scss" scoped></style>
