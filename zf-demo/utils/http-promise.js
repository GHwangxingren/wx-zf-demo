import {
  base_url
} from './config.js';
class HTTP {
  request({url, data = {}, header = {}, method = 'GET', success = () => {}, fail = () => {}}) {
    return new Promise((resolve,reject)=>{
      this._request(url, data, header, method, resolve, reject)
    })
  };
  _request(url, data, header, method, resolve, reject) {
    wx.request({
      url: base_url + url,
      data: data,
      header: header,
      method: method,
      success: function(res) {
        const data = res.data;
        if (data.status != undefined && data.status == "ok") {
          // success(data.data)
          resolve(data.data)
        } else {
          reject()
          wx.showModal({
            title: '错误信息',
            content: '错误信息',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: function(err) {
        reject()
        wx.showToast({
          title: '接口出错了',
          icon: 'none',
          duration: '30000'
        })
      },
    })
  }
}
export {HTTP}