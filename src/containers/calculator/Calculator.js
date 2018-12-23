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
      let hash = path.hash
      if (hash) {
        hash = hash.substring(hash.indexOf("=") + 1)
        store.access_token = hash
        store.authenticated = true
        window.localStorage.setItem('access_token', hash)
        // this.props.history.push(`/calculator?token=${hash}`)
        store.getInstagramUserData()
        store.getInstagramPostData()
      }
    }

    checkLocalStorage = () => {
      const local = window.localStorage
      if(local.getItem('access_token')) {
        store.access_token = local.getItem('access_token')
        store.authenticated = true
      }
    }

    render() {
      const url = `https://api.instagram.com/oauth/authorize/?client_id=${store.client_id}&redirect_uri=http://localhost:3003/calculator&response_type=token`
      if (store.authenticated && store.instagram_data) {
        const data = mobx.toJS(store.instagram_data)
        console.log(data)
        return (
          <div className='section__container'>
            <Header />
            <Posts />
          </div>
        )
      } else {
        return (
          <div className='section__container'>
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
