import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import * as mobx from 'mobx'
import store from '../stores/store'
import { observer } from 'mobx-react'
import Header from './header/Header'
import Posts from './posts/Posts'
import LogoInstagram from 'react-ionicons/lib/LogoInstagram'

const Calculator = observer(
  class Calculator extends Component {

    componentDidMount() {
      this.checkLocalStorage()
      const path = this.props.history.location
      const local = window.localStorage.getItem('ig_access_token')
      let hash = path.hash
      if (hash || local) {
        if (hash) {
          hash = hash.substring(hash.indexOf("=") + 1)
          store.access_token = hash
          window.localStorage.setItem('ig_access_token', hash)
          console.log('authenticated via HASH')
        } else if (local) {
          store.access_token = localStorage.getItem('ig_access_token')
          console.log('authenticated via LOCALSTORAGE')
        } else {
          console.log('weird stuff')
        }
        store.authenticated = true
        store.getInstagramUserData()
        store.getInstagramPostData()
      } else {
        console.log('not logged in')
      }
    }

    checkLocalStorage = () => {
      const local = localStorage.getItem('access_token')
      if(local && local.length) {
        store.access_token = local
        store.authenticated = true
      }
    }

    render() {
      const url = `https://api.instagram.com/oauth/authorize/?client_id=074a548e0ba74680869c005b9653bfc2&redirect_uri=http://localhost:3000/calculator&response_type=token`
      if (store.authenticated && store.instagram_data) {
        const data = mobx.toJS(store.instagram_data)
        return (
          <div className='section__container animate__fade-in--long' style={{ padding: 'none' }}>
            <Header />
            <Posts />
          </div>
        )
      } else {
        return (
          <div className='section__container animate__fade-in--long'>
            <h2>
              Instagram Engagement Calculator
            </h2>
            <p>
              This calculator will give you your average overall engagement rate,
              as well as engagement insights for each of your posts.
            </p>
            <a className='calculator__login-button' href={url}>
              <span>
                <i className=' fab fa-instagram' />
                &nbsp;Login
              </span>
            </a>
          </div>
        )
      }
    }

  }
)

export default withRouter(Calculator)
