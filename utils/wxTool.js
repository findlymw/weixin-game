let wxTool = {
  checkAuth (wx,callback){
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          callback(false);
        }else{
          callback(true);
        }
      }
    })
  },
  userLogin(wx,windowWidth,windowHeight,callback){
    wx.login({
      success (res) {
        if (res.code) {
          console.log('login Code:',res.code);
          let button = wx.createUserInfoButton({
            type: 'text',
            text: '授权登录',
            style: {
              left: windowWidth/2 - 100,
              top: windowHeight-100,
              width: 200,
              height: 40,
              lineHeight: 40,
              backgroundColor: '#1aad19',
              color: '#ffffff',
              textAlign: 'center',
              fontSize: 16,
              borderRadius: 4
            }
          })
          button.onTap((res) => {
            button.hide();
            callback(res);
          })
          
        } else {
          callback(res);
        }
      }
    })
  }
}

module.exports = wxTool;