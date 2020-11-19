// pages/book-detail/index.js
import {getDetail,getLikeStatus,getComments,postComments} from '../../models/book'
import {like} from '../../models/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    book:null,
    likeStatus:false,
    likeCount:0,
    posting:false
  },
  onLike(event){
    const status = event.detail.behavior
    like(status,this.data.book.id,400)
  },
  onFakePost(){
    this.setData({
      posting:true
    })
  },
  onCancel(){
    this.setData({
      posting:false
    })
  },
  onPost(event){
    const comment = event.detail.text || event.detail.value
    if (!comment) {
      return
    }
    if (comment.length>12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    postComments(this.data.book.id,comment).then(res=>{
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
      this.data.comments.unshift({
        content:comment,
        nums:1
      })
      this.setData({
        comments:this.data.comments,
        posting:false
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    const bid = options.bid
    const detail = getDetail(bid)
    const likeStatus = getLikeStatus(bid)
    const comments = getComments(bid)

    Promise.all([detail,likeStatus,comments]).then(res=>{
      console.log(res);
      this.setData({
        book:res[0],
        comments:res[2].comments,
        likeStatus:res[1].like_status,
        likeCount:res[1].fav_nums
      })
      wx.hideLoading();
    })

    // detail.then((res) => {
    //   console.log(res);
    //   this.setData({
    //     book:res
    //   })
    // })
    // likeStatus.then((res) => {
    //   console.log(res);
    //   this.setData({
    //     likeStatus:res.like_status,
    //     likeCount:res.fav_nums
    //   })
    // })
    // comments.then((res) => {
    //   console.log(res.comments);
    //   this.setData({
    //     comments:res.comments
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})