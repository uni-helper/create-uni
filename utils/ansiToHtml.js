function ansiToHtml(ansiString) {
  // 定义ANSI转义码到HTML的映射
  // eslint-disable-next-line no-control-regex
  const ansiRegex = /\u001B\[(3\d|4[0-7])m|\u001B\]8;;(.*?)\u0007/g
  const ansiToHtmlMap = {
    32: 'color: green;',
    39: 'color: initial;', // 复位前景色
    31: 'color: red;',
    34: 'color: blue;',
    33: 'color: yellow;',
    35: 'color: magenta;',
    36: 'color: cyan;',
    37: 'color: white;',
    40: 'background-color: black;',
    41: 'background-color: red;',
    42: 'background-color: green;',
    43: 'background-color: yellow;',
    44: 'background-color: blue;',
    45: 'background-color: magenta;',
    46: 'background-color: cyan;',
    47: 'background-color: white;',
  }

  let htmlString = ''
  let lastIndex = 0

  ansiString.replace(ansiRegex, (match, p1, p2, offset) => {
    htmlString += ansiString.slice(lastIndex, offset)

    if (p2) {
      htmlString += `<a href="${p2}">`
    }
    else if (p1.startsWith('3')) {
      htmlString += `<span style="${ansiToHtmlMap[p1]}">`
    }
    else if (p1.startsWith('4')) {
      htmlString += `<span style="${ansiToHtmlMap[p1]}">`
    }
    else if (match === '\u0007') {
      htmlString += '</a>'
    }
    else if (match === '\u001B[39m') {
      htmlString += '</span>'
    }

    lastIndex = offset + match.length
  })

  htmlString += ansiString.slice(lastIndex)
  return htmlString
}

// 示例用法
const ansiString = '\u001B]8;;https://github.com/uni-helper\u0007\u001B[32mUni Helper\u001B[39m\u001B]8;;\u0007维护的快速启动模板'
const htmlString = ansiToHtml(ansiString)
console.log(htmlString) // 输出: <a href="https://github.com/uni-helper"><span style="color: green;">Uni Helper</span></a>维护的快速启动模板
