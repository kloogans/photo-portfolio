import React, { Component } from 'react'
import { observer } from 'mobx-react'
import * as mobx from 'mobx'
import Video from './video/Video'
import SectionContainer from '../shared/section/SectionContainer'
import store from '../../stores/store'
import videos from './stores/videos'

const Videos = observer(
  class Videos extends Component {

    componentDidMount() {
      store.current_page['color'] = '#240f2b'
      document.documentElement.style.backgroundColor = '#240f2b'
    }

    render() {
      if (!store.loading && videos.youtube_data) {
        const data = mobx.toJS(videos.youtube_data)
        return (
          <SectionContainer title='Tutorials'>
            <div className='videos__list animate__fade-in--long'>
              {
                data.map(v => {
                  const video = v.snippet
                  return (
                    <article className='videos__video' key={video.resourceId.videoId}>
                      <h3 className='text text--medium text__weight--light'>
                        {video.title}
                      </h3>
                      <Video id={video.resourceId.videoId}
                             title={video.title}
                             thumbnail={video.thumbnails.high}
                             description={video.description} />
                      <p className='text text--small text__weight--light'>
                        {(video.description).split('Final')[0]}
                      </p>
                    </article>
                  )
                })
              }
            </div>
          </SectionContainer>
        )
      } else {
        return 'Loading...'
      }
    }

  }
)

export default Videos
