import React, { Component } from 'react'
import { observer } from 'mobx-react'
import * as mobx from 'mobx'
import store from '../../../stores/store'

const FullImage = observer(
  class FullImage extends Component {
    render() {
      const data = mobx.toJS(store.instagram.data)
      const data_user = mobx.toJS(store.instagram_user)
      const profile = data_user.data
      const index = store.full_image.index
      if (data && profile) {
        console.log(store.close_full ? 'should be animating' : null)
        const engagement_rate = ((data[index].likes.count + data[index].comments.count) / profile.counts.followed_by) * 100
        return (
          <div className={store.close_full ? 'full-image__wrapper animate__fade--out' : 'full-image__wrapper animate__fade--in'}>
            {/* <div className='full-image__top-controls'>
              <div className='full-image__top-inner'>
                <button onClick={store.closeFullImage}>
                  <i className='fas fa-times' />
                </button>
              </div>
            </div> */}
            <div className='full-image__image'>
              <img src={data[store.full_image.index].images.standard_resolution.url} />
              <div className='full-image__pagination-container'>
                <button onClick={() => store.pagination('previous')}>
                  <i className='fas fa-chevron-left' />
                </button>
                <button onClick={() => store.pagination('next')}>
                  <i className='fas fa-chevron-right' />
                </button>
              </div>
            </div>
            <div className='full-image__bottom-stats'>
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
                  <button onClick={store.closeFullImage}>
                    <i className='fas fa-times' />
                  </button>
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

export default FullImage
