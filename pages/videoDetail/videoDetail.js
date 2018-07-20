//首页
const app = getApp()
var that
var videoUrl
var videoId
var API = require('../../utils/api.js')

Page({
  data: {
    videoUrl:{},
    video_title:{},
    video_category:{},
    info_bg_cover:{},
    recommendList:[]
  },
 
  onLoad: function (options) {
    that = this
    that.data.videoUrl = wx.getStorageSync('videoUrl')
    var bgCover = wx.getStorageSync('bgBlurredCover')
  
    that.data.title = options.title
    that.data.category = '#'+options.category
    that.data.description = options.description
    that.data.info_bg_cover = bgCover
    videoId = options.videoId
    that.getRecommend()

   that.setData({
     'videoUrl': that.data.videoUrl,
     'video_title': that.data.title,
     'video_category': that.data.category,
     'video_description': that.data.description,
     'info_bg_cover': that.data.info_bg_cover
   })
  },
  getRecommend: function () {
    var requestRecommendUrl = API.RECOMMEND_VIDEO_ACTION()
    requestRecommendUrl = requestRecommendUrl.replace('[videoId]', videoId)

    wx.request({
     
      
      url: requestRecommendUrl,
      method: 'GET',
      success: function (res) {
        console.log(res.data)

        var conut = 0
        for (var index in res.data.itemList) {
          if (res.data.itemList[index].type =='videoSmallCard'){
            
            that.setData({

              ['recommendList[' + conut + ']']: res.data.itemList[index],

            })
            conut++
          }
        
        }
      }
    })
  }


})
