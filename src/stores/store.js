import { observable, decorate, action } from 'mobx'

class Store {
  loading = false

  instagram = null

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


}

decorate(Store, {
  loading: observable,
  instagram: observable,
  getInstaData: action
})

const store = new Store()
export default store
