export const mailerConfig = {
  host: process.env.SMTP_SERVER, // 更改为你的SMTP服务器地址
  port: parseInt(process.env.SMTP_PORT, 10), // SMTP端口，587通常用于TLS
  secure: false, // 如果端口为465，设置为true；否则设置为false
  auth: {
    user: process.env.MAIL_USER, // 你的邮箱用户名
    pass: process.env.MAIL_PASS, // 你的邮箱密码
  },
  tls: {
    ciphers: 'SSLv3',
  },
};
