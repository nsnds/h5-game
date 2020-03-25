(function() {
  let Bg = function() {
    this.x = 0 // 起始 x 坐标
    this.w = 288 // 图片宽
    this.h = 512 // 图片高
    this.step = 1 // 步长, 一帧移动长度
  }

  window.Bg = Bg

  Bg.prototype.update = function() {
    this.x -= this.step

    // 临界值判断
    if (this.x <= -this.w) {
      this.x = 0
    }
  }
  Bg.prototype.render = function() {
    // drawImage(图片, x, y)
    game.draw.drawImage(game.allImg['bg_day'], this.x, game.canvas.height - this.h)
    game.draw.drawImage(game.allImg['bg_day'], this.x + this.w, game.canvas.height - this.h)
    game.draw.drawImage(game.allImg['bg_day'], this.x + this.w * 2, game.canvas.height - this.h)
    game.draw.fillStyle = '#4ec0ca'
    game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height - this.h)
  }
})()