import React from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const Logo = observer(p => {
  return (
    <div onClick={store.shrink ? p.scroll : null}
         className={
           store.loading
             ? 'logo logo--loading'
             : store.shrink
               ? 'logo logo--clickable'
               : ' logo'
         } />
  )
})

export default Logo
