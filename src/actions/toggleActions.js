import store from '../stores/store'
import { action, decorate } from 'mobx'

class ToggleActions {
  toggleFullImageCarousel = i => {
    if (store.close_full) {
      store.close_full = false
      store.full_image = {
        is_active: true,
        index: i
      }
    } else {
      store.close_full = true
      setTimeout(() => {
        store.full_image = {
          is_active: false,
          index: 0
        }
      }, 300)
    }
  }

  togglePopover = () => store.popover.is_active = !store.popover.is_active
}

decorate(ToggleActions, {
  toggleFullImageCarousel: action,
  togglePopover: action
})

const toggleAction = new ToggleActions()
export default toggleAction
