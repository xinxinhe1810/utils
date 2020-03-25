export default class Enum {
  constructor(...items) {
    // eslint-disable-next-line no-underscore-dangle
    this.__items = items

    items.forEach(({alias, text, value}) => {
      this[alias] = {text, value}
    })
  }

  items() {
    // eslint-disable-next-line no-underscore-dangle
    return this.__items.map(({text, value, alias}) => ({text, value, alias}))
  }

  alias2Text = alias => this[alias].text

  alias2Value = alias => this[alias].value

  value2Text = value => {
    // eslint-disable-next-line no-underscore-dangle
    const result = this.__items.find(({value: val}) => val === value)
    if (!result) {
      return ''
    }

    return result.text
  }

  text2Value = text => {
    // eslint-disable-next-line no-underscore-dangle
    const result = this.__items.find(({text: txt}) => txt === text)
    if (!result) {
      return null
    }

    return result.value
  }
}
