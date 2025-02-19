import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ArtistList from './ArtistList'
import { fetchArtistSongs } from '../../../actions/artistActions'

const mapStateToProps = state => {
  return {
    token: state.token.token ? state.token.token : '',
    artists: state.artistsReducer.artistList
      ? state.artistsReducer.artistList.artists
      : ''
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchArtistSongs,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList)
