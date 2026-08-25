// pages/backend/management.js
const app = getApp();
Page({
        data: {
          inputText: '',
          list: [],
          timeList:['x月x日上午/下午'],//这个是招募人员的时间段，字符串形式
          inputValue:''
        },

        onLoad() {
            this.loadData()
            const list = app.globalData.list
            this.setData({ list })
        },
          
        onShow() {
            this.loadData()
            this.refreshList()
        },
          
        loadData() {
            this.setData({
                timeList:app.globalData.timeList
            })
        },
      
        onInput(e) {
          this.setData({
            inputText: e.detail.value
          });
        },
      
        goToTabBarWithData() {
            app.setGlobaldata('announcement',this.data.inputText)
            wx.showToast({
              title: '公告设置完成',
            })
        },

        onInputTime(e){
            this.setData({
                inputValue:e.detail.value
            })
        },

        addTag() {
            let value = this.data.inputValue
            if (!value) {
              wx.showToast({ title: '请输入内容', icon: 'none' })
              return
            }
            let newlist = [...this.data.timeList, value]
            this.setData({
                timeList: newlist,
            })
            app.setGlobaldata('timeList',this.data.timeList)
              console.log(this.data.timeList)
        },

        removeTag(e) {
            const index = e.currentTarget.dataset.index
            const newlist = [...this.data.timeList]
            newlist.splice(index, 1)
            this.setData({ timeList:newlist })
            app.setGlobaldata('timeList',this.data.timeList)
        },
          
        // 刷新列表数据
        refreshList() {
            this.setData({
              list: app.globalData.formList
            })
        },
          
        clearAll() {
            wx.showModal({
              title: '确认清空',
              content: '确定要删除所有数据吗？',
              success: (res) => {
                if (res.confirm) {
                  app.globalData.formList = []
                  wx.setStorageSync('formList', [])
                  this.loadData()
                  wx.showToast({ title: '已清空', icon: 'success' })
                }
              }
            })
        },

        onSelectOpen(){
            wx.navigateTo({
              url: '/pages/backend/openstate',
            })
        }
})
