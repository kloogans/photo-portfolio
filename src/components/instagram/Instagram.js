import React, { Component } from 'react'
import Grid from './grid/Grid'
import FullImage from './full-image/FullImage'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const Instagram = observer(
  class Instagram extends Component {

    render() {
      const page = store.current_page.name
      if (store.instagram) {
        return (
          <div className={store.loading || page !== 'photos'
                          ? 'instagram__wrapper'
                          : 'instagram__wrapper animate__fade-in--long'}>
            <Grid />
            {store.full_image.is_active && <FullImage />}
          </div>
        )
      } else {
        return 'Loading...'
      }
    }
  }
)

export default Instagram
