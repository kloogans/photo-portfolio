import React, { Component } from 'react'
import { observer } from 'mobx-react'
import * as mobx from 'mobx'
import { withRouter } from 'react-router-dom'
import store from '../../../stores/store'
import handlerAction from '../../../actions/handlerActions'
import toggleAction from '../../../actions/toggleActions'
import Swipe from 'react-easy-swipe'
import Blur from './effects/Blur'

const FullImage = observer(
  class FullImage extends Component {
    state = {
      copied_1: false,
      copied_2: false,
      show_share: false,
      animate_blur: false
    }

    componentDidMount() {
      const data = mobx.toJS(store.instagram.data)
      const index = store.full_image.index
      this.props.history.push(`/photo/${data.data[index].id}`)
    }

    handleImageSelection = (direction, id) => {
      handlerAction.handlePagination(direction)
      this.props.history.push(`/photo/${id}`)
    }

    handleFullImageClose = () => {
      toggleAction.toggleFullImageCarousel()
      this.props.history.push('/')
    }

    toggleShare = () => {
      if (this.state.show_share) {
        this.exitShare()
      } else {
        this.setState({
          show_share: true,
          copied_1: false,
          copied_2: false
        })
      }
    }

    exitShare= () => {
      this.setState({ animate_blur: true })
      setTimeout(() => {
        this.setState({ show_share: false, animate_blur: false })
      }, 500)
    }

    selectShareLink1 = e => {
      const input = this.refs.share_input_1
      input.setSelectionRange(0, input.value.length)
    }

    selectShareLink2 = e => {
      const input = this.refs.share_input_2
      input.setSelectionRange(0, input.value.length)
    }

    copyShareUrlOne = () => {
      const input = this.refs.share_input_1
      input.select()
      document.execCommand('copy')
      input.focus()
      this.setState({ copied_1: true, copied_2: false })
    }

    copyShareUrlTwo = () => {
      const input = this.refs.share_input_2
      input.select()
      document.execCommand('copy')
      input.focus()
      this.setState({ copied_1: false, copied_2: true })
    }

    render() {
      const data = mobx.toJS(store.instagram.data),
            data_user = mobx.toJS(store.instagram.user),
            profile = data_user.data,
            index = store.full_image.index,
            show_share = this.state.show_share
      if (data && profile) {
        return (
          <div className={store.close_full
                          ? 'full-image__wrapper animate__fade--out'
                          : 'full-image__wrapper animate__fade--in'}>
            <Swipe
              onSwipeLeft={() => this.handleImageSelection('next', data.data[index].id)}
              onSwipeRight={() => this.handleImageSelection('previous', data.data[index].id)}>

              <div className={
                    show_share
                      ? this.state.animate_blur
                        ? 'full-image__image animate__inactive-blur'
                        : 'full-image__image animate__active-blur'
                      : 'full-image__image'
                    }>
                  <img key={index}
                       src={data.data[store.full_image.index].images.standard_resolution.url}
                       className='animate__fade-in--long'
                       alt='James Thomas Instagram' />
                <div className='full-image__pagination-container'>
                  <button onClick={() => this.handleImageSelection('previous', data.data[index].id)}>
                    <i className='fas fa-chevron-left' />
                  </button>
                  <button onClick={() => this.handleImageSelection('next', data.data[index].id)}>
                    <i className='fas fa-chevron-right' />
                  </button>
                </div>
              </div>
            </Swipe>
            <div className='full-image__top-stats'>
              <ul>
                <li>
                  <i className='fas fa-heart' />
                  &nbsp;{handlerAction.handleNumberFormat(data.data[index].likes.count)}
                </li>
                <li>
                  <i className='fas fa-comment' />
                  &nbsp;{handlerAction.handleNumberFormat(data.data[index].comments.count)}
                </li>
                <li>
                  <button onClick={this.toggleShare}>
                    <i className='fas fa-share' title='Share this Image' />
                  </button>
                </li>
                <li>
                  <a href={data.data[index].link}>
                    <i className='fab fa-instagram' />
                  </a>
                </li>
                <li>
                  <button onClick={this.handleFullImageClose}>
                    <i className='fas fa-times' />
                  </button>
                </li>
              </ul>
          </div>
          <div className={show_share ? 'full-image__share-bar animate__fade--in' : 'remove'}>
            <div onClick={show_share ? this.exitShare : null}
                 className='full-image__share-underlay' />
             <span className={
               show_share
                 ? this.state.animate_blur
                   ? 'animate__input--blur-out'
                   : 'animate__input--blur-in'
                 : null
             }>
               <i className='fas fa-desktop share-icon' />
               <input type='text'
                      readOnly
                      ref='share_input_1'
                      value={window.location.href}
                      onClick={this.selectShareLink1}/>
               <button onClick={this.copyShareUrlOne} title='Click to copy'>
                <i className={this.state.copied_1 ? 'fas fa-check' : 'fas fa-copy'}
                   style={this.state.copied_1 ? { color: 'rgb(65, 242, 99)' } : null}/>
               </button>
              </span>
              <span className={
                show_share
                  ? this.state.animate_blur
                    ? 'animate__input--blur-out'
                    : 'animate__input--blur-in'
                  : null
              }>
                <i className='fab fa-instagram share-icon' />
                <input type='text'
                  readOnly
                  ref='share_input_2'
                  value={data.data[index].link}
                  onClick={this.selectShareLink2}/>
                  <button onClick={this.copyShareUrlTwo}
                    title='Click to copy'>
                    <i className={this.state.copied_2 ? 'fas fa-check' : 'fas fa-copy'}
                       style={this.state.copied_2 ? { color: 'rgb(65, 242, 99)' } : null} />
                  </button>
              </span>
            </div>
            <Blur amount='15' />
          </div>
        )
      } else {
        return 'Loading...'
      }
    }
  }
)

export default withRouter(FullImage)
