function warm() {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(Math.floor(Math.random() * 128 + 64));
    arr.push(Math.floor(Math.random() * 128 + 128));
  }
  const [r, g, b] = arr;
  return `#${
    r.toString(16).length > 1 ? r.toString(16) : "0" + r.toString(16)
  }${g.toString(16).length > 1 ? g.toString(16) : "0" + g.toString(16)}${
    b.toString(16).length > 1 ? b.toString(16) : "0" + b.toString(16)
  }`;
}

module.exports = function (word, lovingDays) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no, viewport-fit=cover">
    </head>
    <body style="font-size: 14px; padding: 20px 0;color: ${warm()};">
        <div style="text-align: left;margin-top: 30px;">『</div>
        <p style="text-align: center;padding: 0 20px;">${word}</p>
        <div style="text-align: right;">』</div>
        <div style="text-align: center;margin-top: 60px;color: ${warm()};">在一起的的第${lovingDays}天, 永远爱你~我的小猪猪</div>
    </body>
  </html>
  `;
};
