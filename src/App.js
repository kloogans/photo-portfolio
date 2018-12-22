import React, { Component } from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Instagram from './components/instagram/Instagram'
import About from './components/about/About'
import Logo from './components/logo/Logo'
import TopBar from './components/top-bar/TopBar'
import store from './stores/store'
import { observer } from 'mobx-react'
import Navigation from './components/navigation/Navigation'

const App = observer(
  class App extends Component {
    state={
      access_token: '2140277165.02b5921.39d4557f19714d30ab31573fd0af1b1d'
    }

    componentDidMount() {
      store.getInstaData()
      store.getSelfData()

      setTimeout(() => {
        store.finishLoading()
      }, 2000)

      window.addEventListener("scroll", this._scroll)
    }

    _scroll = () => {
      const distanceY = window.pageYOffset || document.documentElement.scrollTop,
        shrinkOn = 32,
        headerEl = this.refs.scroll
      if (distanceY > shrinkOn) {
        store.shrink = true
      } else {
        store.shrink = false
      }
    }


    render() {
      return (
        <Router>
          <div className="app__wrapper">
            <div className={store.loading ? 'loading__wrapper' : 'remove'}>
              <div className={store.loading_complete ? 'app--loading animate__fade--out' : 'app--loading'} />
            </div>
            <TopBar />
            <Navigation />
            <div ref='scroll' />
              <Switch>
                <Route exact path='/' component={Instagram} />
                <Route path='/about' component={About} />
              </Switch>
            {/* <Instagram /> */}
            {/* <About /> */}
          </div>
      </Router>
      )
    }
  }
)

export default App
