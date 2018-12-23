import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import * as mobx from 'mobx'
import store from '../stores/store'
import { observer } from 'mobx-react'
import Header from './header/Header'

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
          <div className='calculator__wrapper'>
            <Header />
          </div>
        )
      } else {
        return (
          <div className='login'>
            <a href={url}>LOGIN!</a>
          </div>
        )
      }
    }

  }
)

export default withRouter(Calculator)
