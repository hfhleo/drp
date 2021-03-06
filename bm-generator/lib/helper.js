import Storage from '@flyme/coffee-storage/src/index'

const _pageStorageKey = '__drp_popover_storage'

const helper = {

  isPureObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]'
  },

  isString(val) {
    return typeof val === 'string'
  },

  isUndef(val) {
    return typeof val === 'undefined'
  },

  isStringNumber(val) {
    return /^[0-9]+.?[0-9]*$/.test(val)
  },

  isEmptyValue(val) {
    let r = false

    if (Array.isArray(val)) {
      val.forEach((v) => {
        if (!v) r = true
      })
    } else if (!val) {
      r = true
    }

    return r
  },

  getDateRange(type = 'week', notIncludeToday = false) {
    const end = new Date()
    const start = new Date()
    const day = 3600 * 1000 * 24

    switch (type) {
      case 'today':
        break
      case 'yesterday':
        start.setTime(start.getTime() - day)
        end.setTime(end.getTime() - day)
        break
      case 'month':
        if (notIncludeToday) {
          start.setTime(start.getTime() - (day * 30))
          end.setTime(end.getTime() - (day * 1))
        } else {
          start.setTime(start.getTime() - (day * 29))
        }
        break
      case 'year':
        if (notIncludeToday) {
          start.setTime(start.getTime() - (day * 365))
          end.setTime(end.getTime() - (day * 1))
        } else {
          start.setTime(start.getTime() - (day * 364))
        }
        break
      case 'week':
        if (notIncludeToday) {
          start.setTime(start.getTime() - (day * 7))
          end.setTime(end.getTime() - (day * 1))
        } else {
          start.setTime(start.getTime() - (day * 6))
        }
        break
      case 'twoWeek':
        if (notIncludeToday) {
          start.setTime(start.getTime() - (day * 14))
          end.setTime(end.getTime() - (day * 1))
        } else {
          start.setTime(start.getTime() - (day * 13))
        }
        break
      default:
        console.error(`不存在时间段type: ${type}`)
        start.setTime(start.getTime() - (day * 6))
        break
    }

    return [start, end]
  },

  getDate(type = 'today', date = new Date()) {
    const day = 3600 * 1000 * 24

    switch (type) {
      case 'yesterday':
        date.setTime(date.getTime() - day)
        break
      case 'last_week':
        date.setDate(date.getDate() - 7)
        break
      case 'last_month':
        date.setMonth(date.getMonth() - 1)
        break
      case 'today':
      case 'this_week':
      case 'this_month':
      default:
        break
    }

    return date
  },

  execStringExpression(expr, info) {
    let exprF = expr.replace(/\$\{([^}]+)\}/g, '${this[\'$1\'] || \'\'}')
    const fn = new Function(`return \`${exprF}\``).bind(info || {})
    try {
      return  fn()
    } catch(e) { console.log(e); }
    return ''
  },

  /* eslint-disable no-param-reassign */
  formatDate(source, format = 'yyyy-MM-dd', type = 'string') {
    let date = new Date()
    if (typeof source === 'string') source = this.getDateTime(source)
    if (typeof source === 'number') date = new Date(source)
    if (typeof source === 'object') date = source
    if (type == 'number') {
      return date.getTime()
    }

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const miniute = date.getMinutes()
    const second = date.getSeconds()
    return format.replace('yyyy', year)
                  .replace('MM', month)
                  .replace('dd', day)
                  .replace('HH', hour)
                  .replace('mm', miniute)
                  .replace('ss', second)
                  .replace(/\b\d{1}\b/g, '0$&')
  },
  /* eslint-enable no-param-reassign */

  getDateTime(source) {
    let time = ''
    if (Object.prototype.toString.call(source) == '[object Date]') {
      time = source.getTime()
    } else {
      time = new Date(source.replace(/-/g, '/')).getTime()
    }
    return time
  },

  convertMapToArray(source, labelName = 'label', valueName = 'value') {
    return Object.keys(source)
                  .map(prop => ({
                    [labelName]: source[prop],
                    [valueName]: prop,
                  }))
  },

  getDropDownLabel(value, items) {
    const item = items.find(p => p.value == value)
    return item ? item.name : ''
  },

  /* eslint-disable no-param-reassign */
  correct(source, target) {
    Object.keys(source).forEach((prop) => {
      if (helper.isUndef(target[prop])) {
        target[prop] = source[prop]
      } else if (helper.isPureObject(target[prop])) {
        helper.correct(source[prop], target[prop])
      }
    })
  },
  /* eslint-enable no-param-reassign */

  seriliseParams(params) {
    return Object.keys(params).map(key =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
              .join('&')
  },

  makeParams(params, data = {}) {
    let result = {}

    if (helper.isPureObject(params)) {
      result = params
    } else if (Array.isArray(params)) {
      params.forEach((param) => {
        if (typeof param === 'string') {
          result[param] = data[param]
        } else if (helper.isPureObject(param)) {
          if ('value' in param) {
            result[param.name] = data[param.value]
          } else if ('raw' in param) {
            result[param.name] = param.raw
          }
        }
      })
    }

    return result
  },

  handleResponse(res, sucFn, errFn) {
    if (res.code === 200) {
      sucFn()
    } else {
      errFn()
    }
  },

  /* eslint-disable no-param-reassign */
  assign(target, ...args) {
    args.forEach((arg) => {
      Object.keys(arg).forEach((prop) => {
        if (typeof arg[prop] === 'object') {
          if (Array.isArray(arg[prop])) {
            target[prop] = [].concat([], arg[prop])
          } else if (helper.isPureObject(arg[prop])) {
            target[prop] = Object.assign(target[prop] || {}, arg[prop])
          } else {
            target[prop] = arg[prop]
          }
        } else {
          target[prop] = arg[prop]
        }
      })
    })
    return target
  },
  /* eslint-disable no-param-reassign */

  getValueByPath(object, prop) {
    if (!prop) return ''
    prop = prop || ''
    const paths = prop.split('.')
    let current = object
    let result = null
    let path = null
    while ((path = paths.shift()) && current) {
      current = current[path]
    }
    if(paths.length == 0) {
      result = current;
    }
    return result
  },

  formatData(data, type, format="yyyy-MM-dd") {
    switch (type) {
      case 'time':
      case 'date':
        data = this.formatDate(data, format)
        break;
      case 'float':
        data = Number(data)
        data = isNaN(data) ? '' : data.toFixed(2)
        break;
      default:
    }
    return data
  },

  textParse(val, query) {
    return val.replace(/(\{(\w+)\})/g, (match, p1, p2) => {
      return query[p2];
    })
  },

  jsonParse(source, defaultValue = []) {
    if (typeof source === 'string') {
      source = source ? JSON.parse(source) : defaultValue
    }
    return source
  },

  checkRequestResultMessage(context, res, successMessage = '') {
    if (res && res.code == 200) {
      if (successMessage) {
        context.$message({
          message: res.message || successMessage,
          type: 'success',
        })
      }
      return true
    } else {
      if (res && res.code == 110003) {
        context.$message({
          message: res.message || '无权限访问',
          type: 'error',
        })
      } else if (typeof res != 'undefined'){
        context.$message.error(res ? (res.message || '接口报错') : '接口报错');
      }
    }
    return false
  },


  filterEmptyParams(params) {
    return Object.keys(params).reduce((c, p) => {
      if (params[p] !== '' && params[p] !== null) {
        if (Array.isArray(params[p])) {
          params[p].forEach((item, i) => {
            if (typeof item == 'object') {
              for (let k in item) {
                c[`${p}[${i}].${k}`] = item[k]
              }
            } else {
              c[`${p}[${i}]`] = item
            }
          })
        } else {
          c[p] = params[p]
        }

      }
      return c
    }, {})
  },

  getPageUrl(resource) {
    if (isNaN(resource)) {
      return resource
    }
    return `/page/${resource}`
  },

  percent(val) {
    let v = val
    if (typeof v !== 'number') v = parseFloat(v)
    if (isNaN(v)) return ''
    return `${(v * 100).toFixed(2)}%`
  },

  storage: new Storage({
    key: _pageStorageKey,
  })
}

export default helper
