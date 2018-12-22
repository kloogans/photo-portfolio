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
        <div className='top-bar__container'>
          <div className={store.shrink ? 'top-bar__logo-box top-bar--shrink' : 'top-bar__logo-box'}
               style={{ backgroundColor: `${store.current_page.color}` }}>
            <Logo scroll={this.scrollToTop} />
          </div>
        </div>
      )
    }
  }
)

export default TopBar
