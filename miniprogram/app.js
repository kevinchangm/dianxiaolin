App({
  globalData: {
    userInfo: null,
    location: null
  },
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })

    // 获取位置信息
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.globalData.location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
      }
    })
  }
}) 