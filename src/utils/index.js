export function formatDate(time, type = 'YYYY-MM-DD') {
  const y = formatNumber(time.getFullYear())
  const m = formatNumber(time.getMonth() + 1)
  const d = formatNumber(time.getDate())
  const h = formatNumber(time.getHours())
  const mm = formatNumber(time.getMinutes())
  const s = formatNumber(time.getSeconds())
  if (type === 'YYYY-MM-DD HH-MM-SS') {
    return `${y}-${m}-${d} ${h}:${mm}:${s}`
  } else if (type === 'YYYY-MM-DD') {
    return `${y}-${m}-${d}`
  } else if (type === 'YYYY-MM') {
    return `${y}-${m}`
  } else if (type === 'HH-MM-SS') {
    return `${h}:${mm}:${s}`
  } else if (type === 'HH') {
    return `${h}`
  }
}

/**
 * 将时间转化为中文的形式：昨天 12：12，12月12日 12：12
 * @param {String | Number} date
 */
export const formatDateToZH = (date) => {
  const targetDate = new Date(date)
  const nowTime = new Date(formatDate(new Date())).getTime()
  const targetTime = new Date(formatDate(targetDate)).getTime()
  const daysAgo = (nowTime - targetTime) / 86400000
  const yearsAgo = new Date().getFullYear() - targetDate.getFullYear()
  const year = `${targetDate.getFullYear()}年`
  const monthAndDay = `${formatNumber(targetDate.getMonth() + 1)}月${formatNumber(targetDate.getDate())}日`
  const hourAndMinute = formatNumber(targetDate.getHours()) + ':' + formatNumber(targetDate.getMinutes())
  if (daysAgo < 1) {
    return hourAndMinute
  } else if (1 <= daysAgo && daysAgo < 2) {
    return `昨天 ${hourAndMinute}`
  } else if (yearsAgo < 1) {
    return monthAndDay + ' ' + hourAndMinute
  } else {
    return year + monthAndDay + ' ' + hourAndMinute
  }
}

// 格式化数字 '1' => '01'
function formatNumber(num) {
  let isNumber = isType('Number')
  if (!isNumber(num)) return
  return num >= 10 ? String(num) : '0' + String(num)
}

// 判断数据类型
function isType(type) {
  return (arg) => {
    return Object.prototype.toString.call(arg) === `[object ${type}]`
  }
}

// 生成三十天时间数组
export function lastMonth(date) {
  let res = []
  for (var i = 0; i < 30; i++) {
    res.unshift(
        {
          time: formatDate(new Date(new Date(date)
              .setDate(new Date(date).getDate() + i)), 'YYYY-MM-DD'),
          count: 0
        }
    )
  }
  return res
}

// 格式化性别
export function formatSex(val) {
  return val === 0 ? '男👨' : val === 1 ? '女👩' : '未知'
}


export function msToDay(ms, type = 'DD') {
  const days = ms / 1000 / 60 / 60 / 24
  const daysRound = Math.floor(days)
  const hours = ms / 1000 / 60 / 60 - (24 * daysRound)
  const hoursRound = Math.floor(hours)
  // const minutes = ms / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound)
  // const minutesRound = Math.floor(minutes)
  // const seconds = ms / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound)
  if (type === 'DD') {
    return `${daysRound}天`
  } else if (type === 'DD-HH') {
    return `${daysRound}天${hoursRound}小时`
  }
}

// 全屏展示
export function entryFullScreen() {
  const doc = document.documentElement
  if (doc.requestFullScreen) {
    return doc.requestFullScreen()
  } else if (doc.mozRequestFullScreen) {
    return doc.mozRequestFullScreen()
  } else if (doc.webkitRequestFullScreen) {
    return doc.webkitRequestFullScreen()
  }
}

// 取消全屏
export function exitFullScreen() {
  const doc = document
  if (doc.exitFullscreen) {
    return doc.exitFullscreen()
  } else if (doc.mozCancelFullScreen) {
    return doc.mozCancelFullScreen()
  } else if (doc.webkitCancelFullScreen) {
    return doc.webkitCancelFullScreen()
  }
}

/**token处理相关，登录token的键为authAdmin */
// 1.保存token
export function saveToken(token) {
  if (!token) return
  document.cookie = `authAdmin=${token}`
}

//2.获取token
export function getToken() {
  const cookies = document.cookie.split('; ')
  const target = (cookies.find(item => {
    return item.split('=')[0] === 'authAdmin'
  }) || '').split('=')[1]
  return target
}

//3.清除token
export function cleanToken() {
  document.cookie = "authAdmin='error'"
}

/**当前环境判断
 todo：这个函数好像不起作用：具体修改查看：https://www.jianshu.com/p/6cae10f9764c
 */
export const isDev = () => {
  return process.env.NODE_ENV === "development"
}

/**问候语，早上好、中午好... */
export const getGreetings = () => {
  const hour = new Date().getHours()
  if (hour < 6) {
    return "凌晨好！"
  } else if (hour < 9) {
    return "早上好！"
  } else if (hour < 12) {
    return "上午好！"
  } else if (hour < 14) {
    return "中午好！"
  } else if (hour < 17) {
    return "下午好！"
  } else if (hour < 19) {
    return "傍晚好！"
  } else if (hour < 22) {
    return "晚上好！"
  } else {
    return "夜里好！"
  }
}
