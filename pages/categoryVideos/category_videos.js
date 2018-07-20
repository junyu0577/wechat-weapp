const app = getApp()
var that
var API = require('../../utils/api.js')
var Utils = require('../../utils/util.js')
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

            ['videoList[' + index + ']']: res.data.itemList[index],
            ['videoList[' + index + '].data.duration']: Utils.durationFormat(res.data.itemList[index].data.duration)

          })

        }

      }
    })
  },
  goViewDetail: function(data) {
    var datas = data.currentTarget.dataset.videodata;

    // playUrl = playUrl.substring(playUrl.indexOf('?')+1, playUrl.length)
    //暂时使用缓存的方式进行传参，无法使用url的方式传递视频链接
    wx.setStorageSync('videoUrl', datas.playUrl)

    wx.setStorageSync('bgBlurredCover', datas.cover.blurred)
    wx.navigateTo({
      url: '../videoDetail/videoDetail?description=' + datas.description + '&category=' + datas.category + '&title=' + datas.title + '&videoId=' + datas.id
    })
  },
})