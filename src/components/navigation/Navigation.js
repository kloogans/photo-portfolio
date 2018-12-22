import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import { Link } from 'react-router-dom'

const Navigation = observer(
  class Navigation extends Component {

    changePage = page => {
      store.pushNewRoute(page)
    }

    render() {
      return (
        <nav className='navigation__container'>
          <div className='navigation__inner'>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                Photos
              </div>
              <Link to='/'>
                <i className='fas fa-th' />
              </Link>
            </div>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                Presets?
              </div>
              <button>
                <i className='fas fa-sliders-h' />
              </button>
            </div>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                About
              </div>
              <Link to='/about'>
                <i className='fas fa-user' />
              </Link>
            </div>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                Contact
              </div>
              <button>
                <i className='fas fa-envelope' />
              </button>
            </div>
          </div>
        </nav>
      )
    }

  }
)

export default Navigation
