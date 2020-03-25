(function() {
  let Pipe = function() {
    // 上管子的高度
    this.h1 = Math.round(Math.random() * 220 + 100)
    // 上下管子的空隙
    this.space = 140
    // 下管子的高度
    this.h2 = game.canvas.height - game.land.h - this.h1 - this.space
    // 管子 x 坐标
    this.x = game.canvas.width + 10
    this.done = true
    game.pipeArr.push(this)
  }

  window.Pipe = Pipe

  Pipe.prototype.update = function() {
    this.x -= 1

    // 管子完全移动到 canvas 外，移除管子
    if (this.x <= -52) {
      for (let i = 0; i < game.pipeArr.length; i++) {
        if (game.pipeArr[i] === this) {
          game.pipeArr.splice(i, 1)
          i--
        }
      }
    }

    this.x1 = this.x
    this.x2 = this.x + 52
    this.y1 = this.h1
    this.y2 = this.h1 + this.space
    // 碰撞检测
    let bumpUp = game.bird.x2 > this.x1 && game.bird.y1 < this.y1 && game.bird.x1 < this.x2
    let bumpDown = game.bird.x2 > this.x1 && game.bird.y2 > this.y2 && game.bird.x1 < this.x2
    if (bumpUp || bumpDown) {
      clearInterval(game.timer)
      console.log('碰管子了')
    }
    // 加分检测
    if (this.done && game.bird.x1 > this.x2) {
      game.score++
      this.done = false
    }
  }
  Pipe.prototype.render = function() {
    game.draw.drawImage(game.allImg['pipe_down'], 0, 320 - this.h1, 52, this.h1, this.x, 0, 52, this.h1)
    game.draw.drawImage(game.allImg['pipe_up'], 0, 0, 52, this.h2, this.x, this.h1 + this.space, 52, this.h2)
  }
})()