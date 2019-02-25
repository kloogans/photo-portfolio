import React from 'react'

const Video = video => (
  <div className='video__container'>
    <iframe src={`https://www.youtube.com/embed/${video.id}?rel=0&amp;showinfo=0`}
            frameBorder="0"
            title={video.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
    </iframe>
  </div>
)

export default Video
