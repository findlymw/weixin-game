let main = {
  run(wx,canvas,context,drawTool,windowWidth,windowHeight){
    drawTool.cleanAll(context,canvas.width, canvas.windowHeight);

    context.fillStyle = '#1aad19';

    let gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    // 线性渐变
    gradient.addColorStop(0, '#0099ff');
    gradient.addColorStop(1, '#e5f5ff');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    
    // draw 棋盘
    // drawTool.drawImage(context,'images/loadingLogo.png',canvas.width / 2 - 93,200,186,222);
    drawTool.drawImage(context,'images/qp.png',canvas.width / 2- 500,700,1000,1000,0,true);
    // draw 本地头像
    let userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo.avatarUrl);
    drawTool.drawImage(context,userInfo.avatarUrl,70,240,200,200,100,true);
    drawTool.drawImage(context,userInfo.avatarUrl,855,240,200,200,100,true);

    //draw vs
    drawTool.drawImage(context,'images/vs.png',canvas.width / 2 - 100,150,200,200,0,true);
    //draw ready btn
    drawTool.drawImage(context,'images/ready.png',canvas.width / 2 - 255,2000,510,165,0,false);
    
    // console.log('data uri:',canvas.toDataURL());

  }
}

module.exports = main;