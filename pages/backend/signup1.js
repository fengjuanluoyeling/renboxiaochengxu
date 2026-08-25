const app = getApp()
Page({
  data: {
    // 所有表单数据，双向绑定会自动更新这些值
    career:'',
    name: '',
    phone: '',
    worktime: [],
    workTwice: '',
    key: '',
    note: '',
    timeList:['周六上午','周六下午','周日上午','周日下午']
  },
  
  onLoad (){
    this.timeListRefresh()
  },

  onWorktimeChange(e) {
    this.setData({
      worktime: e.detail.value
    });
  },

  //确认招募时间
  timeListRefresh(){
    this.setData({
        timeList:app.getGlobaldata('timeList')
    })
  },

  // 提交表单
  submitForm() {
    const {career, name, phone, worktime, workTwice, key, note } = this.data

    // 表单验证
    if (!name || !phone) {
      wx.showToast({ title: '请填写完整', icon: 'none' })
      return
    }  
    // 保存到全局
    app.addForm({career,name, phone, worktime, workTwice, key, note })
    
    wx.showToast({ title: '提交成功', icon: 'success' })
    
    //提交后自动重置
     this.resetForm()
  },
  
  // 重置表单
  resetForm() {
    this.setData({
        career:'',
        name: '',
        phone: '',
        worktime: [],
        workTwice: '',
        key: '',
        note: '',
    })
  }
})