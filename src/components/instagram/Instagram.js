import React, { Component } from 'react'
import FullImage from './full-image/FullImage'
import Grid from './grid/Grid'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const Instagram = observer(
  class Instagram extends Component {

    componentDidMount() {
      store.current_page['color'] = '#202B36'
      document.documentElement.style.backgroundColor = '#202B36'
    }

    render() {
      const page = store.current_page.name
      if (store.instagram.data) {
        return (
          <div className={store.loading || page !== 'photos'
                          ? 'instagram__wrapper hidden'
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
