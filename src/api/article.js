import request from '@/utils/request'

export const artGetChannelService = () => request.get('/my/cate/list')

export const artAddChannelService = (data) => request.post('/my/cate/add', data)

export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)

export const artDeleteChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: {
      id
    }
  })

export const artGetManageService = (params) => {
  return request.get('/my/article/list', { params })
}

export const artAddManageService = (data) => {
  return request.post('/my/article/add', data)
}

export const artGetManageInfoService = (id) => {
  return request.get('/my/article/info', { params: { id } })
}

export const artEditManageService = (data) => {
  return request.put('/my/article/info', data)
}

export const artDeleteManageService = (id) => {
  return request.delete('/my/article/info', { params: { id } })
}
