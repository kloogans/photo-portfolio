import React from 'react'
import Grid from './grid/Grid'
import FullImage from './full-image/FullImage'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const Instagram = observer(() => {
  return (
    <div className='instagram__wrapper'>
      <Grid />
      {store.full_image.is_active && <FullImage />}
    </div>
  )
})

export default Instagram
