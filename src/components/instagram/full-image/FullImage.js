import React, { Component } from 'react'
import { observer } from 'mobx-react'
import * as mobx from 'mobx'
import { withRouter } from 'react-router-dom'
import store from '../../../stores/store'
import Swipe from 'react-easy-swipe'

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
      this.props.history.push(`/photo/${data[index].id}`)
    }

    handleImageSelection = (direction, id) => {
      store.pagination(direction)
      this.props.history.push(`/photo/${id}`)
    }

    handleFullImageClose = () => {
      store.closeFullImage()
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
            data_user = mobx.toJS(store.instagram_user),
            profile = data_user.data,
            index = store.full_image.index
      if (data && profile) {
        const engagement_rate = ((data[index].likes.count + data[index].comments.count) / profile.counts.followed_by) * 100
        return (
          <div className={store.close_full
                          ? 'full-image__wrapper animate__fade--out'
                          : 'full-image__wrapper animate__fade--in'}>
            <Swipe
              onSwipeLeft={() => this.handleImageSelection('next', data[index].id)}
              onSwipeRight={() => this.handleImageSelection('previous', data[index].id)}>

              <div className={
                    this.state.show_share
                      ? this.state.animate_blur
                        ? 'full-image__image full-image--inactive-blur'
                        : 'full-image__image full-image--active-blur'
                      : 'full-image__image'
                    }>
                  <img key={index}
                       src={data[store.full_image.index].images.standard_resolution.url}
                       className='animate__fade-in--long'
                       alt='James Thomas Instagram' />
                <div className='full-image__pagination-container'>
                  <button onClick={() => this.handleImageSelection('previous', data[index].id)}>
                    <i className='fas fa-chevron-left' />
                  </button>
                  <button onClick={() => this.handleImageSelection('next', data[index].id)}>
                    <i className='fas fa-chevron-right' />
                  </button>
                </div>
              </div>
            </Swipe>
            <div className='full-image__top-stats'>
              <ul>
                <li>
                  <i className='fas fa-heart' />
                  &nbsp;{store.formatNum(data[index].likes.count)}
                </li>
                <li>
                  <i className='fas fa-comment' />
                  &nbsp;{store.formatNum(data[index].comments.count)}
                </li>
                <li>
                  <button onClick={this.toggleShare}>
                    <i className='fas fa-share' title='Share this Image' />
                  </button>
                </li>
                <li>
                  <a href={data[index].link}>
                    <i className='fab fa-instagram' />
                  </a>
                </li>
                <li>
                  <button onClick={this.handleFullImageClose}>
                    <i className='fas fa-times' />
                  </button>
                </li>
              </ul>

            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" className="blur-svg">
                <defs>
                    <filter id="blur-filter">
                        <feGaussianBlur stdDeviation="15"></feGaussianBlur>
                    </filter>
                </defs>
            </svg>

          </div>

          <div className={this.state.show_share ? 'full-image__share-bar animate__fade--in' : 'remove'}>
            <div onClick={this.state.show_share ? this.exitShare : null}
                 className='full-image__share-underlay' />
             <span className={
               this.state.show_share
                 ? this.state.animate_blur
                   ? 'full-image--inputs-inactive'
                   : 'full-image--inputs-active'
                 : null
             }>
               <i className='fas fa-desktop share-icon' />
               <input type='text'
                 readOnly
                 ref='share_input_1'
                 value={window.location.href}
                 onClick={this.selectShareLink1}/>
               <button onClick={this.copyShareUrlOne}
                 title='Click to copy'
                 >
                  <i className={this.state.copied_1 ? 'fas fa-check' : 'fas fa-copy'}
                     style={this.state.copied_1 ? { color: 'rgb(65, 242, 99)' } : null}/>
                </button>
              </span>
              <span className={
                this.state.show_share
                  ? this.state.animate_blur
                    ? 'full-image--inputs-inactive'
                    : 'full-image--inputs-active'
                  : null
              }>
                <i className='fab fa-instagram share-icon' />
                <input type='text'
                  readOnly
                  ref='share_input_2'
                  value={data[index].link}
                  onClick={this.selectShareLink2}/>
                  <button onClick={this.copyShareUrlTwo}
                    title='Click to copy'>
                    <i className={this.state.copied_2 ? 'fas fa-check' : 'fas fa-copy'}
                       style={this.state.copied_2 ? { color: 'rgb(65, 242, 99)' } : null} />
                  </button>
              </span>
            </div>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" className="blur-svg">
            <defs>
              <filter id="blur-filter-2">
                <feGaussianBlur stdDeviation="15"></feGaussianBlur>
              </filter>
            </defs>
          </svg>


          </div>
        )
      } else {
        return 'Loading...'
      }
    }
  }
)

export default withRouter(FullImage)
