import { observable, decorate } from 'mobx'
import { IG_ACCESS_TOKEN } from './keys'

class Store {
  loading = true
  loading_complete = false

  instagram = {
    data: null,
    user: null
  }

  close_full = true
  full_image = {
    is_active: false,
    index: 0
  }

  shrink_logo = false

  current_page = {
    name: 'photos',
    color: '#202B36'
  }

  popover = {
    is_active: false,
    selected_preset: {}
  }

  access_token = IG_ACCESS_TOKEN
}

decorate(Store, {
  loading: observable,
  loading_complete: observable,
  instagram: observable,
  full_image: observable,
  close_full: observable,
  shrink_logo: observable,
  current_page: observable,
  popover: observable
})

const store = new Store()
export default store
