<script setup>
import { ref } from 'vue'
import ChannelSelect from './component/ChannelSelect.vue'
import { artGetManageService, artDeleteManageService } from '@/api/article'
import { format } from '@/utils/format'
import ManageEdit from './component/ManageEdit.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
const manageList = ref([])
const total = ref(0)
const loading = ref(false)
const manageEditRef = ref()
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const getManage = async () => {
  loading.value = true
  const res = await artGetManageService(params.value)
  manageList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}

getManage()

const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getManage()
}

const onCurrentChange = (page) => {
  params.value.pagenum = page
  getManage()
}

const search = () => {
  params.value.pagenum = 1
  getManage()
}

// 添加文章
const onSuccess = (type) => {
  if (type === 'add') {
    params.value.pagenum = Math.ceil((total.value + 1) / params.value.pagesize)
  }
  getManage()
}

const reset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getManage()
}

const onEditChannel = (row) => {
  manageEditRef.value.open(row)
  console.log(row)
}

const onDeleteChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDeleteManageService(row.id)
  ElMessage.success('删除成功')
  getManage()
}

const addManage = () => {
  manageEditRef.value.open({})
}
</script>
<template>
  <page-container title="文章列表">
    <template #extra>
      <el-button type="primary" @click="addManage"> 添加文章 </el-button>
    </template>
    <el-form inline>
      <el-form-item label="分类名称">
        <channel-select
          v-model="params.cate_id"
          style="width: 200px"
        ></channel-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select style="width: 200px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表 -->

    <el-table :data="manageList" v-loading="loading">
      <el-table-column label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ format(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="发表状态" prop="state"></el-table-column>
      <el-table-column label="操作">
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
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 抽屉 -->
    <manage-edit ref="manageEditRef" @success="onSuccess"></manage-edit>
  </page-container>
</template>
