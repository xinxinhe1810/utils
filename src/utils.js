/**
 *
 * @param {number} top - 需要滚动到的目标 top 值
 * @param {number} duration - 滚动到目标所需的时间 ms
 */
function animateScrollTo(top, duration) {
  let rafId
  let currentBodyScrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop

  const scrollToTop = Math.max(0, top)
  const secondFps = 1000 / 60
  const currentFps = Math.max(1, duration / secondFps)
  const scrollDiff = scrollToTop - currentBodyScrollTop
  const step = scrollDiff / currentFps

  function animationStep() {
    if (Math.abs(currentBodyScrollTop - scrollToTop) <= Math.abs(step)) {
      window.cancelAnimationFrame(rafId)
    } else {
      currentBodyScrollTop += step
      window.scrollTo(0, currentBodyScrollTop)
      rafId = window.requestAnimationFrame(animationStep)
    }
  }
  window.requestAnimationFrame(animationStep)
}

// 获取字符长度、中文为2
const getStrRealLength = str => {
  if (str == null) return 0
  // eslint-disable-next-line no-control-regex
  return String(str).replace(/[^\x00-\xff]/g, '01').length
}

// 截取字符长度
/**
 *
 * @param {string} str - 输入字符串
 * @param {number} len  - 截取字符串长度
 * @param {boolean} exact - 是否精确匹配字节长度
 */
const subStrRealLength = (str, len, exact) =>
  exact
    ? String(str)
        .slice(0, len)
        .replace(/([^x00-xff])/g, '$1a')
        .slice(0, len)
        .replace(/([^x00-xff])a/g, '$1')
    : String(str).slice(0, len)

const _ = ''

export {_ as default, animateScrollTo, getStrRealLength, subStrRealLength}
