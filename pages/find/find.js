const app = getApp()
var that
var API = require('../../utils/api.js')

Page({
  data: {
    categoriesList: [],
    cover_image_width: wx.getSystemInfoSync().windowWidth / 2 - 15, //coever宽度
    text_view_width: wx.getSystemInfoSync().windowWidth / 2 - 15 //文字的view宽度
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

        for (var index in res.data) {
          that.setData({

            ['categoriesList[' + index + '].bgPicture']: res.data[index].bgPicture,

            ['categoriesList[' + index + '].name']: '#' + res.data[index].name,

            ['categoriesList[' + index + '].id']: '#' + res.data[index].id,
          })
        }

      }
    })
  },
  goVideoList: function(data) {
    var datas = data.currentTarget.dataset;
    console.log(datas);
    wx.navigateTo({
      url: '../categoryVideos/category_videos?id=' + datas.category_id + '&name=' + datas.category_name
    })
  },
})