import React, { Component } from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Instagram from './components/instagram/Instagram'
import About from './components/about/About'
import Presets from './components/presets/Presets'
import Logo from './components/logo/Logo'
import TopBar from './components/top-bar/TopBar'
import store from './stores/store'
import { observer } from 'mobx-react'
import Navigation from './components/navigation/Navigation'
import Div100vh from 'react-div-100vh'

const App = observer(
  class App extends Component {
    state={
      access_token: '2140277165.02b5921.39d4557f19714d30ab31573fd0af1b1d'
    }

    componentDidMount() {
      store.getInstaData()
      store.getSelfData()

      // setTimeout(() => {
      //   store.finishLoading()
      // }, 1000)

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
      const is_active = store.full_image.is_active
      return (
        <Router>
          <Div100vh>
          <div className='app__wrapper'
               style={{ backgroundColor: `${store.current_page.color}` }}>
            <div className='app__inner' style={{ backgroundColor: `${store.current_page.color}` }}>

              <div style={{ backgroundColor: `${store.current_page.color}` }}
                   className={store.loading ? 'loading__wrapper' : 'remove'}>
                <div style={{ backgroundColor: `${store.current_page.color}` }}
                     className={store.loading_complete ? 'app--loading animate__fade--out' : 'app--loading'} />
              </div>
              <TopBar />
              <Navigation />
              <div ref='scroll' />
              <Switch>
                <Route exact path='/' component={Instagram} />
                <Route path='/about' component={About} />
                <Route path='/presets' component={Presets} />
              </Switch>

            </div>
          </div>
        </Div100vh>
      </Router>
      )
    }
  }
)

export default App
