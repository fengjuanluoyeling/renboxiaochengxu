// pages/backend/login.js
Page({
    data: {
      account: '',
      password: '',
      errorMsg: ''
    },
  
    // 监听账号输入
    onAccountInput(e) {
      this.setData({
        account: e.detail.value,
        errorMsg: '' // 清空错误提示
      })
    },
  
    // 监听密码输入
    onPasswordInput(e) {
      this.setData({
        password: e.detail.value,
        errorMsg: ''
      })
    },
  
    // 登录验证
    handleLogin() {
      const { account, password } = this.data
      
      // 验证账号是否为空
      if (!account.trim()) {
        this.setData({
          errorMsg: '请输入账号'
        })
        return
      }
      
      // 验证密码是否为空
      if (!password) {
        this.setData({
          errorMsg: '请输入密码'
        })
        return
      }
      
      // 验证密码长度
      if (password.length < 6) {
        this.setData({
          errorMsg: '密码长度不能少于6位'
        })
        return
      }
      
      // 模拟验证（实际应该请求后端接口）
      if (account === 'zdyjh' && password === 'rtbwggl') {
        // 登录成功
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        
        // 保存登录状态
        wx.setStorageSync('isLogin', true)
        wx.setStorageSync('userInfo', { account })
        
        // 跳转到首页
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/backend/management',
          })
        }, 1000)
      } else {
        // 登录失败
        this.setData({
          errorMsg: '账号或密码错误'
        })
      }
    }
})
