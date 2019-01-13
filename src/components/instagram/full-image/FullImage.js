import React, { Component } from 'react'
import { observer } from 'mobx-react'
import * as mobx from 'mobx'
import { withRouter } from 'react-router-dom'
import store from '../../../stores/store'
import Swipe from 'react-easy-swipe'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const FullImage = observer(
  class FullImage extends Component {

    componentDidMount() {
      const data = mobx.toJS(store.instagram.data)
      const index = store.full_image.index
      this.props.history.push(`/photo/${data[index].id}`)
    }

    handleImageSelection = (direction, id) => {
      store.pagination(direction)
      this.props.history.push(`/photo/${id}`)
    }

    handleClosingRoute = () => {
      store.closeFullImage()
      this.props.history.push('/')
    }

    onSwipeLeft() {
      console.log('left')
    }

    onSwipeRight() {
      console.log('right')
    }

    render() {
      const data = mobx.toJS(store.instagram.data)
      const data_user = mobx.toJS(store.instagram_user)
      const profile = data_user.data
      const index = store.full_image.index
      if (data && profile) {
        const engagement_rate = ((data[index].likes.count + data[index].comments.count) / profile.counts.followed_by) * 100
        return (
          <div className={store.close_full ? 'full-image__wrapper animate__fade--out' : 'full-image__wrapper animate__fade--in'}>
            <Swipe
              onSwipeLeft={() => this.handleImageSelection('next', data[index].id)}
              onSwipeRight={() => this.handleImageSelection('previous', data[index].id)}>

              <div className='full-image__image'>
                {/* <ReactCSSTransitionGroup transitionName='scale'
                                         transitionEnterTimeout={500}
                                         transitionLeaveTimeout={500}
                                         // component="img"
                                         className="full-image__slide"
                                         transitionAppear={true}
                                         transitionAppearTimeout={1000}> */}
                  <img key={index} src={data[store.full_image.index].images.standard_resolution.url} className='animate__fade-in--long' />
                {/* </ReactCSSTransitionGroup> */}
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
                  &nbsp;{data[index].likes.count}
                </li>
                <li>
                  <i className='fas fa-comment' />
                  &nbsp;{data[index].comments.count}
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
                  <a onClick={this.handleClosingRoute}>
                    <i className='fas fa-times' />
                  </a>
                </li>
              </ul>
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
