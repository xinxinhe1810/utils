const zeroPad = num => '00000000'.slice(String(num).length) + num

const textToBinary = username =>
  username
    .split('')
    .map(char => zeroPad(char.charCodeAt(0).toString(2)))
    .join(' ')

const binaryToZeroWidth = binary =>
  binary
    .split('')
    .map(binaryNum => {
      const num = parseInt(binaryNum, 10)
      if (num === 1) {
        return '​' // zero-width space
      }
      if (num === 0) {
        return '‌' // zero-width non-joiner
      }
      return '‍' // zero-width joiner
    })
    .join('') // zero-width no-break space

const zeroWidthToBinary = string =>
  string
    .split('')
    .map(char => {
      // zero-width no-break space
      if (char === '​') {
        // zero-width space
        return '1'
      }
      if (char === '‌') {
        // zero-width non-joiner
        return '0'
      }
      return ' ' // add single space
    })
    .join('')

const binaryToText = string =>
  string
    .split(' ')
    .map(num => String.fromCharCode(parseInt(num, 2)))
    .join('')

// 加密字符串为0宽字符
const encodeZeroWidthUserName = username => {
  const binaryUsername = textToBinary(username)
  const zeroWidthUsername = binaryToZeroWidth(binaryUsername)
  return zeroWidthUsername
}

const decodeZeroWidthUserName = zeroWidthUsername => {
  const binary = zeroWidthToBinary(zeroWidthUsername)
  const username = binaryToText(binary)
  return username
}

export {
  textToBinary,
  binaryToZeroWidth,
  zeroWidthToBinary,
  binaryToText,
  encodeZeroWidthUserName,
  decodeZeroWidthUserName,
}
