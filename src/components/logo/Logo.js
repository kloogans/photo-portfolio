import React from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const Logo = observer(() => {
  return (
    <div className={store.loading ? 'logo logo--loading' : 'logo'} />
  )
})

export default Logo
