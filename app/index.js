import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import Playground from '@app/playground/Playground'
import Loader from '@app/playground/Loader'
import Ajax from '@module/ajax/Ajax'
import io from 'socket.io-client'

import Player from '@entity/sector/Player'

// знаем только id игрока
const player = new Player().setId('09839694-28d3-4504-9dc9-1cd3b6a539d7')

ReactDOM.render(<App />, document.getElementById('root'));

(async () => {

  const playGroundInfoJson = await Ajax.post('http://localhost:3000/user/data/1', player)
  const playGroundInfo = JSON.parse(playGroundInfoJson)

  const loader = new Loader()
  await loader.startLoad()

  if (playGroundInfo) {
    let playground = new Playground({
      playGroundInfo: playGroundInfo,
      loader: loader,
    })
    playground.init('root', 'root-canvas')
  } else {
    new Error('Cannot get users info')
  }

  try {
    const socket = io.connect('http://127.0.0.1:3333/play-process');
    socket.on('timestamp', (data) => {
      console.log(data)
    })
  } catch (e) {
    console.warn(e)
  }


})()



