import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const Presets = observer(
  class Presets extends Component {

    componentDidMount() {
      store.current_page['color'] = '#2b120f'
    }

    render() {
      return (
        <div className='section__container'>
          <p>
            PRESETS!
          </p>
        </div>
      )
    }
  }
)

export default Presets
