/*

申明：部分函数方法来源于TimeCard.js，其原始作者@smartmimi
原脚本：https://raw.githubusercontent.com/smartmimi/conf/master/surge/timecard.js
原脚本作者：@smartmimi 
GitHub：https://github.com/smartmimi/conf/tree/master

修改：TributePaulWalker
Surge：

[Panel]
节假提醒 = script-name=节假提醒,update-interval=3600

[Script]
节假提醒 = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/TributePaulWalker/Profiles/main/JavaScript/Surge/Timecard.js
 
 */
var tlist = {
  1: ["情人节", "2023-02-14"],
  2: ["龙抬头", "2023-02-21"],
  3: ["惊蛰", "2023-03-06"],
  4: ["妇女节", "2023-03-08"],
  5: ["春分", "2023-03-21"],
  6: ["愚人节", "2023-04-01"],
  7: ["清明", "2023-04-05"],
  8: ["谷雨", "2023-04-20"],
  9: ["劳动", "2023-05-01"],
  10: ["青年节", "2023-05-04"],
  11: ["立夏", "2023-05-06"],
  12: ["母亲节", "2023-05-14"],
  13:["李丹生日", "2023-05-17"],
  14: ["520", "2023-05-20"],
  15: ["小满", "2023-05-21"], 
  16: ["儿童节", "2023-06-01"],
  17: ["芒种", "2023-06-06"],
  18: ["父亲节", "2023-06-18"],
  19: ["夏至", "2023-06-21"],
  20: ["端午", "2023-06-22"],
  21: ["小暑", "2023-07-07"],
  22: ["大暑", "2023-07-23"],
  23: ["立秋", "2023-08-08"],
  24: ["龚宇轩生日", "2023-08-20"],
  25: ["七夕", "2023-08-22"],
  26: ["处暑", "2023-08-23"],
  27: ["白露", "2023-09-08"],
  28: ["妈妈生日", "2023-09-10"],
  29: ["教师节", "2023-09-10"],
  30: ["秋分", "2023-09-23"],
  31: ["中秋", "2023-09-29"],
  32: ["国庆", "2023-10-01"],
  33: ["寒露", "2023-10-08"],
  34: ["重阳节", "2023-10-23"],
  35: ["刘玲芝生日", "2023-10-23"],
  36: ["霜降", "2023-10-24"],
  37: ["万圣节前夜", "2023-10-31"],
  38: ["万圣节", "2023-11-01"],
  39: ["立冬", "2023-11-08"],
  40: ["龚伟红的生日", "2023-11-17"],
  41: ["小雪", "2023-11-22"],
  42: ["感恩节", "2022-11-23"],
  43: ["大雪", "2023-12-07"],
  44: ["冬至", "2023-12-22"],
  45: ["平安夜", "2023-12-24"],
  46: ["圣诞节", "2023-12-25"],
  47: ["元旦", "2024-01-01"],
  48: ["小寒", "2024-01-06"],
  49: ["腊八", "2024-01-18"],
  50: ["大寒", "2024-01-20"],
  51: ["吴平生日", "2024-01-23"],
  52: ["小年", "2024-02-02"],
  53: ["立春", "2022-02-04"],
  54: ["除夕", "2024-02-09"],
  55: ["春节", "2024-02-10"],
  56: ["情人节", "2024-02-14"],
  57: ["雨水", "2024-02-19"],
  58: ["结婚纪念日26周年", "2024-02-21"],
  59: ["元宵节", "2024-02-24"],
  60: ["惊蛰", "2024-03-05"],
  61: ["妇女节", "2024-03-08"],
  62: ["龙抬头", "2024-03-11"],
  63: ["植树节", "2024-03-12"],
  64: ["消费者权益日", "2024-03-15"],
  65: ["春分", "2024-03-20"],
  66: ["愚人节", "2024-04-01"],
  67: ["清明节", "2024-04-04"],
  68: ["谷雨", "2024-04-19"],
  
};
let tnow = new Date();
let tnowf =
  tnow.getFullYear() + "-" + (tnow.getMonth() + 1) + "-" + tnow.getDate();

/* 计算2个日期相差的天数，不包含今天，如：2016-12-13到2016-12-15，相差2天
 * @param startDateString
 * @param endDateString
 * @returns
 */
function dateDiff(startDateString, endDateString) {
  var separator = "-"; //日期分隔符
  var startDates = startDateString.split(separator);
  var endDates = endDateString.split(separator);
  var startDate = new Date(startDates[0], startDates[1] - 1, startDates[2]);
  var endDate = new Date(endDates[0], endDates[1] - 1, endDates[2]);
  return parseInt(
    (endDate - startDate) / 1000 / 60 / 60 / 24
  ).toString();
}

//计算输入序号对应的时间与现在的天数间隔
function tnumcount(num) {
  let dnum = num;
  return dateDiff(tnowf, tlist[dnum][1]);
}

//获取最接近的日期
function now() {
  for (var i = 1; i <= Object.getOwnPropertyNames(tlist).length; i++) {
    if (Number(dateDiff(tnowf, tlist[i.toString()][1])) >= 0) {
      //console.log("最近的日期是:" + tlist[i.toString()][0]);
      //console.log("列表长度:" + Object.getOwnPropertyNames(tlist).length);
      //console.log("时间差距:" + Number(dateDiff(tnowf, tlist[i.toString()][1])));
      return i;
    }
  }
}

//如果是0天，发送emoji;
let nowlist = now();
function today(day) {
  let daythis = day;
  if (daythis == "0") {
    datenotice();
    return "🎉";
  } else {
    return daythis;
  }
}

//提醒日当天发送通知
function datenotice() {
  if ($persistentStore.read("timecardpushed") != tlist[nowlist][1] && tnow.getHours() >= 6) {
    $persistentStore.write(tlist[nowlist][1], "timecardpushed");
    $notification.post("假日祝福","", "今天是" + tlist[nowlist][1] + "日 " + tlist[nowlist][0] + "   🎉")
  } else if ($persistentStore.read("timecardpushed") == tlist[nowlist][1]) {
    //console.log("当日已通知");
  }
}
$done({
title:"节假提醒",
icon:"list.dash.header.rectangle",
'icon-color': "#5AC8FA",
content:tlist[nowlist][0]+"  :  "+today(tnumcount(nowlist))+"天\n"+tlist[Number(nowlist) + Number(1)][0] +"  :  "+ tnumcount(Number(nowlist) + Number(1))+ "天\n"+tlist[Number(nowlist) + Number(2)][0]+"  :  "+tnumcount(Number(nowlist) + Number(2))+"天"
})
