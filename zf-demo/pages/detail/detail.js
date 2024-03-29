// pages/detail/detail.js
import {HTTP} from "../../utils/http-promise.js"
let http=new HTTP()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    showModalStatus: true,
    animationData: {},
    others:[{
      id:1,
      name:"JS基础",
      price:100,
      date:1549814400000
    }, {
        id: 2,
        name: "CSS基础",
        price: 50,
        date: 1549814400000
      },{
        id: 3,
        name: "VUE",
        price: 200,
        date: 1549814400000
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const title=decodeURIComponent(options.title);
    this.setTitle(title)
    this.getDetail(options.id)
  },
  setTitle(title){
    wx.setNavigationBarTitle({
      title:title
    })
  },
  getDetail(id){
    http.request({
      url:"/detail?id="+id
    }).then(data=>{
      this.setData({
        detail:data
      })
    })
  },
  phoneCall(){
    wx.makePhoneCall({
      phoneNumber: '15993766206',
    })
  },
  showModal(){
    const animation=wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      animationData: animation.export(),
      showModalStatus:false
    });
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 100)
  },
  hideModal(){
    this.animation.translateY(300).step()
    this.setData({
      animationData:this. animation.export(),
    })
    setTimeout(function () {
      this.animation.translateY(0).step()
      this.setData({
        animationData: this.animation.export(),
        showModalStatus: true
      })
    }.bind(this), 1000)
  },
  toComment(){
    wx.navigateTo({
      url: '/pages/comment/comment',
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
    return {
      title:"杏仁"
    }
  }
})