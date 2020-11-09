import { request } from '../utils/http'
import { getKey } from '../utils/util'
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
//获取红心状态
export function getClassicLikeStatus(artID, category, sCallback) {
  request({
    url: 'classic/' + category + '/' + artID + '/favor',
    success: sCallback,
  })
}
//获取最后一期
export function getLatest(sCallback) {
  request({
    url: 'classic/latest',
    success: (res) => {
      wx.setStorageSync(getKey(res.index), res)
      sCallback(res)
    },
  })
}
//获取当前期刊的上/下一期
export function getClassic(index, nextOrPrev, sCallback) {
  //缓存中寻找 ? API 写入到缓存
  //缓存的key
  let key = nextOrPrev === 'next' ? getKey(index + 1) : getKey(index - 1)
  let classic = wx.getStorageSync(key)
  if (!classic) {
    request({
      url: 'classic/' + index + '/' + nextOrPrev,
      success: (res) => {
        wx.setStorageSync(getKey(res.index), res)
        sCallback(res)
      },
    })
  } else {
    sCallback(classic)
  }
}
