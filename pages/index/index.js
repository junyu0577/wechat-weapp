//index.js
//获取应用实例
const app = getApp()
var that
var API = require('../../utils/api.js')
var Utils = require('../../utils/util.js')
var timeStamp
var globalCount = 0
var page = 0

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

    timeStamp = new Date().valueOf() - 864001000;
    that.getDailyData(timeStamp, page);


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

              ['imgUrls[' + conut + ']']: res.data.issueList[0].itemList[index],

            })
            conut++
          }

        }
      }
    })
  },
  getDailyData: function(timeStamp, page) {
    var reqUrl = API.DAILY_LIST_ACTION();
    reqUrl = reqUrl.replace('[timeStamp]', timeStamp)
    console.log(reqUrl)
    wx.request({

      url: reqUrl,
      method: 'GET',
      success: function(res) {
        console.log(res.data.issueList[0].itemList)
        wx.stopPullDownRefresh()

        if (page == 0) {
          that.clearData()
        }

        for (var index in res.data.issueList[0].itemList) {
          if (res.data.issueList[0].itemList[index].type == 'video') {

            var tags = '#'

            for (var j in res.data.issueList[0].itemList[index].data.tags) {
              if (j > 3) {
                break
              }
              tags = tags + res.data.issueList[0].itemList[index].data.tags[j].name + '/'
            }

            tags = tags + Utils.durationFormat(res.data.issueList[0].itemList[index].data.duration)

            that.setData({
          
              ['dailyList[' + globalCount + ']']: res.data.issueList[0].itemList[index],
              ['dailyList[' + globalCount + '].data.tags']: tags

            })
            globalCount++
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
  onReachBottom: function() {
    timeStamp = timeStamp - 864001000;
    page++
    that.getDailyData(timeStamp, page)
  },
  //下拉刷新
  onPullDownRefresh: function() {

    timeStamp = new Date().valueOf() - 864001000;
    page = 0
    globalCount = 0
    that.getDailyData(timeStamp, page);

  },
  clearData: function() {
    this.setData({
      dailyList: []
    })

  }

})