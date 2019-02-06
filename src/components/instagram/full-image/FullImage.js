import React, { Component } from 'react'
import { observer } from 'mobx-react'
import * as mobx from 'mobx'
import { withRouter } from 'react-router-dom'
import store from '../../../stores/store'
import Swipe from 'react-easy-swipe'

const FullImage = observer(
  class FullImage extends Component {
    state = { copied: false }

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

    selectShareLink = e => {
      const input = this.refs.share_input
      input.setSelectionRange(0, input.value.length)
    }

    copyShareUrl = () => {
      const input = this.refs.share_input
      input.select()
      document.execCommand('copy')
      input.focus()
      this.setState({ copied: true })
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

              <div className='full-image__image'>
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
                  <i className='fas fa-users' title='Engagement Rate' />
                  &nbsp;{Math.ceil(engagement_rate)}%
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

              <div className='full-image__share-bar animate__fade--in'>
                <input type='text'
                       readOnly
                       ref='share_input'
                       value={data[index].link}
                       onClick={this.selectShareLink} />
                 <button onClick={this.copyShareUrl} title='Click to copy'>
                   <i className={this.state.copied ? 'fas fa-check' : 'fas fa-copy'} />
                 </button>
              </div>
            </div>
          </div>
        )
      } else {
        return 'Loading...'
      }
    }
  }
)

export default withRouter(FullImage)
