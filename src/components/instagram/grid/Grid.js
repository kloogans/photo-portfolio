import React, { Component } from 'react'
import * as mobx from 'mobx'
import { observer } from 'mobx-react'
import store from '../../../stores/store'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import MdHeart from 'react-ionicons/lib/MdHeart'

const Grid = observer(
  class Grid extends Component {

    toggleFullImage = index => store.openFullImage(index)

    render() {
      if (store.instagram && store.instagram_user) {
        const data = mobx.toJS(store.instagram),
              data_json = data.data,
              images = data_json.map((v, i) => {
                const time = moment.unix(v.created_time).fromNow()
                return (
                  <div key={v.id} onClick={() => this.toggleFullImage(i)} className='insta-grid__img-wrapper'>
                    <img src={v.images.standard_resolution.url}
                         alt='James Thomas Instagram' />
                    <div className='insta-grid__info'>
                      <p className='insta-grid__timestamp'>
                        {time}
                      </p>
                      <div className='insta-grid__social-stats'>
                        <p>
                          <MdHeart fontSize="1.1rem"
                            color={v.likes.count >= 1000 ? '#e66e4e' : 'white'}
                            beat={v.likes.count >= 1000 ? true : false} />
                          &nbsp;{store.formatNum(v.likes.count)}
                        </p>
                        <p>
                          <i className='fas fa-comment' />
                          &nbsp;{store.formatNum(v.comments.count)}
                        </p>
                        <a target='_blank'
                           rel="noopener noreferrer"
                           href={v.link}>
                          <i className='fab fa-instagram' />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })
              return (
                <div className='insta-grid__container grid grid__cols--3'>
                  {images}
                  <div className='insta-grid__img-wrapper'>
                    {/* <a href='https://instagram.com/jamesthomasvision'>
                      <i className='fab fa-instagram' />
                    </a> */}
                  </div>
                </div>
              )
            } else {
              return 'LOADING...'
            }
          }
  }
)

export default withRouter(Grid)
