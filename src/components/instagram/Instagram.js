import React from 'react'
import Grid from './grid/Grid'
import FullImage from './full-image/FullImage'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const Instagram = observer(() => {
  const page = store.current_page.name
  return (
    <div className={store.loading || page !== 'photos' ? 'instagram__wrapper' : 'instagram__wrapper animate__fade--in'}>
      <Grid />
      {store.full_image.is_active && <FullImage />}
    </div>
  )
})

export default Instagram
