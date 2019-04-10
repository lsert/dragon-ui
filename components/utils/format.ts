
/* eslint-disable */
export default {

  // 格式化日期
  date(date: Date | string | number, fmt: string) {
    if (!date || !fmt) {
      return '';
    }

    let dateObj: Date;
    // 判断是否为 Date 对象
    if (!(Object.prototype.toString.call(date) === '[object Date]')) {
      dateObj = new Date(date.toString().replace(/-/g, '/'));
    } else {
      dateObj = date as Date;
    }

    const o = {
      'M+': dateObj.getMonth() + 1, // 月份
      'd+': dateObj.getDate(), // 日
      'h+': dateObj.getHours(), // 小时
      'm+': dateObj.getMinutes(), // 分
      's+': dateObj.getSeconds(), // 秒
      'q+': Math.floor((dateObj.getMonth() + 3) / 3), // 季度
      S: dateObj.getMilliseconds(), // 毫秒
    };

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (`${dateObj.getFullYear()}`).substr(4 - RegExp.$1.length));
    }
    let k: keyof typeof o;
    for (k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(RegExp.$1,
          (RegExp.$1.length === 1) ? (String(o[k])) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
      }
    }
    return fmt;
  },

  // 验证日期格式
  validate(date: string, fmt: string) {
    if (!date || !fmt) {
      return false;
    }

    const sep = /-/.test(fmt) ? '-' : '/';
    fmt = fmt.replace(/[yMdhms]/g, '\\d').replace(/(-|\/)/g, `\\${sep}`);

    return new RegExp(`^${fmt}$`).test(date);
  },

  // 将数字转成日期格式
  transform(num: string, fmt: string) {
    const sep = /-/.test(fmt) ? '-' : '/';
    fmt = fmt.replace(/-|\//g, '');

    if (num.length !== fmt.length || !/^\d+$/.test(num)) {
      return num;
    }
    if (/^(y+)(M+)(d+)$/.test(fmt)) {
      let date = '';
      date += `${num.substr(0, RegExp.$1.length)}${sep}`;
      date += `${num.substr(RegExp.$1.length, RegExp.$2.length)}${sep}`;
      date += `${num.substr(RegExp.$1.length + RegExp.$2.length, RegExp.$3.length)}`;
      return date;
    }
  },

  // 判断日期是否在有效范围内
  inrange(date: string, fmt: string) {
    const sep = /-/.test(fmt) ? '-' : '/';
    const parts = date.split(sep);

    const month = Number(parts[1]);
    const day = Number(parts[2]);
    const maxs = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];

    if (month < 1 || month > 12) {
      return false;
    }
    if (day < 1 || day > maxs) {
      return false;
    }
    return true;
  },
};
