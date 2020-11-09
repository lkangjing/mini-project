// pages/classic.js
import {
  like,
  getLatest,
  getClassic,
  getClassicLikeStatus,
} from '../../models/api'
import { isFirst, isLatest } from '../../utils/util'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    latestIndex: '',
    likeCount: 0,
    likeStatus: '',
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
        latestIndex: res.index,
        likeCount: res.fav_nums,
        likeStatus: res.like_status,
      })
    })
  },
  onLike(e) {
    console.log(e)
    let behavior = e.detail.behavior
    like(behavior, this.data.classic.id, this.data.classic.type)
  },
  //点击上一期
  onPrevious() {
    this.updateClassic('previous')
  },
  //下一起
  onNext() {
    this.updateClassic('next')
  },
  //更新当前数据
  updateClassic(nextOrPrev) {
    let index = this.data.classic.index
    getClassic(index, nextOrPrev, (res) => {
      this.getLikeStatus(res.id, res.type)
      let first = isFirst(res.index)
      let latest = isLatest(res.index, this.data.latestIndex)
      this.setData({
        classic: res,
        first,
        latest,
      })
    })
  },
  getLikeStatus(artID, category) {
    getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums,
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
