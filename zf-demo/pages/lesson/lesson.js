// pages/lesson/lesson.js
import {HTTP} from "../../utils/http-promise.js"
let http=new HTTP()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllLesson()
  },
  getAllLesson(){
    http.request({
      url:"/allLesson"
    }).then(data=>{
      this.setData({
        lesson:data
      })
    })
  },
  onMyEvent(e) {
    let detail = e.detail
    wx.navigateTo({
      url: `/pages/detail/detail?id=${detail.id}&title=${encodeURIComponent(detail.title)}`,
    })
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