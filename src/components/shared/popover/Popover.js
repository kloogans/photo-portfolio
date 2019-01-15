import React from 'react'
import { observer } from 'mobx-react'
import store from '../../../stores/store'

const Popover = observer(() => (
  <div style={{ backgroundColor: `${store.current_page.color}` }}
       className={store.popover.is_active
                   ? 'popover__container animate__fade-in'
                   : 'remove'}>
    <div className='popover__controls'>
      <button onClick={store.togglePopover}>
        <i className='fas fa-times' />
      </button>
    </div>
  </div>
))

export default Popover
