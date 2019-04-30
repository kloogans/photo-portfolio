import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import store from '../../../stores/store'
import toggleAction from '../../../actions/toggleActions'
import { observer } from 'mobx-react'
import * as mobx from 'mobx'
import moment from 'moment'
import GridItem from './GridItem'

const Grid = observer(
  class Grid extends Component {

    toggleFullImage = index => toggleAction.toggleFullImageCarousel(index)

    render() {
      if (store.instagram.data && store.instagram.user) {
        const data = mobx.toJS(store.instagram.data),
              data_json = data.data,
              images = data_json.map((v, i) => {
                return <GridItem key={v.id}
                                 data={v}
                                 index={i}
                                 time={moment.unix(v.created_time).fromNow()} />
              })
              return (
                <div className='insta-grid__container grid grid__cols--3'>
                  {images}
                  <div className='insta-grid__img-wrapper'>
                    <a title='James Thomas on Instagram' href='https://instagram.com/jamesthomasvision'>
                      <i className='fab fa-instagram' />
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

export default withRouter(Grid)
