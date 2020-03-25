;(function () {
  let Game = function () {
    this.canvas = document.querySelector('#canvas')
    this.draw = this.canvas.getContext('2d')

    // 设置画布宽高
    let W = document.documentElement.clientWidth
    let H = document.documentElement.clientHeight
    this.canvas.width = W > 420 ? 420 : W
    this.canvas.height = H > 750 ? 750 : H
    this.scene = 0 // 场景编号
    this.score = 0 // 分数

    this.loadImg()
    // this.bindEvent()
  }

  window.Game = Game

  // 加载图片
  Game.prototype.loadImg = function () {
    // 缓存
    this.allImg = {
      bg_day: 'img/bg_day.png',
      land: 'img/land.png',
      pipe_down: 'img/pipe_down.png',
      pipe_up: 'img/pipe_up.png',
      bird0_0: 'img/bird0_0.png',
      bird0_1: 'img/bird0_1.png',
      bird0_2: 'img/bird0_2.png',
      title: 'img/title.png',
      button_play: 'img/button_play.png',
      tutorial: 'img/tutorial.png',
      number_0: 'img/font_048.png',
      number_1: 'img/font_049.png',
      number_2: 'img/font_050.png',
      number_3: 'img/font_051.png',
      number_4: 'img/font_052.png',
      number_5: 'img/font_053.png',
      number_6: 'img/font_054.png',
      number_7: 'img/font_055.png',
      number_8: 'img/font_056.png',
      number_9: 'img/font_057.png'
    }

    // 加载
    let n = 0
    let total = Object.keys(this.allImg).length
    for (let key in this.allImg) {
      let src = this.allImg[key]
      this.allImg[key] = new Image()
      this.allImg[key].src = src
      this.allImg[key].onload = () => {
        n++
        if (n === total) {
          console.log('图片加载完成')
          this.start()
        }
      }
    }
  }

  // 游戏清屏
  Game.prototype.clear = function () {
    let { width, height } = this.canvas
    this.draw.clearRect(0, 0, width, height)
  }

  // 游戏开始
  Game.prototype.start = function () {
    console.log('游戏开始')

    this.f = 0 // 帧数标记
    this.sM = new SceneManager()
    this.sM.enter(1)
    // this.bg = new Bg()
    // this.land = new Land()
    // this.bird = new Bird()
    // this.pipeArr = []

    this.timer = setInterval(() => {
      // 清屏
      this.clear()
      this.f++
      this.sM.updateAndRender()

      // 背景
      // this.bg.update()
      // this.bg.render()

      // 栏杆
      // this.land.update()
      // this.land.render()

      // 管子
      // if (this.f % 200 === 0) {
      //   new Pipe()
      // }
      // for(let i of this.pipeArr) {
      //   i.update()
      //   i.render()
      // }

      // 鸟
      // this.bird.update()
      // this.bird.render()
    }, 20)
  }

  // 事件管理器
  Game.prototype.bindEvent = function () {
    // this.canvas.onclick = () => {
      
    // }
  }
})()
