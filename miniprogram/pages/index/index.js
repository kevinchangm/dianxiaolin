Page({
  data: {
    posts: [],
    loading: true,
    page: 1,
    hasMore: true
  },

  onLoad: function () {
    this.loadPosts()
  },

  onPullDownRefresh: function () {
    this.setData({
      posts: [],
      page: 1,
      hasMore: true
    })
    this.loadPosts()
  },

  onReachBottom: function () {
    if (this.data.hasMore) {
      this.loadPosts()
    }
  },

  loadPosts: function () {
    const that = this
    wx.showLoading({
      title: '加载中...'
    })

    // 这里应该调用后端API获取数据
    // 示例数据
    const mockData = {
      posts: [
        {
          id: 1,
          title: '寻找咖啡店合伙人',
          description: '位于市中心的咖啡店寻找合伙人，面积100平米，租金8000/月',
          location: '北京市朝阳区',
          images: ['/images/sample1.jpg'],
          createTime: '2024-03-20'
        },
        {
          id: 2,
          title: '奶茶店转让',
          description: '经营中的奶茶店转让，设备齐全，客源稳定',
          location: '北京市海淀区',
          images: ['/images/sample2.jpg'],
          createTime: '2024-03-19'
        }
      ]
    }

    setTimeout(() => {
      that.setData({
        posts: [...that.data.posts, ...mockData.posts],
        page: that.data.page + 1,
        loading: false
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    }, 1000)
  },

  navigateToDetail: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }
}) 