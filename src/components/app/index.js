import { useState } from 'react'
import _set from 'lodash.set'
import { DEFAULT_PROGRESS_BAR_PROPS } from '../../utils/constants'
import CircularProgressBar from '../circular-progress-bar'
import ConfigForm from '../config-form'
import './app.css'

function App() {
  const [config, setConfig] = useState(DEFAULT_PROGRESS_BAR_PROPS)

  const updateConfig = (key, type) => (event) => {
    setConfig((prevConfig) => {
      const types = {
        number: (value) => +value,
        string: (value) => value + '',
      }

      _set(prevConfig, key, types[type]?.(event.target.value))

      return { ...prevConfig }
    })
  }

  return (
    <div className="app">
      <div className="card">
        <div className="preview">
          <CircularProgressBar {...config} />
        </div>
        <ConfigForm config={config} updateConfig={updateConfig} />
      </div>
    </div>
  )
}

export default App
