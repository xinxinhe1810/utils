// eslint-disable-next-line no-console
console.log('start')
console.log('qx')

function animationScrollToPoisition(top, dur) {
  // top是要滑到的目标高度，dur是所需时间
  let reqId
  let currentTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  const scrollLine = top - currentTop
  // 1帧所用时间
  const secondFps = 1000 / 60
  // 所需帧数
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

export default animationScrollToPoisition
