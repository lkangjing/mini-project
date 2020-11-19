const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//是否是第一期
 const isFirst = (index)=>{
  return index === 1 ? true:false
}
//是否是最后一个
 const isLatest = (currentIndex,latestIndex) => {
  return currentIndex === latestIndex ? true :false
}

const getKey = (index) => {
  let key = 'classic-' + index
  return key
}

const getHistory = ()=>{
  const words = wx.getStorageSync('q')
  if (!words) {
    return []
  }
  return words
}

const getHot = ()=>{
  
}

const addToHistory = (keyword)=>{
  console.log(keyword);
  let words = getHistory()
  let has = words.includes(keyword)
  if (!has) {
    if (words.length>=10) {
      words.pop()
    }
    words.unshift(keyword)
    wx.setStorageSync('q',words)
  }
  
}

module.exports = {
  formatTime,isFirst,isLatest,getKey,addToHistory,getHot,getHistory
}
