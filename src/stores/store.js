import { observable, decorate, action } from 'mobx'

class Store {
  loading = false

  instagram = null

  full_image = {
    is_active: false,
    index: 0
  }

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

  openFullImage = i => {
    this.full_image = {
      is_active: true,
      index: i
    }
  }

  closeFullImage = () => {
    this.full_image = {
      is_active: false,
      index: 0
    }
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


}

decorate(Store, {
  loading: observable,
  instagram: observable,
  full_image: observable,
  getInstaData: action,
  openFullImage: action,
  closeFullImage: action,
  pagination: action
})

const store = new Store()
export default store
