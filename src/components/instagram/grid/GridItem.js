import React from 'react'
import MdHeart from 'react-ionicons/lib/MdHeart'
import handlerAction from '../../../actions/handlerActions'
import toggleAction from '../../../actions/toggleActions'

const GridItem = props => (
  <div onClick={() => toggleAction.toggleFullImageCarousel(props.index)}
       className='insta-grid__img-wrapper'>

    <img src={window.innerWidth > 768 ?
               props.data.images.standard_resolution.url :
               props.data.images.low_resolution.url}
         alt='James Thomas Instagram' />
    <div className='insta-grid__info'>
      <p className='insta-grid__timestamp'>
        {props.time}
      </p>
      <div className='insta-grid__social-stats'>
        <p>
          <MdHeart fontSize='1.1rem'
                   color={props.data.likes.count >= 1000 ? '#e66e4e' : 'white'}
                   beat={props.data.likes.count >= 1000 ? true : false} />
          &nbsp;{handlerAction.handleNumberFormat(props.data.likes.count)}
        </p>
        <p>
          <i className='fas fa-comment' />
          &nbsp; {handlerAction.handleNumberFormat(props.data.comments.count)}
        </p>
        <a target='_blank'
           rel="noopener noreferrer"
           title='See it on Instagram'
           href={props.data.link}>
          <i className='fab fa-instagram' />
        </a>
      </div>
    </div>
  </div>
)

export default GridItem
