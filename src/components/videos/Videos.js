import React, { Component } from 'react'
import { observer } from 'mobx-react'
import * as mobx from 'mobx'
import Video from './video/Video'
import store from '../../stores/store'
import videos from './stores/videos'

const Videos = observer(
  class Videos extends Component {

    componentDidMount() {
      store.loading = true
      store.loading_complete = false
      videos.handleYoutubeData()
    }

    render() {
      if (!store.loading) {
        const data = mobx.toJS(videos.youtube_data)
        return (
          <section className='section__container videos__container animate__fade--in'>
            <h2>
              Tutorials, Tips, and Tricks
            </h2>
            <div className='videos__list'>
              {
                data.map(v => {
                  const video = v.snippet
                  console.log(video)
                  return <Video key={video.resourceId.videoId}
                                id={video.resourceId.videoId}
                                title={video.title}
                                thumbnail={video.thumbnails.high}
                                description={video.description} />
                })
              }
            </div>
          </section>
        )
      } else {
        return 'Loading...'
      }
    }

  }
)

export default Videos
