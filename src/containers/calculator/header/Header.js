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
        <img src={data.profile_picture} />
        <p>{data.username}</p>
        <div className='calc-header__follow-stats'>
          <p>Followers: {data.counts.followed_by}</p>
          <p>Following: {data.counts.follows}</p>
          <p>Posts: {data.counts.media}</p>
        </div>
        <h3>
          {store.engagement.average_engagement}%
        </h3>
        <div className='calc-header__engagement-stats'>
          <p>
            Average likes: {store.engagement.average_likes}
          </p>
          <p>
            Average comments: {store.engagement.average_comments}
          </p>
        </div>
      </div>
    </header>
  )
})

export default Header
