const app = getApp()
var that
var API = require('../../utils/api.js')

Page({
  data: {
    categoriesList: []
  },
  onLoad: function() {
    that = this

    that.getCateGories();


  },
  getCateGories: function() {
    wx.request({

      url: API.CATEGORIES_ACTION(),
      method: 'GET',
      success: function(res) {
        console.log(res.data)
        var size = res.data.length / 2
        console.log('size:' + size)
        for (var index in res.data) {
          if (index < size) {
            that.setData({

              ['categoriesList[' + index + '].bgPicture_l']: res.data[index * 2].bgPicture,
              ['categoriesList[' + index + '].bgPicture_r']: res.data[(index * 2) + 1].bgPicture,

              ['categoriesList[' + index + '].name_l']: '#' + res.data[index * 2].name,
              ['categoriesList[' + index + '].name_r']: '#' + res.data[(index * 2) + 1].name,

            })
          }

        }
      }
    })
  }
})