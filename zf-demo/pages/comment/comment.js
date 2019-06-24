// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars:0,
    imgURL:"",
    userInput:""
  },
  onInput(e){
    let word = e.detail.value;
    if(word){
      this.setData({
        userInput: word
      })
    }
  },
  onSubmit(){
    if(this.data.userInput==""){
      wx.showModal({
        title: '提示',
        content: '请输入评论~~~',
      })
    }else{
      let info={
        stars: this.data.satrs,
        imgURL: this.data.imgURL,
        userInput: this.data.userInput,
      }
      //提交到后台处理
    }
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onTap(e){
    this.setData({
      stars:e.target.dataset.index
    })
  },
  chooseImg(){
    wx.chooseImage({
      success: (res)=> {
        let tempFilePath=res.tempFilePaths[0];
        this.setData({
          imgURL:tempFilePath
        })
      },
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