import React, { Component } from 'react'

class Navigation extends Component {

  render() {
    return (
      <nav className='navigation__container'>
        <div className='navigation__inner'>
          <button>
            Photos
          </button>
          <button>
            About
          </button>
          <button>
            Contact
          </button>
        </div>
      </nav>
    )
  }

}

export default Navigation
