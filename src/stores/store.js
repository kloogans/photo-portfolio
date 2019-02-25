import { observable, decorate, action } from 'mobx'
import * as mobx from 'mobx'
import IG_ACCESS_TOKEN from './keys'

class Store {
  loading = true
  loading_complete = false

  instagram = null
  instagram_user = null

  full_image = {
    is_active: false,
    index: 0
  }

  shrink = false

  close_full = true

  current_page = {
    name: 'photos',
    color: '#202B36'
  }

  popover = {
    is_active: false,
    selected_preset: {}
  }

  access_token = IG_ACCESS_TOKEN

  async getInstaData() {
    const url = `https://api.instagram.com/v1/users/self/media/recent?access_token=${this.access_token}`,
          data = await window.fetch(url)
    try {
      const insta_data = await data.json()
      if (insta_data.meta.code === 400) {
        this.loading = true
        this.loading_complete = false
      }
      this.instagram = insta_data
      this.finishLoading()
      this.detectUrlWithImage()
    } catch(e) {
      console.error(e)
    }
  }

  async getSelfData() {
    const url = `https://api.instagram.com/v1/users/self?access_token=${this.access_token}`,
          data = await window.fetch(url)
    try {
      const insta_data = await data.json()
      this.instagram_user = await insta_data
    } catch(e) {
      console.error(e)
    }
  }

  // If the URL contains a valid image ID, toggle the full image slider
  detectUrlWithImage = () => {
    const path = window.location.pathname,
          id = path.replace(/^(?:\/\/|[^/]+)*\/[^/]+\//,""),
          data = mobx.toJS(this.instagram),
          posts = data.data
    let index
    if (posts) index = posts.map(p => p.id).indexOf(id)
    if (id.length > 1 && index >= 0) this.openFullImage(index)
  }

  openFullImage = i => {
    this.close_full = false
    this.full_image = {
      is_active: true,
      index: i
    }
  }

  closeFullImage = () => {
    this.close_full = true
    setTimeout(() => {
      this.full_image = {
        is_active: false,
        index: 0
      }
    }, 300)
  }

  pagination = direction => {
    if (direction === 'next' && this.full_image.index <= this.instagram.data.length - 1) {
      if (this.full_image.index === this.instagram.data.length - 1) this.full_image.index = 0
      this.full_image.index++
    }

    if (direction === 'previous' && this.full_image.index >= 0) {
      if (this.full_image.index === 0) this.full_image.index = this.instagram.data.length - 1
      this.full_image.index--
    }
  }

  finishLoading = () => {
    this.loading_complete = true
    setTimeout(() => {
      this.loading = false
    }, 500)
  }

  changeCurrentPage = (page, color) => {
    this.current_page = {
      name: page,
      color: color
    }
  }

  handleScroll = () => {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
          shrinkOn = 7
    if (distanceY > shrinkOn) {
      this.shrink = true
    } else {
      this.shrink = false
    }
  }

  formatNum = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  togglePopover = () => {
    console.log('toggle')
    this.popover.is_active = !this.popover.is_active
  }

}

decorate(Store, {
  history: observable,
  loading: observable,
  instagram: observable,
  instagram_user: observable,
  full_image: observable,
  close_full: observable,
  shrink: observable,
  current_page: observable,
  popover: observable,
  pushNewRoute: action,
  getInstaData: action,
  getSelfData: action,
  openFullImage: action,
  closeFullImage: action,
  pagination: action,
  scrollTop: action,
  changeCurrentPage: action,
  handleScroll: action,
  formatNum: action,
  togglePopover: action
})

const store = new Store()
export default store
