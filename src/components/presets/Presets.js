import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import Preset from './preset/Preset'
import presets_list from './presets-list'

const Presets = observer(
  class Presets extends Component {

    componentDidMount() {
      store.current_page['color'] = '#2b120f'
    }

    handlePresetRoute = slug => {
      this.props.history.push(`/presets/${slug}`)
      store.togglePopover()
    }

    render() {
      return (
        <section className={store.loading
                            ? 'hidden'
                            : 'section__container animate__fade-in--long'}>
          <div className='presets__title-container'>
            <h2 className='presets__title text--large text--underline text--no-padding'>
              Presets
            </h2>
            <p className='presets__text text--small text--no-padding'
               style={{ textAlign: 'left' }}>
              Presets can help make your life in post a little bit easier.

            </p>
            <p className='presets__text text--x-small text--no-padding'>
              Note: You will most likely want to make further adjustments to fit your image.
            </p>
          </div>
          <div className='presets__grid'>
            {
              presets_list.map((p, i) => {
                return <Preset key={p.id}
                               cover_img={p.cover_img_url}
                               title={p.title}
                               keyy={p.key}
                               download_url={p.download_url}
                               descripton={p.description}
                               index={i}
                               handlePresetRoute={this.handlePresetRoute}/>
              })
            }
          </div>
          {/* <Popover /> */}
        </section>
      )
    }
  }
)

export default Presets
