import React, { Component } from 'react'
import './App.scss'
import Instagram from './components/instagram/Instagram'
import Logo from './components/logo/Logo'
import store from './stores/store'
import { observer } from 'mobx-react'

const App = observer(
  class App extends Component {
    state={
      access_token: '2140277165.02b5921.39d4557f19714d30ab31573fd0af1b1d'
    }

    componentDidMount() {
      store.getInstaData()
    }

    render() {
      return (
        <div className="app__wrapper">
          <Logo />
          <Instagram />
        </div>
      )
    }
  }
)

export default App
