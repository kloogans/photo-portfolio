import React, { Component } from 'react'
import * as mobx from 'mobx'
import { observer } from 'mobx-react'
import store from '../../../stores/store'

const Grid = observer(
  class Grid extends Component {

    render() {
      if (store.instagram) {
        const data = mobx.toJS(store.instagram)
        const data_json = data.data
        console.log(data)
        const images = data_json.map(v => {
          // console.log(v.images.standard_resolution.url)
          return (
            <div key={v.id} className='insta-grid__img-wrapper'>
              <img src={v.images.low_resolution.url} />
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
