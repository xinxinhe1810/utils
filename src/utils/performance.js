/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

const getTiming = () => {
  if (!window.performance) {
    // 当前浏览器不支持
    console.log(
      '你的浏览器不支持 performance 接口\nUA：',
      window.navigator.userAgent
    )
    return
  }

  const timing = Object.create(null)

  try {
    const time = window.performance.timing

    timing['重定向时间'] = time.redirectEnd - time.redirectStart
    timing['DNS解析时间'] = time.domainLookupEnd - time.domainLookupStart
    timing['TCP完成握手时间'] = time.connectEnd - time.connectStart
    timing['HTTP请求响应完成时间'] = time.responseEnd - time.requestStart
    timing['DOM开始加载前所花费时间'] = time.responseEnd - time.navigationStart
    timing['DOM加载完成时间'] = time.domComplete - time.domLoading
    timing['DOM结构解析完成时间'] = time.domInteractive - time.domLoading
    timing['脚本加载时间'] =
      time.domContentLoadedEventEnd - time.domContentLoadedEventStart
    timing['onload事件时间'] = time.loadEventEnd - time.loadEventStart
    timing['页面完全加载时间'] =
      timing['重定向时间'] +
      timing['DNS解析时间'] +
      timing['TCP完成握手时间'] +
      timing['HTTP请求响应完成时间'] +
      timing['DOM结构解析完成时间'] +
      timing['DOM加载完成时间']

    for (const item in timing) {
      if (Object.prototype.hasOwnProperty.call(timing, item)) {
        console.log(`${item}:${timing[item]}毫秒(ms)`)
      }
    }

    console.log(window.performance.timing)
  } catch (e) {
    console.log(timing)
    console.log(window.performance.timing)
  }
}

export default getTiming

// 获取 performance 数据
// eslint-disable-next-line no-unused-vars
const performance = {
  // memory 是非标准属性，只在 Chrome 有
  // 财富问题：我有多少内存
  memory: {
    usedJSHeapSize: 16100000, // JS 对象（包括V8引擎内部对象）占用的内存，一定小于 totalJSHeapSize
    totalJSHeapSize: 35100000, // 可使用的内存
    jsHeapSizeLimit: 793000000, // 内存大小限制
  },

  //  哲学问题：我从哪里来？
  navigation: {
    redirectCount: 0, // 如果有重定向的话，页面通过几次重定向跳转而来
    type: 0, // 0   即 TYPE_NAVIGATENEXT 正常进入的页面（非刷新、非重定向等）
    // 1   即 TYPE_RELOAD       通过 window.location.reload() 刷新的页面
    // 2   即 TYPE_BACK_FORWARD 通过浏览器的前进后退按钮进入的页面（历史记录）
    // 255 即 TYPE_UNDEFINED    非以上方式进入的页面
  },

  timing: {
    // 在同一个浏览器上下文中，前一个网页（与当前页面不一定同域）unload 的时间戳，如果无前一个网页 unload ，则与 fetchStart 值相等
    navigationStart: 1441112691935,

    // 前一个网页（与当前页面同域）unload 的时间戳，如果无前一个网页 unload 或者前一个网页与当前页面不同域，则值为 0
    unloadEventStart: 0,

    // 和 unloadEventStart 相对应，返回前一个网页 unload 事件绑定的回调函数执行完毕的时间戳
    unloadEventEnd: 0,

    // 第一个 HTTP 重定向发生时的时间。有跳转且是同域名内的重定向才算，否则值为 0
    redirectStart: 0,

    // 最后一个 HTTP 重定向完成时的时间。有跳转且是同域名内部的重定向才算，否则值为 0
    redirectEnd: 0,

    // 浏览器准备好使用 HTTP 请求抓取文档的时间，这发生在检查本地缓存之前
    fetchStart: 1441112692155,

    // DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
    domainLookupStart: 1441112692155,

    // DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
    domainLookupEnd: 1441112692155,

    // HTTP（TCP） 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等
    // 注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接开始的时间
    connectStart: 1441112692155,

    // HTTP（TCP） 完成建立连接的时间（完成握手），如果是持久连接，则与 fetchStart 值相等
    // 注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接完成的时间
    // 注意这里握手结束，包括安全连接建立完成、SOCKS 授权通过
    connectEnd: 1441112692155,

    // HTTPS 连接开始的时间，如果不是安全连接，则值为 0
    secureConnectionStart: 0,

    // HTTP 请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存
    // 连接错误重连时，这里显示的也是新建立连接的时间
    requestStart: 1441112692158,

    // HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存
    responseStart: 1441112692686,

    // HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存
    responseEnd: 1441112692687,

    // 开始解析渲染 DOM 树的时间，此时 Document.readyState 变为 loading，并将抛出 readystatechange 相关事件
    domLoading: 1441112692690,

    // 完成解析 DOM 树的时间，Document.readyState 变为 interactive，并将抛出 readystatechange 相关事件
    // 注意只是 DOM 树解析完成，这时候并没有开始加载网页内的资源
    domInteractive: 1441112693093,

    // DOM 解析完成后，网页内资源加载开始的时间
    // 在 DOMContentLoaded 事件抛出前发生
    domContentLoadedEventStart: 1441112693093,

    // DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕）
    domContentLoadedEventEnd: 1441112693101,

    // DOM 树解析完成，且资源也准备就绪的时间，Document.readyState 变为 complete，并将抛出 readystatechange 相关事件
    domComplete: 1441112693214,

    // load 事件发送给文档，也即 load 回调函数开始执行的时间
    // 注意如果没有绑定 load 事件，值为 0
    loadEventStart: 1441112693214,

    // load 事件的回调函数执行完毕的时间
    loadEventEnd: 1441112693215,

    // 字母顺序
    // connectEnd: 1441112692155,
    // connectStart: 1441112692155,
    // domComplete: 1441112693214,
    // domContentLoadedEventEnd: 1441112693101,
    // domContentLoadedEventStart: 1441112693093,
    // domInteractive: 1441112693093,
    // domLoading: 1441112692690,
    // domainLookupEnd: 1441112692155,
    // domainLookupStart: 1441112692155,
    // fetchStart: 1441112692155,
    // loadEventEnd: 1441112693215,
    // loadEventStart: 1441112693214,
    // navigationStart: 1441112691935,
    // redirectEnd: 0,
    // redirectStart: 0,
    // requestStart: 1441112692158,
    // responseEnd: 1441112692687,
    // responseStart: 1441112692686,
    // secureConnectionStart: 0,
    // unloadEventEnd: 0,
    // unloadEventStart: 0
  },
}

// eslint-disable-next-line no-unused-vars
const entry = {
  // 资源名称，也是资源的绝对路径
  name: 'http://cdn.alloyteam.com/wp-content/themes/alloyteam/style.css',
  // 资源类型
  entryType: 'resource',
  // 谁发起的请求
  initiatorType: 'link', // link 即 <link> 标签
  // script 即 <script>
  // redirect 即重定向
  // 加载时间
  duration: 18.13399999809917,

  redirectStart: 0,
  redirectEnd: 0,

  fetchStart: 424.57699999795295,

  domainLookupStart: 0,
  domainLookupEnd: 0,

  connectStart: 0,
  connectEnd: 0,

  secureConnectionStart: 0,

  requestStart: 0,

  responseStart: 0,
  responseEnd: 442.7109999960521,

  startTime: 424.57699999795295,
}

// todo has some bug
// eslint-disable-next-line no-unused-vars
const getFrame = () => {
  let lastTime = performance.now()

  let frame = 0

  let lastFameTime = performance.now()

  // eslint-disable-next-line no-unused-vars
  const loop = () => {
    const now = performance.now()

    const fs = now - lastFameTime

    lastFameTime = now

    // eslint-disable-next-line no-unused-vars
    let fps = Math.round(1000 / fs)

    frame += 1

    if (now > 1000 + lastTime) {
      fps = Math.round((frame * 1000) / (now - lastTime))

      frame = 0

      lastTime = now
    }
    window.requestAnimationFrame(loop)
  }
}
