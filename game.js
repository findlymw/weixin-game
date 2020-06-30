const drawTool = require('./utils/drawTool.js');
const wxTool = require('./utils/wxTool.js');
const main = require('./game/main.js');

const canvas = wx.createCanvas();
canvas.width = canvas.width * 3;
canvas.height = canvas.height * 3;
const {
  windowWidth,
  windowHeight
} = wx.getSystemInfoSync()
const context = canvas.getContext('2d');

let localUser = {};

  console.log('canvas.width:', canvas.width, 'canvas.height:', canvas.height);
  console.log('windowWidth:', windowWidth, 'windowHeight:', windowHeight);

  //websocket
  wx.connectSocket({
    url: 'ws://192.168.130.86:8080/gs-guide-websocket/966/h1nsqgau/websocket',
    success(res){
      console.log('============');
      console.dir(res);
    }
  })


  //存放按钮的位置信息
  let points = [
    //ready按钮 
    //canvas.width / 2 - 160,2000,310,100
    {x: 103, y: 666, w: 272, h: 715,switch:true},
];

  wx.onTouchStart(function (evt) {
    let x = parseInt(evt.changedTouches[0].clientX);
    let y = parseInt(evt.changedTouches[0].clientY);
    console.log('x:y:',x,':',y);
    if(
      x >= points[0].x 
      && x <= points[0].w 
      && y >= points[0].y
      && y <= points[0].h
      && points[0].switch
      ){
        console.log('-----taped ready');
        //draw ready btn
        drawTool.drawImage(context,'images/ready-tap.png',canvas.width / 2 - 255,2000,510,165,0,false);
      }
    });
     wx.onTouchEnd((result) => {
      wx.vibrateShort({
        success: (res) => {
          drawTool.drawImage(context,'images/fighting.png',canvas.width / 2 - 255,2000,510,165,0,false);
          points[0].switch = false;
        },
      })
     })

  
  wx.onShow((result) => {
    points[0].switch = true;
    wxTool.checkAuth(wx, function(res){
      if(res){ //已授权
        wx.getStorage({
          key: 'userInfo',
          success(res){
            localUser.userInfo = res.userInfo;
            main.run(wx,canvas,context,drawTool,windowWidth,windowHeight);
          },
          fail(){
            wx.getUserInfo({
              success: function(res) {
                localUser.userInfo = res.userInfo
                wx.setStorage({
                  data: localUser.userInfo,
                  key: 'userInfo',
                })
                main.run(wx,canvas,context,drawTool,windowWidth,windowHeight);
              }
            })
          }
        })
      }else{
        drawTool.drawImage(context,'images/loadingLogo.png',canvas.width / 2 - 93,200,186,222,0,true);
        wxTool.userLogin(wx,windowWidth,windowHeight,function(res){
          if(res && res.userInfo && res.userInfo.nickName){
            localUser.userInfo = res.userInfo
                wx.setStorage({
                  data: localUser.userInfo,
                  key: 'userInfo',
                })
                main.run(wx,canvas,context,drawTool,windowWidth,windowHeight);
          }
        });
      }
    })
    
  })


