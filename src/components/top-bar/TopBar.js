import React, { Component } from 'react'
import Logo from '../logo/Logo'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const TopBar = observer(
  class TopBar extends Component {

    render() {
      return (
        <div className='top-bar__container'>
          <div className={store.shrink ? 'top-bar__logo-box top-bar--shrink' : 'top-bar__logo-box'}>
            <Logo />
          </div>
        </div>
      )
    }
  }
)

export default TopBar
