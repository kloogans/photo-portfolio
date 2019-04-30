import store from '../stores/store'
import toggleAction from './toggleActions'
import { action, decorate } from 'mobx'

class HandlerActions {
  handleFullImageUrlOnLoad = () => {
    const path = window.location.pathname,
          id = path.replace(/^(?:\/\/|[^/]+)*\/[^/]+\//,""),
          data = store.instagram.data,
          posts = data.data
    let index
    if (posts) index = posts.map(p => p.id).indexOf(id)
    if (id.length > 1 && index >= 0) toggleAction.toggleFullImageCarousel(index)
    return id
  }

  handlePagination = direction => {
    if (direction === 'next' && store.full_image.index <= store.instagram.data.data.length - 1) {
      if (store.full_image.index === store.instagram.data.data.length - 1) store.full_image.index = 0
      store.full_image.index++
    }

    if (direction === 'previous' && store.full_image.index >= 0) {
      if (store.full_image.index === 0) store.full_image.index = store.instagram.data.data.length - 1
      store.full_image.index--
    }
  }

  handleChangeCurrentPage = (page, color) => {
    store.current_page = {
      name: page,
      color: color
    }
  }

  handleFinishLoading = () => {
    store.loading_complete = true
    setTimeout(() => {
      store.loading = false
    }, 500)
  }

  handleScroll = () => {
    const distance_Y = window.pageYOffset || document.documentElement.scrollTop,
          shrink_on = 7
    if (distance_Y > shrink_on) {
      store.shrink_logo = true
    } else {
      store.shrink_logo = false
    }
  }

  handleNumberFormat = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

}

decorate(HandlerActions, {
  handleFullImageUrlOnLoad: action,
  handlePagination: action,
  handleChangeCurrentPage: action,
  handleFinishLoading: action,
  handleScroll: action,
  handleNumberFormat: action
})

const handlerAction = new HandlerActions()
export default handlerAction
