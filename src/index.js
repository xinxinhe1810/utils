// eslint-disable-next-line no-console
console.log('start')
console.log('qx')

function animationScrollToPoisition(top, dur) {
  let reqId
  let currentTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  const scrollLine = top - currentTop
  const secondFps = 1000 / 60

  // 所需帧率
  const rafFps = Math.max(dur / secondFps, 1)
  // 步长
  const step = scrollLine / rafFps
  function stepAnimation() {
    if (Math.abs(currentTop - top) <= Math.abs(step)) {
      window.cancelAnimationFrame(reqId)
    } else {
      currentTop += step
      window.scrollTo({top: currentTop})
      reqId = window.requestAnimationFrame(stepAnimation)
    }
  }
  reqId = window.requestAnimationFrame(stepAnimation)
}
// this.clickTabTime = Date.now()
const top = 500
animationScrollToPoisition(top, 300)
