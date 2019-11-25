export const rich = function (str) {
  let arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
  str = str.replace(/\\"/g, '"');
  str = str.replace(/\n/g, '');
  str = str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
  str = str.replace(/tp=webp(&?)/g, ''); // ios不支持webp图片
  str = str.replace(/<(img).*?(\/>|<\/img>|>)/g, function (s) { // 给所有img标签加上max-width:100%的限制
    if (s.indexOf('style') < 0) {
      return s.replace(/<\s*img/, '<img style="max-width:100%;"');
    } else {
      return s.replace(/style=("|')/, 'style=$1max-width:100%;');
    }
  });
  str = str.replace(/<section/g, '<div');
  str = str.replace(/section>/g, 'div>');
  return '<div>' + str + '</div>';
};