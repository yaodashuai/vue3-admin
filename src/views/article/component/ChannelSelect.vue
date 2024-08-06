<script setup>
import { artGetChannelService } from '@/api/article'
import { ref } from 'vue'
const channelList = ref([])

const getChannel = async () => {
  const res = await artGetChannelService()
  channelList.value = res.data.data
}
getChannel()
defineProps({
  cateId: {
    type: [Number, String],
    width: {
      type: String
    }
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    style="{ width }"
  >
    <el-option
      v-for="item in channelList"
      :label="item.cate_name"
      :value="item.id"
      :key="item.id"
      >{{ item.cate_name }}</el-option
    >
  </el-select>
</template>
