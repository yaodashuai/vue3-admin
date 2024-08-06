<script setup>
import { ref } from 'vue'
import { artAddChannelService, artEditChannelService } from '@/api/article'
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}
defineExpose({
  open
})
const emit = defineEmits(['success'])

const submit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id ? true : false
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="添加弹层" width="30%">
    <el-form
      :model="formModel"
      :rules="rules"
      style="padding-right: 30px"
      label-width="100px"
      ref="formRef"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
