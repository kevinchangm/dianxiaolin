Page({
  data: {
    userInfo: null,
    myPosts: [],
    loading: true
  },

  onLoad: function () {
    const app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.loadMyPosts()
  },

  onPullDownRefresh: function () {
    this.loadMyPosts()
  },

  loadMyPosts: function () {
    // 这里应该调用后端API获取用户发布的帖子
    // 示例数据
    const mockData = {
      posts: [
        {
          id: 1,
          title: '寻找咖啡店合伙人',
          status: 'active',
          createTime: '2024-03-20'
        },
        {
          id: 2,
          title: '奶茶店转让',
          status: 'completed',
          createTime: '2024-03-19'
        }
      ]
    }

    setTimeout(() => {
      this.setData({
        myPosts: mockData.posts,
        loading: false
      })
      wx.stopPullDownRefresh()
    }, 1000)
  },

  getUserProfile: function () {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  },

  navigateToPost: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  navigateToSettings: function () {
    wx.navigateTo({
      url: '/pages/settings/settings'
    })
  }
}) 