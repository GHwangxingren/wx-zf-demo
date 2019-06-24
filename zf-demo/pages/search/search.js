// pages/search/search.js
import {
  HTTP
} from "../../utils/http-promise.js"
let http = new HTTP()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotSearch: [],
    historySearch: wx.getStorageSync('historySearch') || [],
    lesson:[],
    showLesson:false,
    keyword:"",
    noData:false,
    noMore: false,
    timer:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHotSearch()
  },
  getHotSearch() {
    http.request({
      url: '/hot_lesson'
    }).then(data => {
      this.setData({
        hotSearch: data
      })
    })
  },
  onConfirm(e) {
    let keyword = e.detail.value || e.currentTarget.dataset.word;
    if (keyword) {
      this.addHistorySearch(keyword);
      this.searchByKeyword(keyword);
      this.setData({
        keyword: keyword
      })
    }
  },
  searchByKeyword(value){
    this.locked();
    let start=this.data.lesson.length;
    http.request({ url: `/query?q=${value}&start=${start}&size=6`}).then(data=>{
      setTimeout(()=>{
        this.setLesson(data)
        this.unLocked()
      },1000)
    },()=>{
      this.unLocked()
    })
  },
  setLesson(data){
    this.data.total = data.total;
    if(data.total==0){
      this.setData({
        showLesson: true,
        noData:true,
        noMore:false
      })
    }else{
      let lesson=this.data.lesson.concat(data.lesson);
      this.setData({
        lesson: lesson,
        showLesson: true
      })
    }
  },
  onClear(){
    this.init()
  },
  init(){
    this.setData({
      lesson: [],
      showLesson: false,
      keyword: "",
      noData: false
    })
  },
  addHistorySearch(keyword) {
    let historySearch = wx.getStorageSync("historySearch") || [];
    if (historySearch.includes(keyword)) {
      return
    }
    if (historySearch.length >= 10) {
      historySearch.pop()
    }
    historySearch.unshift(keyword);
    wx.setStorage({
      key: 'historySearch',
      data: historySearch,
      success: () => {
        this.setData({
          historySearch: historySearch
        })
      }
    })
  },
  clearHistory() {
    wx.removeStorageSync("historySearch")
    this.setData({
      historySearch: []
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onMyEvent(e) {
    let detail = e.detail
    wx.navigateTo({
      url: `/pages/detail/detail?id=${detail.id}&title=${encodeURIComponent(detail.title)}`,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.init()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if(this.isLoading()){
      return
    }
    if(this.hasMore()){
      let keyword = this.data.keyword;
      this.searchByKeyword(keyword)
    }else{
      this.setData({
        noMore:true
      })
    }
  },
  hasMore(){
    return this.data.lesson.length>=this.data.total?false:true;
  },
  isLoading(){
    return this.data.loading?true:false;
  },
  locked(){
    wx.showLoading({
      title: '正在加载中···',
    });
    wx.showNavigationBarLoading()
    this.setData({
      loading:true
    })
  },
  unLocked(){
    wx.hideLoading();
    wx.hideNavigationBarLoading()
    this.setData({
      loading: false
    })
  },
  goBack(){
    wx.navigateBack()
  },
  onInput(e){
    clearTimeout(this.data.timer)
    this.data.timer=setTimeout(()=>{
      console.log(1)
    },500)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})