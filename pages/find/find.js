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
       
        for (var index in res.data) {
          if (index < size) {
            that.setData({

              ['categoriesList[' + index + '].bgPicture_l']: res.data[index * 2].bgPicture,
              ['categoriesList[' + index + '].bgPicture_r']: res.data[(index * 2) + 1].bgPicture,

              ['categoriesList[' + index + '].name_l']: '#' + res.data[index * 2].name,
              ['categoriesList[' + index + '].name_r']: '#' + res.data[(index * 2) + 1].name,


              ['categoriesList[' + index + '].id_l']: '#' + res.data[index * 2].id,
              ['categoriesList[' + index + '].id_r']: '#' + res.data[(index * 2) + 1].id,
            })
          }

        }
      }
    })
  },
  goVideoList: function (data) {
    var datas = data.currentTarget.dataset;
    console.log(datas);
    wx.navigateTo({
      url: '../categoryVideos/category_videos?id=' + datas.category_id + '&name=' + datas.category_name
    })
  },
})