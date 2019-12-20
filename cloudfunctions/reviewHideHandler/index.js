const cloud = require('wx-server-sdk')

cloud.init()
const versionList = {
  'v1.1.4': false,
};
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('版本号: ', event.version);
  return {
    review: versionList[event.version]
  };
}