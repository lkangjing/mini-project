import { request } from '../utils/http'

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

export function getLatest(sCallback) {
  request({
    url: 'classic/latest',
    success: (res) => {
      sCallback(res)
    },
  })
}
