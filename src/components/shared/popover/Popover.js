import React, { Component } from 'react'
import { observer } from 'mobx-react'
import * as mobx from 'mobx'
import store from '../../../stores/store'

const Popover = observer(
  class Popover extends Component {

    render() {
      const popover = mobx.toJS(store.popover)
      return (
        <div style={{ backgroundColor: `${store.current_page.color}` }}
             className={popover.is_active ? 'popover__container animate__fade-in' : 'remove'}>
          <div className='popover__controls'>
            <button onClick={store.togglePopover}>
              <i className='fas fa-times' />
            </button>
          </div>
          <section className='section__container'>
            <h2>{popover.selected_preset.title}</h2>
            <div className='popover__content'>
              <img src={popover.selected_preset.cover_img}
                   alt={popover.selected_preset.title} />
              <p>
                {popover.selected_preset.description}
              </p>
            </div>
          </section>
        </div>
      )
    }
  }
)

export default Popover
