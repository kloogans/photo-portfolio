import { observable, action, decorate } from 'mobx'
import store from '../../../stores/store'

class Videos {
  youtube_data = null

  handleYoutubeData = async () => {
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
        if (data) {
          console.log(data)
          this.youtube_data = data.items
          store.finishLoading()
        }
      } catch(e) {
        console.error(e)
      }
    } else {
      console.log('no id: ', id)
    }
  }

}

decorate(Videos, {
  youtube_data: observable,
  handleYoutubeData: action
})

const videos = new Videos()
export default videos
