import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import store from '../../../stores/store'

const Preset = observer(
  class Preset extends Component {

    handlePresetPopover = (preset, path) => {
      this.props.handlePresetRoute(path)
      store.popover.selected_preset = {...preset}
    }

    render() {
      const p = this.props,
            title = p.title,
            path = (title.split(' ').join('-')).toLowerCase()
      return (
        <div className='preset__item'>
          <LazyLoadImage
            alt={p.title}
            effect="blur"
            src={p.cover_img} />
          <div className='preset__overlay'>
            <h3 className='text text--small text--no-padding'>
              {p.title}
            </h3>
            <button className='text text--small text--regular text--uppercase'>
              <i className='fas fa-download' />
              &nbsp;Download
            </button>
            <button onClick={() => this.handlePresetPopover(p, path)}
                    className='text text--small text--regular text--uppercase'>
              <i className='fas fa-info-circle' />
              &nbsp;Details
            </button>
          </div>
        </div>
      )
    }
  }
)

export default withRouter(Preset)
