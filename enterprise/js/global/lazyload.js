// intersectionObserver 交叉观察 ： 目标元素和可视窗口会产生交叉区域
const imagess = [...document.querySelectorAll('.lazy-load')]
// callback 接收的参数为带有监听所有图片交叉属性的集合
const callback = (imgArr) => {
    console.log('视图交叉时触发，离开交叉时也触发', imgArr) // imgArr为
    imgArr.forEach(e => {
      // 判断是否在视野区域
      if (e.isIntersecting) {
        setTimeout(()=> {
            e.target.src = e.target.dataset.src
            // 取消观察追踪，避免重复加载同一张图片
            observer.unobserve(e.target)
        }, 1000)
        
      }
    })
  }
// 2.1 创建视觉交叉的观察实例
const observer = new IntersectionObserver(callback)
// 2.2 给每一个图片绑定观察方法
imagess.forEach(img => {
  // 2.3 图片进入视野+离开视野时触发 - 回调
  observer.observe(img)
})