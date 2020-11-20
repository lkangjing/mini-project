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

const postComments = (bid,comment) => {
  return request({
    url:`book/add/short_comment`,
    method:'POST',
    data:{
      book_id:bid,
      content:comment
    }
  })
}

//获取热门词汇
const getHotWords = ()=>{
  return request({
    url: 'book/hot_keyword'
  })
}

const search = (start,q)=>{
  console.log("q",q);
  return request({
    url: 'book/search?summary=1',
    data:{
      q,start
    }
  })
}

export {search,getHotList,getMyBookCount,getDetail,getLikeStatus,getComments,postComments,getHotWords}