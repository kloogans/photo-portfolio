import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import Popover from './components/shared/popover/Popover'
import Instagram from './components/instagram/Instagram'
import videos from './components/videos/stores/videos'
import Presets from './components/presets/Presets'
import TopBar from './components/top-bar/TopBar'
import Videos from './components/videos/Videos'
import About from './components/about/About'
import Div100vh from 'react-div-100vh'
import { observer } from 'mobx-react'
import store from './stores/store'
import dataAction from './actions/dataActions'
import handlerAction from './actions/handlerActions'
import './App.scss'

const App = observer(
  class App extends Component {

    componentDidMount() {
      dataAction.getInstagramFeed()
      dataAction.getInstagramUserData()
      videos.handleYoutubeData()
      window.addEventListener("scroll", handlerAction.handleScroll)
    }

    render() {
      return (
        <Router>
          <Div100vh className={store.full_image.is_active || store.popover.is_active ? 'app no-scroll' : 'app'}>
            <div className={store.full_image.is_active || store.popover.is_active ? 'app__wrapper no-scroll' : 'app__wrapper'}
                 style={{ backgroundColor: `${store.current_page.color}` }}>
              <div className='app__inner'
                   style={{ backgroundColor: `${store.current_page.color}` }}>
                <div style={{ backgroundColor: `${store.current_page.color}` }}
                     className={store.loading ? 'loading__wrapper' : 'remove'}>
                  <div style={{ backgroundColor: `${store.current_page.color}` }}
                       className={store.loading_complete
                                   ? 'app--loading animate__fade--out'
                                   : 'app--loading'} />
                </div>

                <TopBar />
                <Navigation />
                <div ref='scroll' />
                <main role='main'>
                  <Switch>
                    <Route exact path='/' component={Instagram} />
                    <Route path='/photo/:id' component={Instagram} />
                    <Route path='/about' component={About} />
                    <Route path='/presets' component={Presets} />
                    <Route path='/presets/:slug' component={Popover} />
                    <Route path='/videos' component={Videos} />
                  </Switch>
                </main>

              </div>
            </div>
          </Div100vh>
        </Router>
      )
    }
  }
)

export default App
