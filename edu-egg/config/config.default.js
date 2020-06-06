/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.security = {
    csrf: false
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1591175056811_4313';
  config.cors = {//cors组件 跨域解除
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '47.107.146.72',
      // 端口号
      port: '3306',
      // 用户名
      user: 'edu',
      // 密码
      password: '123456',
      // 数据库名
      database: 'edu',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.cluster = {
    listen: {
      port: 7020,
    }
  };
  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
