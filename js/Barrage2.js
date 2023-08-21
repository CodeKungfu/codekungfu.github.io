class Barrage {
    constructor(canvas, canvasWidth, canvasHeight) {
        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext("2d");
        this.canvasHeight = canvasHeight * 2;
        this.canvasWidth = canvasWidth * 2;
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.draw = false;
        this.barrageList = [];
    }
    // 清除弹幕
    clearBarrage() {
        this.draw = false;
        this.barrageList = [];
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // 清空canvas画布内容
    }
    // 可绘制弹幕数组
    getCurrentBarrage() {
        const output = [];
        for (let i = 0; i < this.barrageList.length; i++) {
            // 当弹幕的left(距离canvas左边的位置)+width弹幕自身宽度<=0时，说明弹幕已出屏幕, 不参加渲染, > 0时进行渲染
            if (this.barrageList[i].left + this.barrageList[i].width > 0) {
                output.push(this.barrageList[i]);
            }
        }
        return output;
    }
    // 绘制弹幕
    drawBarrage() {
        if (!this.draw) {
          return;
        }
        console.log('drawBarrage');
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        const viewList = this.getCurrentBarrage(); // 绘制弹幕
        viewList.forEach((val) => {
            this.context.fillStyle = val.color; // 弹幕颜色
            this.context.font = 'bold  ' + val.fontSize + 'px "microsoft yahei", sans-serif';
            val.width = val.width || Math.ceil(this.context.measureText(val.value).width); // 弹幕占用的宽度
            this.context.fillText(`${val.value} `, val.left, val.top);
            val.left -= val.speed;
        })
        viewList.length == 0 ? this.draw = false : requestAnimationFrame(this.drawBarrage.bind(this));
        // viewList.length == 0 ? this.draw = false : requestAnimationFrame(() => {
        //   this.drawBarrage()
        // });
    }
    // 添加弹幕
    addBarrage(val) {
        this.barrageList.push(this.genBarrage(val));
        if (!this.draw) { // 如果弹幕已经停止，重新开始渲染
            this.draw = true;
            this.drawBarrage();
        }
    }
    // 生成弹幕对象
    genBarrage(val) {
        const color = ['#E0FFFF', '#FFE1FF', '#FFB5C5', '#F0FFF0', '#BFEFFF', '#63B8FF', '#FFFFFF'];
        const fontSize = Math.floor(Math.random() * 25) + 12; // 12 - 36
        let top = Math.floor(Math.random() * this.canvasHeight) + fontSize;
        if (top + fontSize > this.canvasHeight) { // 显示溢出屏幕, 回调高度
            top = this.canvasHeight - fontSize * 2 - 10;
        }
        return {
          value: val, // 弹幕值
          top,
          left: this.canvasWidth, // 弹幕起点
          color: color[Math.floor(Math.random() * 6)], // 弹幕随机颜色
          fontSize,
          speed: Math.ceil(Math.random() * 3), // 弹幕速度
          width: 0 // 暂时为0, 会根据fontSize重新计算
        }
    }
}

class BarrageHistory extends Barrage {
  constructor(canvas, canvasWidth, canvasHeight) {
    super(canvas, canvasWidth, canvasHeight);
    this.snapshot = [];
  }
  // 生成快照
  genSnapshot() {
    this.snapshot = [];
    const shotlist = this.getCurrentBarrage();
    shotlist.forEach((item) => {
      this.snapshot.push({
        ...item
      });
    });
    console.log('genSnapshot', this.snapshot);
  }
  // 回放快照
  playSnapshot() {
    this.clearBarrage();
    console.log('playSnapshot', this.snapshot);
    this.snapshot.forEach((item) => {
      this.barrageList.push({
        ...item
      });
    });
    this.draw = true;
    this.drawBarrage();
  }
  // 清除快照
  clearSnapshot() {
    this.clearBarrage();
    this.snapshot = [];
  }
}

const barrage = new BarrageHistory('myCanvas', 565, 377)

function storeSnapShot() {
  barrage.genSnapshot();
}

function playSnapShot() {
  barrage.playSnapshot();
}

function send() {
  const val = document.getElementById('txt').value;
  if (val) {
    barrage.addBarrage(val)
  } else {
    alert('弹幕不能为空')
  }
}
function clearFn() {
  barrage.clearBarrage()
}

function clickEnter(event) {
  if (event.keyCode == 13) {
    const val = document.getElementById('txt').value;
    if (val) {
      barrage.addBarrage(val)
      document.getElementById('txt').value = ''
    } else {
      alert('弹幕不能为空')
    }
  }
}