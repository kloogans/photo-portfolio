import React from 'react'
import { observer } from 'mobx-react'
import videos from '../stores/videos'

const Video = observer(video => (
  <div className='video__container'>
    <iframe src={`https://www.youtube.com/embed/${video.id}?rel=0&amp;showinfo=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
    </iframe>
  </div>
))

export default Video
