import React, { Component } from 'react'

class Navigation extends Component {

  render() {
    return (
      <nav className='navigation__container'>
        <div className='navigation__inner'>
          <div className='navigation__link'>
            <div className='navigation__tooltip'>
              Photos
            </div>
            <button>
              <i className='fas fa-th' />
            </button>
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
            <button>
              <i className='fas fa-user' />
            </button>
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

export default Navigation
