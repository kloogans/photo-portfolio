import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import IosOptions from 'react-ionicons/lib/IosOptions'

const Presets = observer(
  class Presets extends Component {

    componentDidMount() {
      store.current_page['color'] = '#2b120f'
    }

    render() {
      return (
        <div className='section__container animate__fade-in--long'>
          <h1>
            <IosOptions color='white' fontSize='3rem' />
          </h1>
          <h2>
            COMING SOON
          </h2>
          <p style={{ textAlign: 'center', fontWeight: '300' }}>
            Preset packs are still in development and will be available soon.
          </p>
        </div>
      )
    }
  }
)

export default Presets
