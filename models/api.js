import { request } from '../utils/http'
//喜欢,取消喜欢
export function like(behavior, artID, category) {
  let url = behavior == 'like' ? 'like' : 'like/cancel'
  request({
    url: url,
    method: 'POST',
    data: {
      art_id: artID,
      type: category,
    },
  })
}
//获取最后一期
export function getLatest(sCallback) {
  request({
    url: 'classic/latest',
    success: (res) => {
      sCallback(res)
    },
  })
}
//获取当前期刊的上一期
export function getPrevious(index,sCallback){
  request({
    url:'classic/' + index + '/previous',
    success: (res) => {
      sCallback(res)
    },
  })
}

//获取当前期刊的下一期
export function getNext(index,sCallback){
  request({
    url:'classic/' + index + '/next',
    success: (res) => {
      sCallback(res)
    },
  })
}


