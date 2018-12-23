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

      <div className='grid grid__cols-2'>
        <div className='calc-header__display'>

          <div className='calc-header__section'>
            <div className='section__box'>
              <div className='calc-header__profile-photo'>
                <img src={data.profile_picture} />
              </div>
              <p>{data.username}</p>
            </div>
          </div>

          <div className='calc-header__section calc-header__section--margin'>
            <div className='section__box section__box--padding'>
              <div className='calc-header__stat'>
                <div className='engage__icon' />
              </div>
              <h3>
                {store.engagement.average_engagement}%
              </h3>
            </div>
          </div>

        </div>

        <div className='calc-header__profile'>

          <div className='calc-header__profile-header'>

            <div className='calc-header__section'>
              <div className='section__box'>
                <span className='calc-header__stat'>
                  Posts
                </span>
                <span>{data.counts.media}</span>
              </div>
              <div className='section__box'>
                <span className='calc-header__stat'>
                  <i className='fas fa-users' />
                </span>
                <span>{data.counts.followed_by}</span>
              </div>
              {/* <div className='section__box'>
                <span className='calc-header__stat'>
                  Following
                </span>
                <span>{data.counts.follows}</span>
              </div> */}
            </div>

            <div className='calc-header__section'>
              <div className='section__box'>
                <span className='calc-header__stat'>
                  <i className='fas fa-heart' />
                </span>
                <span>{store.engagement.average_likes}</span>
              </div>
              <div className='section__box'>
                <span className='calc-header__stat'>
                  <i className='fas fa-comment' />
                </span>
                <span>{store.engagement.average_comments}</span>
              </div>
            </div>



          </div>

        </div>
      </div>

      <div className='section__box section__logout'>
        <button onClick={store.handleLogout}>
          Logout
        </button>
      </div>

    </header>
  )
})

export default Header
