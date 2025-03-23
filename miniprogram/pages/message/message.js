Page({
  data: {
    messages: [],
    loading: true
  },

  onLoad: function () {
    this.loadMessages()
  },

  onPullDownRefresh: function () {
    this.loadMessages()
  },

  loadMessages: function () {
    // 这里应该调用后端API获取消息列表
    // 示例数据
    const mockData = {
      messages: [
        {
          id: 1,
          type: 'system',
          title: '系统通知',
          content: '您的拼店信息已发布成功',
          time: '2024-03-20 10:30',
          isRead: false
        },
        {
          id: 2,
          type: 'contact',
          title: '新的联系请求',
          content: '用户"张三"对您的拼店信息感兴趣',
          time: '2024-03-19 15:20',
          isRead: true
        }
      ]
    }

    setTimeout(() => {
      this.setData({
        messages: mockData.messages,
        loading: false
      })
      wx.stopPullDownRefresh()
    }, 1000)
  },

  markAsRead: function (e) {
    const id = e.currentTarget.dataset.id
    const messages = this.data.messages.map(msg => {
      if (msg.id === id) {
        return { ...msg, isRead: true }
      }
      return msg
    })
    this.setData({ messages })
  },

  deleteMessage: function (e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条消息吗？',
      success: (res) => {
        if (res.confirm) {
          const messages = this.data.messages.filter(msg => msg.id !== id)
          this.setData({ messages })
        }
      }
    })
  }
}) 