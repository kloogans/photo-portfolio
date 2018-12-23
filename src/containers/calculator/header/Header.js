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
      <div className='calc-header__logout'>
        <button onClick={store.handleLogout}>
          Logout
        </button>
      </div>

      <div className='calc-header__profile'>
        <div className='calc-header__profile-photo'>
          <img src={data.profile_picture} />
        </div>

        <p>{data.username}</p>

        <div className='calc-header__section'>
          <div className='section__box'>
            <span className='stats__title'>
              Posts
            </span>
            <span>{data.counts.media}</span>
          </div>
          <div className='section__box'>
            <span className='stats__title'>
              Followers
            </span>
            <span>{data.counts.followed_by}</span>
          </div>
          <div className='section__box'>
            <span className='stats__title'>
              Following
            </span>
            <span>{data.counts.follows}</span>
          </div>
        </div>

        <div className='calc-header__section'>
          <div className='section__box'>
            <p className='stats__title'>
              Engagement (Avg)
            </p>
            <h3>
              {store.engagement.average_engagement}%
            </h3>
          </div>
        </div>

        <div className='calc-header__section'>
          <div className='section__box'>
            <span className='stats__title'>
              Likes(Avg)
            </span>
            <span>{store.engagement.average_likes}</span>
          </div>
          <div className='section__box'>
            <span className='stats__title'>
              Comments(Avg)
            </span>
            <span>{store.engagement.average_comments}</span>
          </div>
        </div>

      </div>
    </header>
  )
})

export default Header
