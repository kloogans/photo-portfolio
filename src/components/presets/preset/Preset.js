import React from 'react'
import { observer } from 'mobx-react'

const Preset = observer(p => (
  <div className='preset__item'>
    <img src={p.cover_img} alt={p.title} />
    <div className='preset__overlay'>
      <h3 className='text text--small text--no-padding'>
        {p.title}
      </h3>
      <button className='text text--medium text--regular'>
        <i className='fas fa-download' />
        Download
      </button>
      <button className='text text--medium text--regular'>
        <i className='fas fa-info-circle' />
        Details
      </button>
    </div>
  </div>
))

export default Preset
