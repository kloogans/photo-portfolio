import React, { Component } from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Instagram from './components/instagram/Instagram'
import About from './components/about/About'
import Presets from './components/presets/Presets'
import Popover from './components/shared/popover/Popover'
import TopBar from './components/top-bar/TopBar'
import store from './stores/store'
import { observer } from 'mobx-react'
import Navigation from './components/navigation/Navigation'
import Div100vh from 'react-div-100vh'

const App = observer(
  class App extends Component {

    componentDidMount() {
      store.getInstaData()
      store.getSelfData()
      window.addEventListener("scroll", store.handleScroll)
      this.getYoutubes()
    }

    getYoutubes = async () => {
      const url = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=UCUcp2-FNGp8ALCboksE0SOg&key=AIzaSyBdkUqIEuy5hLuvqNIFU49bz7PgnAs_lX4'
      const yt = await fetch(url)
      try {
        const data = await yt.json()
        if (data) this.getYoutubePlaylist(data.items[0].contentDetails.relatedPlaylists.uploads)
      } catch(e) {
        console.error(e)
      }
    }

    getYoutubePlaylist = async id => {
      if (id) {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${id}&key=AIzaSyBdkUqIEuy5hLuvqNIFU49bz7PgnAs_lX4&part=snippet&maxResults=50`
        const yt = await fetch(url)
        try {
          const data = await yt.json()
          if (data) console.log(data)
        } catch(e) {
          console.error(e)
        }
      } else {
        console.log('no id: ', id)
      }
    }

    render() {
      return (
        <Router>
          <Div100vh className='app'>
            <div className='app__wrapper'
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
                <Switch>
                  <Route exact path='/' component={Instagram} />
                  <Route path='/photo/:id' component={Instagram} />
                  <Route path='/about' component={About} />
                  <Route path='/presets' component={Presets} />
                  <Route path='/presets/:slug' component={Popover} />
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
