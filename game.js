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

  
  wx.onShow((result) => {
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
        drawTool.drawImage(context,'images/loadingLogo.png',canvas.width / 2 - 93,200,186,222);
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


