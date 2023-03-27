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
  12: ["生日", "2023-05-09"],
  13: ["母亲节", "2023-05-14"],
  14: ["520", "2023-05-20"],
  15: ["小满", "2023-05-21"], 
  16: ["李丹生日", "2023-05-17"],
  17: ["儿童节", "2023-06-01"],
  18: ["芒种", "2023-06-06"],
  19: ["父亲节", "2023-06-18"],
  20: ["夏至", "2023-06-21"],
  21: ["端午", "2023-06-22"],
  22: ["小暑", "2023-07-07"],
  23: ["大暑", "2023-07-23"],
  24: ["立秋", "2023-08-08"],
  25: ["龚宇轩生日", "2023-08-20"],
  26: ["七夕", "2023-08-22"],
  27: ["处暑", "2023-08-23"],
  28: ["白露", "2023-09-08"],
  29: ["妈妈生日", "2023-09-10"],
  30: ["教师节", "2023-09-10"],
  31: ["秋分", "2023-09-23"],
  32: ["中秋", "2023-09-29"],
  33: ["国庆", "2023-10-01"],
  34: ["寒露", "2023-10-08"],
  35: ["重阳节", "2023-10-23"],
  36: ["刘玲芝生日", "2023-10-23"],
  37: ["霜降", "2023-10-24"],
  38: ["万圣节前夜", "2023-10-31"],
  39: ["万圣节", "2023-11-01"],
  40: ["立冬", "2023-11-08"],
  41: ["我的生日", "2023-11-17"],
  42: ["小雪", "2023-11-22"],
  43: ["感恩节", "2022-11-23"],
  44: ["大雪", "2023-12-07"],
  45: ["冬至", "2023-12-22"],
  46: ["平安夜", "2023-12-24"],
  47: ["圣诞节", "2023-12-25"],
  48: ["元旦", "2024-01-01"],
  49: ["小寒", "2024-01-06"],
  50: ["腊八", "2024-01-18"],
  51: ["大寒", "2024-01-20"],
  52: ["老婆生日", "2024-01-23"],
  53: ["小年", "2024-02-02"],
  54: ["立春", "2022-02-04"],
  55: ["除夕", "2024-02-09"],
  56: ["春节", "2024-02-10"],
  57: ["情人节", "2024-02-14"],
  58: ["雨水", "2024-02-19"],
  59: ["结婚纪念日26周年", "2024-02-21"],
  60: ["元宵节", "2024-02-24"],
  61: ["惊蛰", "2024-03-05"],
  62: ["妇女节", "2024-03-08"],
  63: ["龙抬头", "2024-03-11"],
  64: ["植树节", "2024-03-12"],
  65: ["消费者权益日", "2024-03-15"],
  66: ["春分", "2024-03-20"],
  67: ["愚人节", "2024-04-01"],
  68: ["清明节", "2024-04-04"],
  69: ["谷雨", "2024-04-19"],
  
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
