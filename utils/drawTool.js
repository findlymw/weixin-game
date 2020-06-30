let drawTool = {
  cleanAll(ctx,windowWidth, windowHeight) {
    ctx.clearRect(0, 0, windowWidth, windowHeight)
  },
  drawImage(ctx, url,x,y,width,height,raduis,isSave) {
    var image = wx.createImage()
    image.src = url;
    image.onload = function () {
      if(raduis > 0){
        let r = raduis;
        let d= 2 *r;
        let cx = x+ r;
        let cy = y+r;
        ctx.arc(cx,cy,r,0,2*Math.PI);
        ctx.clip();
        ctx.drawImage(image, x, y, d, d)
        ctx.restore();
      }else{
        ctx.drawImage(image, x, y, width, height)
      }
      if(isSave)
        ctx.save();
    }
  }

}
module.exports = drawTool;