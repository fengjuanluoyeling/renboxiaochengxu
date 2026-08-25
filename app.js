// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  //全局数据
  globalData: {
    userInfo: null,
    annocement:'无',//首页的公告栏
    formList: [],//值班员、讲解员报名信息
    timeList:['x月x日周几上午/下午'],//人博馆招募人员的时间段，字符串形式
    openState:[
        ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年一月31天
        ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年二月29天（28或29）
        ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年三月31天
        ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年四月30天
        ['open','open','open','open','open','Unknown','Unknown','Unknown','open','open','Unknown','Unknown','Unknown','Unknown','Unknown','open','open','Unknown','Unknown','Unknown','Unknown','Unknown','open','open','Unknown','Unknown','Unknown','Unknown','Unknown','open','open'],//次年五月31天
        ['Unknown','Unknown','Unknown','Unknown','Unknown','open','open','Unknown','Unknown','Unknown','Unknown','Unknown','open','open','Unknown','Unknown','Unknown','Unknown','Unknown','open','open','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年六月30天
        ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年七月31天
        ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//八月31天
        ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//九月30天
        ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//十月31天
        ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//十一月30天
        ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//十二月31天
        
    ],//从八月初到次年七月底的开放状态，一个长长的二维数组
    year:2025,//与开放状态共同使用的数据，是xx-xx+1学年
    openStateData: {},
  },

  setGlobaldata(key, value) {
    this.globalData[key] = value;
    console.log(this.globalData.timeList)
  },

  getGlobaldata(key) {
    return this.globalData[key];
  },

  addForm(data) {
    const newData = {
      id: Date.now(),
      ...data,
      time: new Date().toLocaleString()
    }
    this.globalData.formList.unshift(newData)
    wx.setStorageSync('formList', this.globalData.formList)
  },

  getOpenStateCopy() {
    return JSON.parse(JSON.stringify(this.globalData.openState));
  },//在index页面使用，用于获取openState

  setDateStatus(statusArray) {
    this.globalData.dateStatus = statusArray;
    this.globalData.lastUpdateTime = new Date().toISOString();
  },

})
