//格式化日期
function formatDate(date, style) {
  var y = date.getFullYear();
  var M = "0" + (date.getMonth() + 1);
  M = M.substring(M.length - 2);
  var d = "0" + date.getDate();
  d = d.substring(d.length - 2);
  var h = "0" + date.getHours();
  h = h.substring(h.length - 2);
  var m = "0" + date.getMinutes();
  m = m.substring(m.length - 2);
  var s = "0" + date.getSeconds();
  s = s.substring(s.length - 2);
  return style.replace('yyyy', y).replace('MM', M).replace('dd', d).replace('hh', h).replace('mm', m).replace('ss', s);
}

//与当前时间进行比较，返回格式化日期
function getDateDiff(dateTime){
  var minute = 1000 * 60;
  var hour = minute * 60;
  var now = new Date();

  if(now.toDateString() == dateTime.toDateString())
  {
    var nowtime = now.getTime();
    var diffValue = now.getTime() - dateTime.getTime();

    var hourC =diffValue/hour;
    var minC =diffValue/minute;

    var result;
    if(hourC >= 1)
    {
      result = formatDate(dateTime, 'hh:mm:ss');
    }
    else if(minC>=1){
      result=parseInt(minC) +"分钟前";// + formatDate(dateTime, 'hh:mm:ss');
    }else
    {
      result="1分钟以内";
    }
    return result;
  }
  else if(formatDate(now, 'yyyy') == formatDate(dateTime, 'yyyy'))
  {
    return formatDate(dateTime, 'MM-dd hh:mm');
  }
  else
  {
    return formatDate(dateTime, 'yyyy-MM-dd hh:mm');
  }
}

//格式化显示文件大小
function formatFilesize(fileSize, singleFractional)
{
  if(arguments[1] === undefined) singleFractional = true;
  var unitDivisors = [1073741824, 1048576, 1024, 1], unitLabels = ["GB", "MB", "KB", "B "];
  var i, unit, unitDivisor, unitLabel;
  if (fileSize === 0) {
    return "0 " + unitLabels[unitLabels.length - 1];
  }
  if (singleFractional) {
    unit = fileSize;
    //unitLabel = unitLabels.length >= unitDivisors.length ? unitLabels[unitDivisors.length - 1] : "";
    for (i = 0; i < unitDivisors.length; i++) {
      if (fileSize >= unitDivisors[i]) {
        if(i == unitDivisors.length - 1)  //Label = B
          unit = (fileSize / unitDivisors[i]).toFixed(0);
        else
          unit = (fileSize / unitDivisors[i]).toFixed(2);
        unitLabel = unitLabels[i];
        break;
      }
    }
    return unit + unitLabel;
  }
  else {
    var formattedStrings = [];
    var remainder = fileSize;
    for (i = 0; i < unitDivisors.length; i++) {
      unitDivisor = unitDivisors[i];
      unitLabel = unitLabels[i];
      unit = remainder / unitDivisor;
      if (i < unitDivisors.length -1) {
        unit = Math.floor(unit);
      } else {
        unit = unit.toFixed(0);
      }
      if (unit > 0) {
        remainder = remainder % unitDivisor;
        formattedStrings.push(unit + unitLabel);
      }
    }
    return formattedStrings.join(" ");
  }
}

//根据文件扩展名获取文件类型
var fileTypeCached = {};
function mapFileType(fileExtName)
{
  var map = {
    'archive': ['zip', 'rar', 'gz', '7z'],
    'text': ['txt', 'md'],
    'image': ['jpg', 'jpge', 'png', 'gif', 'bmp'],
    'pdf': ['pdf'],
    'css': ['css'],
    'word': ['doc', 'docx', 'rtf'],
    'excel': ['xls', 'xlsx', 'cvs'],
    'powerpoint': ['ppt', 'pptx'],
    'movie': ['mkv', 'avi', 'rmvb', 'wmv'],
    'audio': ['mp3', 'wav', 'wma'],
    'code': ['js', 'html', 'htm', 'cs', 'c', 'cpp', 'java', 'ts', 'css', 'aspx'],
  };
  var result =  fileTypeCached[fileExtName];
  if (!result) {
    for (var key in map) {
      if (_.include(map[key], fileExtName)) {
        fileTypeCached[fileExtName] = result = key;
        break;
      }
    }
  }
  result = result ? result : '';
  return result;
}
