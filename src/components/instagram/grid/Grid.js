import React, { Component } from 'react'
import * as mobx from 'mobx'
import { observer } from 'mobx-react'
import store from '../../../stores/store'
import moment from 'moment'

const Grid = observer(
  class Grid extends Component {

    toggleFullImage = index => store.openFullImage(index)

    render() {
      if (store.instagram) {
        const data = mobx.toJS(store.instagram)
        const data_json = data.data
        console.log(data)
        const images = data_json.map((v, i) => {
          const time = moment.unix(v.created_time).fromNow()
          // console.log(v.images.standard_resolution.url)
          return (
            <div key={v.id} onClick={() => this.toggleFullImage(i)} className='insta-grid__img-wrapper'>
              <img src={v.images.standard_resolution.url} />
              <div className='insta-grid__info'>
                <p className='insta-grid__timestamp'>
                  {time}
                </p>
                <div className='insta-grid__social-stats'>
                  <p>
                    <i className='fas fa-heart' />
                    &nbsp;{v.likes.count}
                  </p>
                  <p>
                    <i className='fas fa-comment' />
                    &nbsp;{v.comments.count}
                  </p>
                  <a target='_blank' href={v.link}>
                    <i className='fas fa-external-link-square-alt' />
                  </a>
                </div>
              </div>
            </div>
          )
        })
        return (
          <div className='insta-grid__container grid grid__cols--3'>
            {images}
            <div className='insta-grid__follow-link'>
              <a href='https://instagram.com/jamesthomasvision'>
                INSTA
              </a>
            </div>
          </div>
        )
      } else {
        return 'LOADING...'
      }
    }

  }
)

export default Grid
