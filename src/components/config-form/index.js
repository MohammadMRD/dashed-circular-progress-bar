import './config-form.css'

function ConfigForm({ config, updateConfig }) {
  return (
    <>
      <form className="config-form">
        <h2>CONFIGURATION</h2>

        <div className="form-field">
          <label>Radius</label>
          <input
            type="range"
            min="0"
            max="100"
            value={config.r}
            onChange={updateConfig('r', 'number')}
          />
        </div>

        <div className="form-field">
          <label>Arc</label>
          <input
            type="range"
            min="0"
            max="360"
            value={config.arc}
            onChange={updateConfig('arc', 'number')}
          />
        </div>

        <div className="form-field">
          <label>Rotate</label>
          <input
            type="range"
            min="0"
            max="360"
            value={config.rotate}
            onChange={updateConfig('rotate', 'number')}
          />
        </div>

        <div className="form-field">
          <label>Progress</label>
          <input
            type="range"
            min="10"
            max={config.arc}
            value={config.progress}
            onChange={updateConfig('progress', 'number')}
          />
        </div>

        <div className="form-field">
          <label>Stroke Color</label>
          <input
            type="color"
            value={config.stroke.color}
            onChange={updateConfig('stroke.color', 'string')}
          />
        </div>

        <div className="form-field">
          <label>Stroke Width</label>
          <input
            type="range"
            min="10"
            max="50"
            value={config.stroke.width}
            onChange={updateConfig('stroke.width', 'number')}
          />
        </div>

        <div className="form-field">
          <label>Stroke Gap</label>
          <input
            type="range"
            min="0"
            max="40"
            value={config.stroke.gap}
            onChange={updateConfig('stroke.gap', 'number')}
          />
        </div>

        <div className="form-field">
          <label>Animation duration (ms)</label>
          <input
            type="range"
            min="0"
            max="10000"
            value={config.animation.duration}
            onChange={updateConfig('animation.duration', 'number')}
          />
        </div>

        <div className="form-field">
          <label>Animation - Stroke Color</label>
          <input
            type="color"
            value={config.animation.stroke.color}
            onChange={updateConfig('animation.stroke.color', 'string')}
          />
        </div>

        <div className="form-field">
          <label>Animation - Stroke Width</label>
          <input
            type="range"
            min="0"
            max="100"
            value={config.animation.stroke.width}
            onChange={updateConfig('animation.stroke.width', 'number')}
          />
        </div>
      </form>
      <pre>{JSON.stringify(config, null, 4)}</pre>
    </>
  )
}

export default ConfigForm
