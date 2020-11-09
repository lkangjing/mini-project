// pages/classic.js
import { like, getLatest ,getPrevious,getNext} from '../../models/api'
import {isFirst,isLatest} from '../../utils/util'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    latestIndex:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getLatest((res) => {
      console.log(res)
      this.setData({
        //latest 
        classic: res,
        latestIndex:res.index
      })
    })
  },
  onLike(e) {
    console.log(e)
    let behavior = e.detail.behavior
    like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onPrevious(){
    let index = this.data.classic.index
    getPrevious(index,(res) => {
      let first = isFirst(res.index)
      let latest= isLatest(res.index,this.data.latestIndex)
      this.setData({
        classic:res,
        first,
        latest
      })
    })
  },
  onNext(){
    let index = this.data.classic.index
    getNext(index,(res) => {
      let first = isFirst(res.index)
      let latest= isLatest(res.index,this.data.latestIndex)
      this.setData({
        classic:res,
        first,
        latest
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
