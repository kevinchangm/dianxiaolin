Page({
  data: {
    title: '',
    description: '',
    location: '',
    images: [],
    contact: '',
    price: ''
  },

  onLoad: function () {
    // 获取位置信息
    const app = getApp()
    if (app.globalData.location) {
      this.getLocationName(app.globalData.location)
    }
  },

  getLocationName: function (location) {
    // 这里应该调用地图API获取地址名称
    // 示例数据
    this.setData({
      location: '北京市朝阳区'
    })
  },

  onTitleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },

  onDescriptionInput: function (e) {
    this.setData({
      description: e.detail.value
    })
  },

  onLocationInput: function (e) {
    this.setData({
      location: e.detail.value
    })
  },

  onContactInput: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },

  onPriceInput: function (e) {
    this.setData({
      price: e.detail.value
    })
  },

  chooseImage: function () {
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          images: [...this.data.images, ...res.tempFilePaths]
        })
      }
    })
  },

  removeImage: function (e) {
    const index = e.currentTarget.dataset.index
    const images = this.data.images
    images.splice(index, 1)
    this.setData({
      images: images
    })
  },

  submitForm: function () {
    if (!this.data.title) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
      return
    }

    if (!this.data.description) {
      wx.showToast({
        title: '请输入描述',
        icon: 'none'
      })
      return
    }

    if (!this.data.location) {
      wx.showToast({
        title: '请输入位置',
        icon: 'none'
      })
      return
    }

    if (!this.data.contact) {
      wx.showToast({
        title: '请输入联系方式',
        icon: 'none'
      })
      return
    }

    // 这里应该调用后端API上传数据
    wx.showLoading({
      title: '发布中...'
    })

    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 2000)
        }
      })
    }, 1500)
  }
}) 