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

const _ = ''

export {_ as default, animateScrollTo}
