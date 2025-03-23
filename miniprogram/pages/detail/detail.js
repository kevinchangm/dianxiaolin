Page({
  data: {
    post: null,
    markers: [],
    isCollected: false
  },

  onLoad: function(options) {
    // 获取传递过来的拼店信息ID
    const postId = options.id;
    
    // 模拟获取拼店信息数据
    // 实际项目中，这里应该调用后端API获取数据
    this.getPostDetail(postId);
  },

  // 获取拼店信息详情
  getPostDetail: function(postId) {
    // 模拟数据，实际项目中应该从服务器获取
    const mockPost = {
      id: postId,
      title: '旺铺招租，适合餐饮、零售',
      price: 5000,
      tags: ['临街', '人流量大', '精装修'],
      images: [
        '/images/shop1.jpg',
        '/images/shop2.jpg',
        '/images/shop3.jpg'
      ],
      address: '广州市天河区天河路123号',
      distance: 0.5,
      latitude: 23.123456,
      longitude: 113.123456,
      area: 100,
      floor: '1层',
      decoration: '精装修',
      suitable: '餐饮、零售',
      description: '本店铺位于天河区核心商圈，周边有多个大型商场和写字楼，人流量大。店铺面积100平方米，层高4米，精装修，适合经营餐饮或零售。',
      contact: {
        name: '张先生',
        phone: '13800138000',
        wechat: 'wxid_123456'
      }
    };

    // 设置地图标记
    const markers = [{
      id: 0,
      latitude: mockPost.latitude,
      longitude: mockPost.longitude,
      title: mockPost.address
    }];

    this.setData({
      post: mockPost,
      markers: markers
    });
  },

  // 拨打电话
  makePhoneCall: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.post.contact.phone,
      fail: function() {
        wx.showToast({
          title: '拨打电话失败',
          icon: 'none'
        });
      }
    });
  },

  // 复制微信号
  copyWechat: function() {
    wx.setClipboardData({
      data: this.data.post.contact.wechat,
      success: function() {
        wx.showToast({
          title: '微信号已复制',
          icon: 'success'
        });
      }
    });
  },

  // 收藏/取消收藏
  toggleCollect: function() {
    const isCollected = !this.data.isCollected;
    this.setData({ isCollected });
    
    wx.showToast({
      title: isCollected ? '收藏成功' : '已取消收藏',
      icon: 'success'
    });
  },

  // 分享
  share: function() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  // 立即联系
  contact: function() {
    wx.showActionSheet({
      itemList: ['拨打电话', '复制微信号'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.makePhoneCall();
        } else if (res.tapIndex === 1) {
          this.copyWechat();
        }
      }
    });
  },

  // 分享给朋友
  onShareAppMessage: function() {
    return {
      title: this.data.post.title,
      path: '/pages/detail/detail?id=' + this.data.post.id,
      imageUrl: this.data.post.images[0]
    };
  },

  // 分享到朋友圈
  onShareTimeline: function() {
    return {
      title: this.data.post.title,
      query: 'id=' + this.data.post.id,
      imageUrl: this.data.post.images[0]
    };
  }
}); 