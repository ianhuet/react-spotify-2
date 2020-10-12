// @ts-nocheck
<<<<<<< HEAD
import React, { useEffect } from 'react'
=======
import React, { useEffect, useState } from 'react'
>>>>>>> 2894ad0... migrate App component to use Redux hooks
import { useSelector, useDispatch } from 'react-redux'
import { createUseStyles } from 'react-jss'
import { ThemeProvider } from 'theming'
import clsx from 'clsx'

import {
<<<<<<< HEAD
  pausePlayback,
  resetPlayback,
  resumePlayback,
  startPlayback,
} from '../../features/playerSlice'
=======
  playSong,
  stopSong,
  pauseSong,
  resumeSong,
} from '../../features/songsSlice'
>>>>>>> 2894ad0... migrate App component to use Redux hooks
import { setToken } from '../../features/tokenSlice'
import { fetchUser } from '../../features/userSlice'

import { MainView } from '../../containers'
import { Utility } from '../molecules'
import { MainHeader, PlayerBar, SideMenu } from '../organisms'
import { SpotifyDark } from '../../theme'
import { theme } from '../../theme/spotifyDark'

const cssBaseline = {
  backgroundColor: theme.palette.grey[4],
  color: theme.palette.white.primary,
  fontFamily: theme.typography.family.normal,
  margin: 0,
  padding: 0,
}

let htmlAudio

const useStyles = createUseStyles({
  app: {
    display: 'grid',
    gridTemplateColumns: '[secondaryCol] minmax(200px, 1fr) [mainCol] 5fr',
    gridTemplateRows: '[topRow1] 50px [topRow2] 60px [mainRow] 1fr [baseRow] 80px',
    height: '100vh',
    width: '100vw',

    background: '#040404',
    color: '#FFFFFF',
    fontFamily: '"Proxima Nova", sans-serif',
  },

  mainViewSection: {
    background: 'linear-gradient(180deg, #404040 0%, #121212 10%)',
    gridArea: 'topRow2 / mainCol / baseRow / mainCol',
    overflow: 'hidden',
    padding: '0 20px',
  },
  scrollingPane: {
    height: '100%',
    overflowY: 'auto',
    marginBottom: '60px',
  },
})

const App = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const token = useSelector(state => state.token.token)
<<<<<<< HEAD
  const volume = useSelector(state => state.player.volume)

  useEffect(() => {
    function getAuthorisationUrl() {
      const clientId = process.env.REACT_APP_CLIENT_ID
=======
  const volume = useSelector(state => state.sound.volume)

  const [htmlAudioObj, setHtmlAudioObj] = useState(undefined)

  useEffect(() => {
    function getAuthorisationUrl() {
      const clientId = '47e2c485aa3c47a6a39e71bb2fcf4da4'
>>>>>>> 2894ad0... migrate App component to use Redux hooks
      const redirectUri = process.env.REACT_APP_REDIRECT_URI
      const scopes = [
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'user-read-recently-played',
        'playlist-modify-private',
        'ugc-image-upload',
        'user-follow-modify',
        'user-follow-read',
        'user-library-read',
        'user-library-modify',
        'user-read-private',
        'user-read-email',
        'user-top-read',
        'user-read-playback-state'
      ]
      return `https://accounts.spotify.com/authorize?client_id=${clientId}&scope=${scopes.join('%20')}&response_type=token&redirect_uri=${redirectUri}`
    }
    function getHashParams() {
      const hashParams = {}
      const regex = /([^&;=]+)=?([^&;]*)/g
      const queries = window.location.hash.substring(1)
  
      let element = regex.exec(queries)
      while (element) {
        hashParams[element[1]] = decodeURIComponent(element[2])
        element = regex.exec(queries)
      }
      return hashParams
    }

    let hashParams = getHashParams()
    if (!hashParams.access_token) {
      window.location.href = getAuthorisationUrl()
    } else {
      dispatch(setToken(hashParams.access_token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    Object.keys(cssBaseline).map((styleKey) =>
      document.body.style[styleKey] = cssBaseline[styleKey]
    )
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchUser, token])

  useEffect(() => {
    if (htmlAudio) {
      htmlAudio.play()
    }
  }, [htmlAudio])

  useEffect(() => {
    if (htmlAudio !== undefined) {
      htmlAudio.volume = volume / 100
    }
  }, [htmlAudio, volume])

  const handleStopSong = () => {
    if (htmlAudio) {
      htmlAudio.pause()
      dispatch(resetPlayback())
    }
  }
  const handlePauseSong = () => {
    if (htmlAudio) {
      htmlAudio.pause()
      dispatch(pausePlayback())
    }
  }
  const handleResumeSong = () => {
    if (htmlAudio) {
      htmlAudio.play()
      dispatch(resumePlayback())
    }
  }

  const audioController = (song) => {
    if (htmlAudio !== undefined) {
      htmlAudio.pause()
      dispatch(resetPlayback())
    }

    htmlAudio = new Audio(song.track.preview_url)
    htmlAudio.volume = volume / 100
    htmlAudio.play()
    dispatch(startPlayback(song.track))
  }

  const mainViewStyling = clsx(
    classes.mainViewSection,
    classes.scrollingPane,
  )

  return (
    <ThemeProvider theme={SpotifyDark}>
      <div className={classes.app}>
        <SideMenu />

        <Utility />

        <div className={mainViewStyling}>
          <MainHeader
            pauseSong={handlePauseSong}
            resumeSong={handleResumeSong}
          />
          <MainView
            audioControl={audioController}
            pauseSong={handlePauseSong}
            resumeSong={handleResumeSong}
          />
        </div>

        <PlayerBar
          audioControl={audioController}
          pauseSong={handlePauseSong}
          resumeSong={handleResumeSong}
          stopSong={handleStopSong}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
