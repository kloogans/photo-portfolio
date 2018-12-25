import React from 'react'
import * as mobx from 'mobx'
import store from '../../stores/store'
import { observer } from 'mobx-react'

const Posts = observer(() => {
  const ig = mobx.toJS(store.instagram_data)
  const user = mobx.toJS(store.instagram_user_data)
  const ig_user = user.data
  const posts = ig.data
  const post = posts.map(p => {
    const likes = p.likes.count
    const comments = p.comments.count
    const engagement = (((likes + comments) / ig_user.counts.followed_by) * 100).toFixed(2)
    return(
      <div key={p.id} className='calc-posts__img-wrapper'>
          <img src={p.images.standard_resolution.url} />
        <div className='calc-posts__image-stats'>
          <p><i className='fas fa-heart' /> {p.likes.count}</p>
          <p><i className='fas fa-comment' /> {p.comments.count}</p>
          <p><i className='fas fa-users' /> {engagement}%</p>
        </div>
      </div>
    )
  })
  return (
    <div className='calc-posts__container grid'>
      {post}
    </div>
  )
})

export default Posts
