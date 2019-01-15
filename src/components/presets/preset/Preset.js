import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import store from '../../../stores/store'

const Preset = observer(
  class Preset extends Component {

    doStuff = (preset, path) => {
      this.props.handlePresetRoute(path)
      store.popover.selectedPreset = { ...preset }
      console.log(preset)
    }

    render() {
      const p = this.props
      let title = p.title
      const path = (title.split(' ').join('-')).toLowerCase()
      return (
        <div className='preset__item'>
          <img src={p.cover_img} alt={p.title} />
          <div className='preset__overlay'>
            <h3 className='text text--small text--no-padding'>
              {p.title}
            </h3>
            <button className='text text--small text--regular text--uppercase'>
              <i className='fas fa-download' />
              &nbsp;Download
            </button>
            <button onClick={() => this.doStuff(p, path)} className='text text--small text--regular text--uppercase'>
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
