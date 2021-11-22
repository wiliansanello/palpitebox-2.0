import { useState } from 'react'
import ReactMapGL from 'react-map-gl'

export default function Map() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 34.049,
    longitude: -111.094,
    zoom: 10
  })

  return <ReactMapGL
    mapStyle="mapbox://styles/mapbox/streets-v11"
    mapboxApiAccessToken={process.env.MAPBOX_KEY}
    {...viewport}
    onViewportChange={(nextViewport) => setViewport(nextViewport)}
  >
  </ReactMapGL>
}