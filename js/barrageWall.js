class Barrage {
  constructor(canvas, canvasWidth, canvasHeight, highwayAmount, fontSize) {
    // 获取canvas对象
    this.canvas = document.getElementById(canvas)
    // 获得 2d 上下文对象
    this.context = this.canvas.getContext("2d")
    // 获取canvas容器的宽高，Canvas类似于位图，一般根据手机的屏幕倍数展示,将容器宽高乘以2以适配两倍屏，可自定义
    this.canvasHeight = canvasHeight * 2
    this.canvasWidth = canvasWidth * 2
    // 设置canvas的宽高
    this.canvas.width = this.canvasWidth
    this.canvas.height = this.canvasHeight
    // 存储正在发送的弹幕
    this.barrageList = [];
    // 存储待发送的弹幕
    this.textList = []
    // 初始化字体大小
    this.fontSize = fontSize
    this.context.font = `${this.fontSize}px STheiti, SimHei`
    this.highwayAmount = []
    // 初始化弹幕的highwayAmount,将弹幕划分成类似一条条公路，防止弹幕在Y轴重叠，可根据实际情况调整数量
    this.initTop(highwayAmount)
    // 是否绘画完成标志
    this.draw = false
  }
  initTop(highwayAmount) {
    // 最多存在弹幕行数
    const maxHighwayAmount = parseInt(this.canvasHeight / (this.fontSize + 20))
    // 如果传入的行数大于最大行数，取最大行数
    maxHighwayAmount < highwayAmount ? highwayAmount = maxHighwayAmount : ''
    // highwayAmount弹幕行数
    for (let i = 1; i <= highwayAmount; i++) {
      this.highwayAmount.push(((this.fontSize + 20) * i))
    }
  }
  clearBarrage() {
    this.draw = false
    this.barrageList = []
    // 清空canvas画布内容
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
  }
  drawBarrage() {
    if (!this.draw) {
      return
    }
    // 清空canvas画布内容
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    // 提前清除无用的弹幕，保证绘制弹幕时所有弹幕都是存在于页面上的，如果边绘制弹幕边清除数据，因为数组下标的改变会引起弹幕闪烁
    for (let i = 0; i < this.barrageList.length; i++) {
      // 当弹幕的left(距离canvas左边的位置)+width弹幕自身宽度<=0时，说明弹幕已出屏幕，从this.barrageList中剔除
      this.barrageList[i].left + this.barrageList[i].width <= 0 ? this.barrageList.splice(i, 1) : ''
    }
    // 绘制弹幕
    this.barrageList.forEach((val) => {
      //设置弹幕颜色
      this.context.fillStyle = val.color
      this.context.font = 'bold  ' + val.fontSize + 'px "microsoft yahei", sans-serif';
      val.width = val.width || Math.ceil(this.context.measureText(val.value).width) // 校正获取该弹幕占用的宽度
      // 绘制弹幕位置
      this.context.fillText(`${val.value} `, val.left, val.top)
      // occupation为占用top标志，当弹幕的left(距离canvas左边的位置)+width弹幕自身宽度<屏幕宽度时，说明弹幕已完全展示于屏幕中，可以释放占用的top并插入新值，consumeText函数作用见下文
      val.occupation && val.left + val.width <= this.canvasWidth ? this.consumeText(val) : ''
      // 控制弹幕速度
      val.left -= val.offset
    })
    // this.barrageList为0，说明已无弹幕
    this.barrageList.length == 0 ? this.draw = false : requestAnimationFrame(this.drawBarrage.bind(this))
  }
  consumeText(val) {
    // 将占用标志置为false，防止多次执行val.occupation && val.left + val.width <= this.canvasWidth ? this.consumeText(val) : ''
    val.occupation = false
    // 释放top值，向this.highwayAmount返回占用的top值,延迟0.5s执行，防止弹幕粘黏
    setTimeout(() => {
      this.highwayAmount.push(val.top)
      // 检查是否有待发送的弹幕，如果有，向this.barrageList插入新值
      if (this.textList.length != 0) {
        this.barrageList.push(this.initTest(this.textList.splice(0, 1)[0]))
      }
    }, 500)
  }
  addTest(textList) {
    // 判断是否处于绘制状态
    if (this.draw) {
      // 判断是否有空余的highwayAmount可以使用
      if (this.highwayAmount.length != 0) {
        let barrageList = textList.splice(0, this.highwayAmount.length)
        for (const val of barrageList) {
          this.barrageList.push(this.initTest(val))
        }
      }
      this.textList.push(...textList)
    } else {
      this.textList.push(...textList)
      // 将绘制状态置为true
      this.draw = true
      this.runBarrage()
    }
  }
  initTest(text) {
    // 初始化弹幕对象信息
    let color = ['#E0FFFF', '#FFE1FF', '#FFB5C5', '#F0FFF0', '#BFEFFF', '#63B8FF', '#FFFFFF']
    let barrageTest = {
      value: text,// 弹幕值
      top: this.highwayAmount.splice(0, 1)[0],
      left: this.canvasWidth,// 弹幕起点
      color: color[Math.floor(Math.random() * 6)],// 弹幕随机颜色
      fontSize: Math.floor(Math.random() * 25) + 12, // 12 - 36
      offset: Math.ceil(Math.random() * 3),// 弹幕速度
      width: 0,// 暂时为0, 会根据fontSize重新计算
      occupation: true,// 占用top状态
    }
    return barrageTest
  }
  runBarrage() {
    // 根据弹幕top数初始化第一次展示的数据
    this.textList.splice(0, this.highwayAmount.length).forEach((val) => {
      this.barrageList.push(this.initTest(val))
    })
    // 开始绘制
    this.drawBarrage()
  }
}

const barrage = new Barrage('myCanvas', 565, 377, 10, 20)

function send() {
  const val = document.getElementById('txt').value;
  if (val) {
    barrage.addTest([val])
  } else {
    alert('弹幕不能为空')
  }
}
function clearFn() {
  barrage.clearBarrage()
}

function clickEnter(event) {
  console.log(event.keyCode)
  if (event.keyCode == 13) {
    const val = document.getElementById('txt').value;
    if (val) {
      barrage.addTest([val])
      document.getElementById('txt').value = ''
    } else {
      alert('弹幕不能为空')
    }
  }
}
