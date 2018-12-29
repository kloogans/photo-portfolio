import React, { Component } from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Instagram from './components/instagram/Instagram'
import About from './components/about/About'
import Presets from './components/presets/Presets'
import Logo from './components/logo/Logo'
import TopBar from './components/top-bar/TopBar'
import Calculator from './containers/calculator/Calculator'
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
      window.addEventListener("scroll", this._scroll)
      // document.querySelector('.app').addEventListener("scroll", this._scroll)
    }

    _scroll = () => {
      console.log('is scrolling')
      const distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 7,
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
          <Div100vh className='app'>
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
                <Route path='/photo/:id' component={Instagram} />
                <Route path='/about' component={About} />
                <Route path='/presets' component={Presets} />
                <Route path='/calculator' component={Calculator} />
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
