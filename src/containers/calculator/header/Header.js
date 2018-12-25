import React from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import * as mobx from 'mobx'

const Header = observer(() =>{
  const ig = mobx.toJS(store.instagram_user_data)
  const ig_posts = mobx.toJS(store.instagram_data)
  const posts = ig_posts.data
  const data = ig.data

  return (
    <header className='calc-header__container'>

        <div className='calc-header__display'>

          <div className='section__box'>
            <div className='calc-header__profile-photo'>
              <img src={data.profile_picture} />
            </div>
            <p>{data.username}</p>
          </div>

          <div className='section__box'>
            <div className='calc-header__stat'>
              <div className='engage__icon' />
            </div>
            <h3>
              {store.engagement.average_engagement}%
            </h3>
          </div>

          <div className='calc-header__profile-stats'>
            <div className='section__box'>
              <span className='calc-header__stat'>
                Posts
              </span>
              <p>{data.counts.media}</p>
            </div>

            <div className='section__box'>
              <i className='fas fa-users' />
              <p>{data.counts.followed_by}</p>
            </div>
          </div>
          <div className='calc-header__profile-stats'>
            <div className='section__box'>
                <i className='fas fa-heart' />
              <p>{store.engagement.average_likes}</p>
            </div>

            <div className='section__box'>
              <i className='fas fa-comment' />
              <p>{store.engagement.average_comments}</p>
            </div>

          </div>

      </div>

      {/* <div className='section__box section__logout'>
        <button onClick={store.handleLogout}>
          Logout
        </button>
      </div> */}

    </header>
  )
})

export default Header
