import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'
import merge from 'lodash/merge'

import { ColorWrap, Saturation, Hue, Alpha, Checkboard } from '../common'
import SketchFields from './SketchFields'
import { SketchPointer } from './SketchPointer'

export const Sketch = ({ width, rgb, hex, hsv, hsl, onChange, onSwatchHover,
  disableAlpha, activeFields, setActiveFields, presetColors, renderers, styles: passedStyles = {}, className = '' }) => {
  const styles = reactCSS(merge({
    'default': {
      picker: {
        width,
        padding: '10px 10px 0',
        boxSizing: 'initial',
        background: '#fff',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)',
      },
      saturation: {
        width: '100%',
        paddingBottom: '100%',
        position: 'relative',
        overflow: 'hidden',
      },
      Saturation: {
        radius: '3px',
        shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
      },
      controls: {
        display: 'flex',
      },
      sliders: {
        padding: '6px 0',
        flex: '1',
      },
      color: {
        width: '22px',
        height: '22px',
        position: 'relative',
        marginTop: '6px',
        marginLeft: '6px',
        borderRadius: '3px',
      },
      activeColor: {
        absolute: '0px 0px 0px 0px',
        borderRadius: '2px',
        background: `rgba(${ rgb.r },${ rgb.g },${ rgb.b },${ rgb.a })`,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
      },
      hue: {
        position: 'relative',
        height: '8px',
        overflow: 'hidden',
      },
      Hue: {
        radius: '2px',
        shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
      },

      alpha: {
        position: 'relative',
        height: '8px',
        marginTop: '6px',
        overflow: 'hidden',
      },
      Alpha: {
        radius: '2px',
        shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
      },
      ...passedStyles,
    },
    'disableAlpha': {
      color: {
        height: '10px',
      },
      hue: {
        height: '10px',
      },
      alpha: {
        display: 'none',
      },
    },
  }, passedStyles), { disableAlpha })

  return (
    <div style={ styles.picker } className={ `sketch-picker ${ className }` }>
      <div style={ styles.saturation }>
        <Saturation
          style={ styles.Saturation }
          hsl={ hsl }
          hsv={ hsv }
          onChange={ onChange }
        />
      </div>
      <div style={ styles.controls } className="flexbox-fix">
        <div style={ styles.sliders }>
          <div style={ styles.hue }>
            <Hue
              style={ styles.Hue }
              pointer={ SketchPointer }
              hsl={ hsl }
              onChange={ onChange }
            />
          </div>
          <div style={ styles.alpha }>
            <Alpha
              style={ styles.Alpha }
              pointer={ SketchPointer }
              rgb={ rgb }
              hsl={ hsl }
              renderers={ renderers }
              onChange={ onChange }
            />
          </div>
        </div>
        <div style={ styles.color }>
          <Checkboard />
          <div style={ styles.activeColor } />
        </div>
      </div>

      <SketchFields
        rgb={ rgb }
        hsl={ hsl }
        hex={ hex }
        onChange={ onChange }
        disableAlpha={ disableAlpha }
        activeFields={ activeFields }
        setActiveFields={ setActiveFields }
      />
    </div>
  )
}

Sketch.propTypes = {
  disableAlpha: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  styles: PropTypes.object,
}

Sketch.defaultProps = {
  disableAlpha: false,
  setActiveFields: function() {},
  width: 200,
  styles: {},
  presetColors: ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505',
    '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000',
    '#4A4A4A', '#9B9B9B', '#FFFFFF'],
}

export default ColorWrap(Sketch)
