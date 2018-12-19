import React from 'react'
import Grid from './grid/Grid'
import { observer } from 'mobx-react'

const Instagram = observer(() => {
  return (
    <div className='instagram__wrapper'>
      <Grid />
    </div>
  )
})

export default Instagram
