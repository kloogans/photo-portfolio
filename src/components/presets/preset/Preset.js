import React from 'react'
import { observer } from 'mobx-react'
import store from '../../../stores/store'
import Popover from '../../shared/popover/Popover'

const Preset = observer(p => (
  <div className='preset__item'>
    <img src={p.cover_img} alt={p.title} />
    <div className='preset__overlay'>
      <h3 className='text text--small text--no-padding'>
        {p.title}
      </h3>
      <button className='text text--small text--regular text--uppercase'>
        <i className='fas fa-download' />
        &nbsp;Download
      </button>
      <button onClick={store.togglePopover} className='text text--small text--regular text--uppercase'>
        <i className='fas fa-info-circle' />
        &nbsp;Details
      </button>
    </div>
    <Popover />
  </div>
))

export default Preset
