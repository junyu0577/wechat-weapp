const app = getApp()
var that
var API = require('../../utils/api.js')
var id, name
Page({
  data: {
    categoriesList: [],
    navigationBarTitleText: {},
    videoList: []
  },
  onLoad: function(options) {
    that = this

    id = options.id
    name = options.name
    id = id.replace('#', '')
    name = name.replace('#', '')

    wx.setNavigationBarTitle({
      title: name
    })

    that.getVideoList()




  },
  getVideoList: function() {
    var reqUrl = API.CATEGORY_VIDEO_LIST_ACTION()
    reqUrl = reqUrl.replace('[id]', id)
    wx.request({

      url: reqUrl,
      method: 'GET',
      success: function(res) {
        console.log(res.data.itemList)


        for (var index in res.data.itemList) {

          that.setData({

            ['videoList[' + index + '].data.cover.feed']: res.data.itemList[index].data.cover.feed,
            ['videoList[' + index + '].data.title']: res.data.itemList[index].data.title,
            ['videoList[' + index + '].data.playUrl']: res.data.itemList[index].data.playUrl,
            ['videoList[' + index + '].data.category']: res.data.itemList[index].data.category,
            ['videoList[' + index + '].data.description']: res.data.itemList[index].data.description,
            ['videoList[' + index + '].data.cover.blurred']: res.data.itemList[index].data.cover.blurred,
            ['videoList[' + index + '].data.id']: res.data.itemList[index].data.id,


          })

        }


      }
    })
  },
  goViewDetail: function(data) {
    var datas = data.currentTarget.dataset;
    var playUrl = datas.videourl
    // playUrl = playUrl.substring(playUrl.indexOf('?')+1, playUrl.length)
    //暂时使用缓存的方式进行传参，无法使用url的方式传递视频链接
    wx.setStorageSync('videoUrl', playUrl)

    wx.setStorageSync('bgBlurredCover', datas.blurred_cover)
    wx.navigateTo({
      url: '../videoDetail/videoDetail?description=' + datas.description + '&category=' + datas.category + '&title=' + datas.title + '&videoId=' + datas.video_id
    })
  },
})