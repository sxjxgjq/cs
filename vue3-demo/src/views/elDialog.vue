<template>
  <el-button plain @click="open"> Click to open the Dialog </el-button>

  <el-dialog v-model="dialogVisible" title="Tips" width="500" close-on-click-modal>
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)

const open = () => {
  dialogVisible.value = true
}
</script>
