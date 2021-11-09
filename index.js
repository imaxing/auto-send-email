const axios = require("axios");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

const sendEmail = require("./sendEmail");
const emailHtml = require("./emailHtml");

// 给dayjs添加时区选项
dayjs.extend(utc);
dayjs.extend(timezone);

const {
  fromDisplayText,
  fromDisplaySubText,
  user,
  to,
  startDay,
} = require("./config");

async function init() {
  try {
    // 获取one一个文案
    const wordApi = [
      "https://api.vvhan.com/api/love",
      "https://api.oddfar.com/yl/q.php?c=1001&encode=text",
    ][Math.floor(Math.random() * 2)];
    const wordRes = await axios.get(wordApi);

    // 计算日期
    const lovingDays = dayjs(dayjs().tz("Asia/Shanghai")).diff(
      startDay,
      "days"
    );

    // 发送邮件;
    sendEmail({
      from: fromDisplayText,
      to,
      subject: fromDisplaySubText,
      html: emailHtml(wordRes.data, lovingDays),
    });
    sendEmail({
      from: "邮件机器人宝宝",
      to: "imaxing@126.com",
      subject: "今天给大华宝宝的邮件内容",
      html: `<p>${wordRes.data}</p>`,
    });
  } catch (e) {
    // 发送邮件给自己提示
    sendEmail({
      from: "报错啦",
      to: user,
      subject: "定时邮件-报错提醒",
      html: e,
    });
  }
}

init();
