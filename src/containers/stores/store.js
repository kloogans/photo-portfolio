import { action, observable, decorate } from 'mobx'
import * as mobx from 'mobx'

class Store {
  access_token = null
  client_id = '02b592124d0c490f8d0d9bc56d29415f'

  authenticated = false

  instagram_data = null
  instagram_user_data = null

  average_likes = 0
  average_comments = 0
  average_engagement = 0

  engagement = {
    average_likes: 0,
    average_comments: 0,
    average_engagement: 0
  }

  async getInstagramPostData() {
    const url = `https://api.instagram.com/v1/users/self/media/recent?access_token=${this.access_token}`
    const data = await window.fetch(url)
    try {
      const insta_data = await data.json()
      if (data && insta_data) {
        this.instagram_data = insta_data
        this.getAverageRates()
        // console.log(insta_data)
        // this.finishLoading()
      }
    } catch(e) {
      console.log('ERRORERROR')
      console.error(e)
    }
  }

  getAverageRates = () => {
    const ig = mobx.toJS(this.instagram_data)
    const ig_user = mobx.toJS(this.instagram_user_data)
    const data = ig.data
    let followers = ig_user.data.counts.followed_by
    let likes = 0
    let comments = 0
    data.map(post => {
      likes = likes + Number(post.likes.count)
      comments = comments + Number(post.comments.count)
    })
    const average_likes = (Number(likes) / data.length).toFixed(0)
    const average_comments = (Number(comments) / data.length).toFixed(0)
    const average_engagement = ((average_likes + average_comments) / followers).toFixed(2)
    this.engagement = {
      average_likes: average_likes,
      average_comments: average_comments,
      average_engagement: average_engagement
    }
    // console.log('tittysex: ', average_engagement)
  }

  async getInstagramUserData() {
    const url = `https://api.instagram.com/v1/users/self?access_token=${this.access_token}`
    const data = await window.fetch(url)
    try {
      const insta_data = await data.json()
      if (data && insta_data) {
        this.instagram_user_data = insta_data
        // console.log('user: ', insta_data)
        this.finishLoading()
      }
    } catch(e) {
      console.log('ERRORERROR')
      console.error(e)
    }
  }

  handleLogout = () => {
    this.access_token = null
    this.authenticated = false
    window.localStorage.clear()
  }
}

decorate(Store, {
  authenticated: observable,
  access_token: observable,
  client_id: observable,
  instagram_data: observable,
  instagram_user_data: observable,
  engagement: observable,
  getInstagramUserData: action,
  getInstagramPostData: action
})

const store = new Store()
export default store
