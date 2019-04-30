import store from '../stores/store'
import handlerAction from './handlerActions'
import { action, decorate } from 'mobx'

class DataActions {
  async getInstagramFeed() {
    const url = `https://api.instagram.com/v1/users/self/media/recent?access_token=${store.access_token}`,
          data = await fetch(url)
    try {
      const insta_data = await data.json()
      if (insta_data) {
        if (insta_data.meta.code === 400) {
          store.loading = true
          store.loading_complete = false
        }
        store.instagram.data = insta_data
        handlerAction.handleFinishLoading()
        handlerAction.handleFullImageUrlOnLoad()
      }
    } catch(e) {
      console.error(e)
    }
  }

  async getInstagramUserData() {
    const url = `https://api.instagram.com/v1/users/self?access_token=${store.access_token}`,
          data = await fetch(url)
    try {
      const insta_data = await data.json()
      store.instagram_user = await insta_data
      store.instagram.user = await insta_data
    } catch(e) {
      console.error(e)
    }
  }
}

decorate(DataActions, {
  getInstagramFeed: action,
  getInstagramUserData: action
})

const dataAction = new DataActions()
export default dataAction
