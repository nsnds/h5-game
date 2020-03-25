(function() {
  let Utils = function() {
  }

  window.Utils = Utils

  /**
   * 四舍五入保留num位小数
   * @param v
   * @param num 保留位数
   * @param isZeroFill 默认补0；false-不补
   * @returns {*}
   */
  Utils.prototype.round = function(v, num, isZeroFill) {
    if (num === undefined) num = 2

    let f = parseFloat(v)
    if (isNaN(f)) return false
    f = Math.round(v * Math.pow(10, num)) / Math.pow(10, num)

    if (!isZeroFill) {
      return f
    }

    // 转 string
    let s = f.toString()
    let rs = s.indexOf('.')
    if (num > 0 && rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + num) {
      s += '0'
    }
    return s
  }
})()