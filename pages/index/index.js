//index.js
//获取应用实例
const app = getApp()
var that
var API = require('../../utils/api.js')
var Utils = require('../../utils/util.js')

Page({
  data: {
    imgUrls: [


    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imageWidth: wx.getSystemInfoSync().windowWidth, //图片宽度
    dailyList: [],
  },
  onLoad: function() {
    that = this

    // 获取轮播图
    that.getBanner()

    that.getDailyData();


  },
  //下拉刷新
  onPullDownRefresh: function() {
    // wx.stopPullDownRefresh()
  },
  getBanner: function() {
    wx.request({

      url: API.BANNER_ACTION(),
      method: 'GET',
      success: function(res) {
        console.log(res.data.issueList[0].itemList)

        var conut = 0
        for (var index in res.data.issueList[0].itemList) {
          if (res.data.issueList[0].itemList[index].type == 'video') {

            that.setData({

              ['imgUrls[' + conut + '].data.cover.feed']: res.data.issueList[0].itemList[index].data.cover.feed,
              ['imgUrls[' + conut + '].data.title']: res.data.issueList[0].itemList[index].data.title,
              ['imgUrls[' + conut + '].data.playUrl']: res.data.issueList[0].itemList[index].data.playUrl,
              ['imgUrls[' + conut + '].data.category']: res.data.issueList[0].itemList[index].data.category,
              ['imgUrls[' + conut + '].data.description']: res.data.issueList[0].itemList[index].data.description,
              ['imgUrls[' + conut + '].data.cover.blurred']: res.data.issueList[0].itemList[index].data.cover.blurred,
              ['imgUrls[' + conut + '].data.id']: res.data.issueList[0].itemList[index].data.id,


            })
            conut++
          }

        }
      }
    })
  },
  getDailyData: function() {
    var reqUrl = API.DAILY_LIST_ACTION();
    var timeStamp = new Date().valueOf() - 864001000;
    reqUrl = reqUrl.replace('[timeStamp]', timeStamp)
    console.log(reqUrl)
    wx.request({

      url: reqUrl,
      method: 'GET',
      success: function(res) {
        console.log(res.data.issueList[0].itemList)

        var conut = 0
        for (var index in res.data.issueList[0].itemList) {
          if (res.data.issueList[0].itemList[index].type == 'video') {

            var tags = '#'

            for (var j in res.data.issueList[0].itemList[index].data.tags) {
              tags = tags + res.data.issueList[0].itemList[index].data.tags[j].name + '/'
            }

            tags = tags + Utils.durationFormat(res.data.issueList[0].itemList[index].data.duration)

            that.setData({

              ['dailyList[' + conut + '].data.cover.feed']: res.data.issueList[0].itemList[index].data.cover.feed,
              ['dailyList[' + conut + '].data.title']: res.data.issueList[0].itemList[index].data.title,
              ['dailyList[' + conut + '].data.playUrl']: res.data.issueList[0].itemList[index].data.playUrl,
              ['dailyList[' + conut + '].data.category']: res.data.issueList[0].itemList[index].data.category,
              ['dailyList[' + conut + '].data.description']: res.data.issueList[0].itemList[index].data.description,
              ['dailyList[' + conut + '].data.cover.blurred']: res.data.issueList[0].itemList[index].data.cover.blurred,
              ['dailyList[' + conut + '].data.id']: res.data.issueList[0].itemList[index].data.id,
              ['dailyList[' + conut + '].data.author.icon']: res.data.issueList[0].itemList[index].data.author.icon,
              ['dailyList[' + conut + '].data.tags']: tags

            })
            conut++
          }

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