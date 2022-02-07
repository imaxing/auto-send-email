const axios = require('axios')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const nodemailer = require('nodemailer')
const timezone = require('dayjs/plugin/timezone')
const pass = 'wtfkpobsaazdbdja'
const user = '782254363@qq.com'
const wordApiList = ['https://api.vvhan.com/api/love', 'https://api.oddfar.com/yl/q.php?c=1001&encode=text']
const days = dayjs(new Date()).diff('2015-03-01', 'days')
dayjs.extend(utc)
dayjs.extend(timezone)

const sendEmail = async data => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: '465',
    secureConnection: true,
    auth: { user, pass }
  })

  await transporter.sendMail({
    ...data,
    html: `
      <!DOCTYPE html>
      <html lang="zh">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no, viewport-fit=cover">
        </head>
        <body style="font-size: 15px; padding: 20px 0;">
          <p style="padding: 0 20px;">${data.html}</p>
        </body>
      </html>
    `,
    from: `"${data.from}" ${user}`
  })
}

const getWord = async () => {
  const currentDate = dayjs(new Date()).format('YYYY-MM-DD')
  // 纪念日
  if (currentDate.endsWith('03-01')) {
    return {
      success: true,
      data: `
        所谓七年之痒 <br />
        不过是7年的时间经历的一些事儿<br />
        让人明白眼前这个人到底值不值得<br />
        一路走来，坎坎坷坷，有苦有乐。<br />
        因为身旁是你，我甘之如饴。<br />
        7年，是一段爱情旅程的续集，是另一个开始，一切顺利安好<br />
        吴烨小盆友，纪念日快乐！
      `
    }
  }

  if (currentDate.endsWith('01-27')) {
    return {
      success: true,
      data: `
        吴烨小盆友 <br />
        今天是我们在一起后你的第${Math.floor(days / 365)}个生日<br />
        你要天天开心<br />
        一直爱你<br />
        生日快乐!~~🎂
      `
    }
  }

  try {
    const wordApi = wordApiList[Math.floor(Math.random() * wordApiList.length)]
    const rsp = await axios.get(wordApi)
    return { success: true, data: rsp.data }
  } catch (e) {
    sendEmail({ from: '啊哦, 出错啦~', to: 'imaxing@126.com', html: e })
    return { success: false, data: e }
  }
}

const init = async () => {
  const { success, data } = await getWord()
  if (!success) return

  // 发给老婆
  sendEmail({ from: `永远爱你~我的小猪猪`, to: '1158304256@qq.com', subject: `在一起${days}天了哦`, html: data })

  // 发给自己
  sendEmail({ from: `机器人宝宝`, to: 'imaxing@126.com', subject: '今天的情话', html: data })
}

init()
