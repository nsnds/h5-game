(function () {
  let SceneManager = function () {
    this.bindEvent()
  }

  window.SceneManager = SceneManager

  // 场景切换
  SceneManager.prototype.enter = function (number) {
    // 0= 欢迎场景, 1= 新手教学场景, 2= 游戏场景, 3= , 4=
    switch (number) {
      case 1:
        game.scene = 1
        this.tutorialAlpha = 0
        this.tutorialAlphaChange = 0.05
        break
      case 2:
        game.scene = 2
        game.bg = new Bg()
        game.land = new Land()
        game.bird = new Bird()
        game.pipeArr = []
        break
      case 3:
        game.scene = 3
        break
      case 4:
        game.scene = 4
        break
      default:
        game.scene = 0
        this.titleY = 0
        this.buttonY = game.canvas.height
        this.birdY = 300
        this.birdChangeY = 1.5
        break
    }
  }

  // 场景更新渲染
  SceneManager.prototype.updateAndRender = function () {
    switch (game.scene) {
      case 1:
        // 背景
        game.draw.fillStyle = '#4ec0ca'
        game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height)
        game.draw.drawImage(game.allImg['bg_day'], 0, game.canvas.height - 512)
        game.draw.drawImage(game.allImg['bg_day'], 288, game.canvas.height - 512)
        game.draw.drawImage(game.allImg['land'], 0, game.canvas.height - 112)
        game.draw.drawImage(game.allImg['land'], 336, game.canvas.height - 112)

        // 鸟
        game.draw.drawImage(game.allImg['bird0_0'], (game.canvas.width - 48) / 2, 150)

        // 引导
        if (this.tutorialAlpha > 1 || this.tutorialAlpha < 0) {
          this.tutorialAlphaChange *= -1
        }
        this.tutorialAlpha += this.tutorialAlphaChange
        game.draw.save()
        game.draw.globalAlpha = utils.round(this.tutorialAlpha)
        game.draw.drawImage(game.allImg['tutorial'], (game.canvas.width - 114) / 2, 250)
        game.draw.restore()
        break
      case 2:
        game.bg.update()
        game.bg.render()
        game.land.update()
        game.land.render()

        game.f % 200 === 0 && new Pipe()
        for (let i of game.pipeArr) {
          i.update()
          i.render()
        }
        scoreRender()

        game.bird.update()
        game.bird.render()
        break
      case 3:
        break
      case 4:
        break
      default:
        // 背景
        game.draw.fillStyle = '#4ec0ca'
        game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height)
        game.draw.drawImage(game.allImg['bg_day'], 0, game.canvas.height - 512)
        game.draw.drawImage(game.allImg['bg_day'], 288, game.canvas.height - 512)
        game.draw.drawImage(game.allImg['land'], 0, game.canvas.height - 112)
        game.draw.drawImage(game.allImg['land'], 336, game.canvas.height - 112)
        
        // title
        this.titleY += 5
        if (this.titleY >= 160) this.titleY = 160
        game.draw.drawImage(game.allImg['title'], (game.canvas.width - 178) / 2, this.titleY)
        
        // 开始按钮
        this.buttonY -= 10
        if (this.buttonY <= 370) this.buttonY = 370
        game.draw.drawImage(game.allImg['button_play'], (game.canvas.width - 116) / 2, this.buttonY)

        // 鸟
        if (this.birdY <= 250 || this.birdY >= 300) this.birdChangeY *= -1
        this.birdY += this.birdChangeY
        game.draw.drawImage(game.allImg['bird0_0'], (game.canvas.width - 48) / 2, this.birdY)
        break
    }
  }

  // 事件管理器
  SceneManager.prototype.bindEvent = function() {
    game.canvas.onclick = (e) => {
      switch (game.scene) {
        case 1:
          this.enter(2)
          break
        case 2:
          game.bird.fly()
          break
        case 3:
          break
        case 4:
          break
        default:
          if (
            e.clientY > this.buttonY &&
            e.clientY < this.buttonY + 70 &&
            e.clientX > game.canvas.width / 2 - 58 &&
            e.clientX < game.canvas.width / 2 + 58
          ) {
            this.enter(1)
          }
          break
      }
    }
  }

  // 分数渲染
  function scoreRender() {
    let score = game.score.toString()
    let cenLine = game.canvas.width / 2 - (score.length) / 2 * 30
    for (let i = 0, length = score.length; i < length; i++) {
      game.draw.drawImage(game.allImg[`number_${score[i]}`], cenLine + i * 30, 100)
    }
  }
})()
