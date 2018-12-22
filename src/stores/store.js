import { observable, decorate, action } from 'mobx'

class Store {
  loading = true
  loading_complete = false

  instagram = null
  instagram_user = null

  full_image = {
    is_active: false,
    index: 0
  }

  close_full = true

  async getInstaData() {
    const url = `https://api.instagram.com/v1/users/self/media/recent?access_token=2140277165.02b5921.39d4557f19714d30ab31573fd0af1b1d`
    const data = await window.fetch(url)
    try {
      const insta_data = await data.json()
      if (data && insta_data) this.instagram = insta_data
    } catch(e) {
      console.log('ERRORERROR')
      console.error(e)
    }
  }

  async getSelfData() {
    const url = `https://api.instagram.com/v1/users/self?access_token=2140277165.02b5921.39d4557f19714d30ab31573fd0af1b1d`
    const data = await window.fetch(url)
    try {
      const insta_data = await data.json()
      this.instagram_user = await insta_data
    } catch(e) {
      console.log('ERRORERROR')
      console.error(e)
    }
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
    console.log(this.instagram.data.length - 1)
  }

  finishLoading = () => {
    this.loading_complete = true
    setTimeout(() => {
      this.loading = false
    }, 500)
  }


}

decorate(Store, {
  loading: observable,
  instagram: observable,
  instagram_user: observable,
  full_image: observable,
  close_full: observable,
  getInstaData: action,
  getSelfData: action,
  openFullImage: action,
  closeFullImage: action,
  pagination: action
})

const store = new Store()
export default store
