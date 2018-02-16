var util = require('./utils/util');
// 此处主机域名修改成腾讯云解决方案分配的域名

const base = util.getEnv() ? {
  serverHost: 'localhost',
  tunnelServerUrl: '',
  tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
  // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
  qcloudAppId: '1256049568',
  qcloudSecretId: 'AKIDArlBatmc1XEwcSGTrpBgzIdyRwPBcLyX',
  qcloudSecretKey: 'r6nNucfiWMC1pVq7OkeFtZJ0mmmZHqFq',
  wxMessageToken: 'weixinmsgtoken',
  networkTimeout: 30000,
  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    pass: '',
    char: 'utf8mb4'
  },

} : {
  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    pass: 'Java17131',
    char: 'utf8mb4'
  },

}
const CONF = Object.assign(base, {
  // DEVTEST
  /*

    */

  port: '5757',
  rootPathname: '',

  // 微信小程序 App ID
  appId: 'wx503ed8eb029b5a82',

  // 微信小程序 App Secret
  appSecret: '',

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: true,


  cos: {
    /**
     * 区域
     * 华北：cn-north
     * 华东：cn-east
     * 华南：cn-south
     * 西南：cn-southwest
     * 新加坡：sg
     * @see https://www.qcloud.com/document/product/436/6224
     */
    region: 'cn-south',
    // Bucket 名称
    fileBucket: 'qcloudtest',
    // 文件夹
    uploadFolder: ''
  },

  // 微信登录态有效期
  wxLoginExpires: 7200,
  wxMessageToken: 'abcdefgh'
})

console.log(CONF)

module.exports = CONF
