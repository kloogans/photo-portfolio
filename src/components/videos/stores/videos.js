import { observable, action, decorate } from 'mobx'
import handlerAction from '../../../actions/handlerActions'

class Videos {
  youtube_data = null

  handleYoutubeData = async () => {
    const url = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=UCUcp2-FNGp8ALCboksE0SOg&key=AIzaSyBdkUqIEuy5hLuvqNIFU49bz7PgnAs_lX4',
          yt = await fetch(url)
    try {
      const data = await yt.json()
      if (data) this.getYoutubePlaylist(data.items[0].contentDetails.relatedPlaylists.uploads)
    } catch(e) {
      console.error(e)
    }
  }

  getYoutubePlaylist = async id => {
    if (id) {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${id}&key=AIzaSyBdkUqIEuy5hLuvqNIFU49bz7PgnAs_lX4&part=snippet&maxResults=50`,
            yt = await fetch(url)
      try {
        const data = await yt.json()
        if (data) {
          this.youtube_data = data.items
          handlerAction.handleFinishLoading()
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
