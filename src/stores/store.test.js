import store from './store'

describe('formatting a number', () => {
  test('formatNum', () => {
      const formatted_num = store.formatNum(Math.floor((Math.random() + 2) * 10000))
      expect(typeof formatted_num).toBe('string')
      expect(formatted_num).toContain(',')
    }
  )
})

describe('detect full image popover from url', () => {
  test('detectUrlWithImage', () => {
    if (store.full_image.is_active) {
      console.log(store.detectUrlWithImage())
      expect(store.detectUrlWithImage).toBeTruthy()
    }
  })
})
