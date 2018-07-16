'use strict';

//开眼服务器地址
var KAIYAN_URL = 'http://baobab.kaiyanapp.com/api/'

var VIDEO_PATH = 'v1/playUrl?'

var RECOMMEND_VIDEO_LIST = 'v4/video/related?&id=[videoId]&phoneSystem=&phoneModel='

var RANK_LIST = 'v4/rankList/videos?strategy=[interval]&phoneSystem=&phoneModel='

var BANNER = 'v2/feed?&num=1&phoneSystem=&phoneModel='

var DAILY_DATA = 'v2/feed?date=[timeStamp]&num=1&phoneSystem=&phoneModel='


//开眼热门排行
function getWeekRankList() {
  return KAIYAN_URL + RANK_LIST;
}

//首页每日数据
function getDailyList() {
  return KAIYAN_URL + DAILY_DATA;
}

//推荐列表
function getRecommendVideoList() {
  return KAIYAN_URL + RECOMMEND_VIDEO_LIST;
}

//轮播banner
function getBanner() {
  return KAIYAN_URL + BANNER;
}

module.exports = {
  BANNER_ACTION: getBanner,
  RANK_LIST_ACTION: getWeekRankList,
  VIDEO_URL: VIDEO_PATH,
  RECOMMEND_VIDEO_ACTION: getRecommendVideoList,
  DAILY_LIST_ACTION: getDailyList
}