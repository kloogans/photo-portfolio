import React from 'react'
import { observer } from 'mobx-react'
import store from '../../../stores/store'

const Popover = observer(p => (
  <div style={{ backgroundColor: `${store.current_page.color}` }}
       className='popover__container animate__fade-in'>
    <div className='popover__controls'>
      <button onClick={store.togglePopover}>
        <i className='fas fa-times' />
      </button>
    </div>
    <section className='section__container'>
      <h2>{store.popover.selected_preset.title}</h2>
      <div className='popover__content'>
        <img src={store.popover.selected_preset.cover_img} alt={store.popover.selected_preset.title} />
        <p>
          {store.popover.selected_preset.description}
        </p>
      </div>
    </section>
  </div>
))

export default Popover
