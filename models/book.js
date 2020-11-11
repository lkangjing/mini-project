import { request } from '../utils/http-p'

const getHotList = () => {
  return request({
    url:'book/hot_list',
  })
}

const getMyBookCount = () => {
  return request({
    url:'book/favor/count',
  })
}

const getDetail = (bid) => {
  return request({
    url:`book/${bid}/detail`,
  })
}

const getLikeStatus = (bid) => {
  return request({
    url:`book/${bid}/favor`,
  })
}

const getComments = (bid) => {
  return request({
    url:`book/${bid}/short_comment`,
  })
}

export {getHotList,getMyBookCount,getDetail,getLikeStatus,getComments}