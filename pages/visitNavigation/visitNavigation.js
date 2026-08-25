// pages/visitNavigation/visitNavigation.js
Page({
  copyNavigationKeyword() {
    wx.setClipboardData({
      data: '浙江大学医学院',
      success() {
        wx.showToast({
          title: '已复制导航关键词',
          icon: 'none'
        })
      }
    })
  }
})
