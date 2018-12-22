import React from 'react'
import Grid from './grid/Grid'
import FullImage from './full-image/FullImage'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const Instagram = observer(() => {
  return (
    <div className={store.loading ? 'instagram__wrapper animate__fade--in' : 'instagram__wrapper instagram__wrapper--visible'}>
      <Grid />
      {store.full_image.is_active && <FullImage />}
    </div>
  )
})

export default Instagram
