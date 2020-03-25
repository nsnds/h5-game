(function() {
  let Bird = function() {
    this.w = 48
    this.h = 48
    this.x = game.canvas.width / 2
    this.y = (game.canvas.height - 48) * (1- 0.618)
    this.changeY = 0
    this.rotate = 0
    this.status = 'drop' // drop= 下落, up= 上升
    this.img = [
      game.allImg['bird0_0'],
      game.allImg['bird0_1'],
      game.allImg['bird0_2']
    ]
    this.wing = 0
  }

  window.Bird = Bird

  Bird.prototype.update = function() {
    if (this.status === 'drop') {
      // 下落
      this.changeY += 0.6
      this.y += this.changeY
      this.rotate += 0.03

      // 触底
      if (this.y > game.canvas.height - game.land.h) {
        this.y = game.canvas.height - game.land.h
      }

      // 向下最大角度
      if (this.rotate >= 90 * Math.PI / 180) {
        this.rotate = 90 * Math.PI / 180
      }
    } else {
      // 上升
      this.changeY -= 0.8
      this.wing++

      if (this.wing > 2) {
        this.wing = 0
      }

      if (this.changeY <= 0) {
        this.status = 'drop'
        return
      }

      this.y -= this.changeY

      // 触顶
      if (this.y <= this.h / 4) {
        this.y = this.h / 4
      }

      // 向上最大角度
      if (this.rotate <= -90 * Math.PI / 180) {
        this.rotate = -90 * Math.PI / 180
      }
    }

    // 34 * 24
    this.x1 = this.x - 17
    this.x2 = this.x + 17
    this.y1 = this.y - 12
    this.y2 = this.y + 12
  }
  Bird.prototype.render = function() {
    game.draw.save()
    game.draw.translate(this.x , this.y)
    game.draw.rotate(this.rotate)
    game.draw.drawImage(this.img[this.wing], -this.w / 2, -this.h / 2)
    game.draw.restore()
  }
  // 点击上升
  Bird.prototype.fly = function() {
    this.status = 'up'
    this.rotate += -0.5
    this.changeY = 10
  }
})()