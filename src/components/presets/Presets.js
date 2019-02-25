import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import Preset from './preset/Preset'
import presets_list from './presets-list'
import Popover from '../shared/popover/Popover'
import SectionContainer from '../shared/section/SectionContainer'

const Presets = observer(
  class Presets extends Component {

    componentDidMount() {
      store.current_page['color'] = '#2b120f'
      document.documentElement.style.backgroundColor = '#2b120f'
    }

    handlePresetRoute = slug => {
      this.props.history.push(`/presets/${slug}`)
      store.togglePopover()
    }

    render() {
      return (
        <SectionContainer title='Presets'
                          description='Presets can help make your life in post a little bit easier.'
                          warning='Note: You will most likely want to make further adjustments to fit your image.'>
  
          <div className='presets__grid'>
            {
              presets_list.map((p, i) => {
                return <Preset key={p.id}
                               cover_img={p.cover_img_url}
                               title={p.title}
                               keyy={p.key}
                               download_url={p.download_url}
                               description={p.description}
                               index={i}
                               handlePresetRoute={this.handlePresetRoute}/>
              })
            }
          </div>
          <Popover />
        </SectionContainer>
      )
    }
  }
)

export default Presets
