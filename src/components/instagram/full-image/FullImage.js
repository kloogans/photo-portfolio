import React from 'react'
import { observer } from 'mobx-react'
import * as mobx from 'mobx'
import store from '../../../stores/store'

const FullImage = observer(() => {
  const image = mobx.toJS(store.instagram.data)
  console.log(image[store.full_image.index].images.standard_resolution)
  return (
    <div className='full-image__wrapper'>
      <div className='full-image__top-controls'>
        <button onClick={store.closeFullImage}>
          <i className='fas fa-times' />
        </button>
      </div>
      <div className='full-image__image'>
        <img src={image[store.full_image.index].images.standard_resolution.url} />
        <div className='full-image__pagination-container'>
          <button onClick={() => store.pagination('previous')}>
            <i className='fas fa-chevron-left' />
          </button>
          <button onClick={() => store.pagination('next')}>
            <i className='fas fa-chevron-right' />
          </button>
        </div>
      </div>
    </div>
  )
})

export default FullImage
