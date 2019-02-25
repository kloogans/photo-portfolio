import React, { Component } from 'react'
import Logo from '../logo/Logo'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const TopBar = observer(
  class TopBar extends Component {

    scrollToTop = () => {
      window.scroll({ top: 0, behavior: 'smooth' })
      console.log('scroll')
    }

    render() {
      return (
        <div className={!store.full_image.is_active || !store.popover.is_active ? 'top-bar__container' : 'remove'}
             style={store.popover.is_active ? {display: 'none'} : null}>
          <div className={
            store.shrink_logo
              ? store.full_image.is_active
                ? 'remove'
                : 'top-bar__logo-box top-bar--shrink'
              : store.full_image.is_active
                ? 'remove'
                : 'top-bar__logo-box'
          }
               style={{ backgroundColor: `${store.current_page.color}` }}>
            <Logo scroll={this.scrollToTop} />
          </div>
        </div>
      )
    }
  }
)

export default TopBar
