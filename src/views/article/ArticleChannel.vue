<script setup>
import { artGetChannelService, artDeleteChannelService } from '@/api/article'
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelEdit from './component/ChannelEdit.vue'
const channelList = ref([])
const loading = ref(false)
const channelEdit = ref()
const getList = async () => {
  loading.value = true
  const res = await artGetChannelService()
  loading.value = false
  channelList.value = res.data.data
}
getList()
const onEditChannel = (row) => {
  console.log(row)
  channelEdit.value.open(row)
}

const onDeleteChannel = async (row) => {
  console.log(row)
  await ElMessageBox.confirm('你确定要删除吗', '问题提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDeleteChannelService(row.id)
  ElMessage.success('删除成功')
  getList()
}

const addChannel = () => {
  channelEdit.value.open({})
}

const onSuccess = () => {
  getList()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="addChannel">添加分类</el-button>
    </template>

    <el-table :data="channelList" v-loading="loading" style="width: 100%">
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #empty>
      <el-empty description="没有数据" />
    </template>
    <channel-edit ref="channelEdit" @success="onSuccess"></channel-edit>
  </page-container>
</template>
