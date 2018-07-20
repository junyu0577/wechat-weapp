// pages/girls.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
var that
var API = require('../../utils/api.js')
var hasMonthData
var hasHistoricalData

Page({


  data: {
    tabs: ["周排行", "月排行", "总排行"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    rankList: [],
    monthRankList: [],
    allRankList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    that.getRankList('weekly')

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  tabClick: function(e) {

    if (e.currentTarget.id == 1 && !hasMonthData) {
      that.getRankList('monthly')
    } else if (e.currentTarget.id == 2 && !hasHistoricalData) {
      that.getRankList('historical')
    }

    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  getRankList: function(interval) {
    wx.showNavigationBarLoading()
    var reqUrl = API.RANK_LIST_ACTION()
    reqUrl = reqUrl.replace('[interval]', interval)
    wx.request({

      url: reqUrl,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function(res) {

        console.log(res.data.itemList)
        wx.hideNavigationBarLoading()

        for (var index in res.data.itemList) {
          if (interval == 'weekly') {
            that.setData({
            
              ['rankList[' + index + ']']: res.data.itemList[index]

            })
          } else if (interval == 'monthly') {
            that.setData({
           
              ['monthRankList[' + index + ']']: res.data.itemList[index]

            })
            hasMonthData = true
          } else {
            that.setData({
             
               ['allRankList[' + index + ']']: res.data.itemList[index]

            })
            hasHistoricalData = true
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
  //下拉刷新
  onPullDownRefresh: function() {
    // wx.stopPullDownRefresh()
  }



})