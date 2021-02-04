/* eslint-disable no-param-reassign */

import React from 'react'
import reactCSS from 'reactcss'
import * as color from '../../helpers/color'

import { EditableInput } from '../common'

export const SketchFields = ({ onChange, rgb, hsl, hex, disableAlpha, activeFields, setActiveFields }) => {
  let aFocus = false
  let hexFocus = false

  const styles = reactCSS({
    'default': {
      fields: {
        display: 'flex',
        border: '1px solid #D2DAE6',
        boxSizing: 'border-box',
        borderRadius: '1px',
      },
      single: {
        flex: '1',
        paddingLeft: '6px',
      },
      alpha: {
        // flex: '1',
        width: '44px',
        borderLeft: '1px solid #D2DAE6',
      },
      double: {
        flex: '2',
      },
      input: {
        width: '80%',
        padding: '3px 8px',
        border: 'none',
        fontSize: '10px',
      },
      label: {
        display: 'block',
        textAlign: 'center',
        fontSize: '11px',
        color: '#222',
        paddingTop: '3px',
        paddingBottom: '4px',
        textTransform: 'capitalize',
      },
    },
    'disableAlpha': {
      alpha: {
        display: 'none',
      },
    },
  }, { disableAlpha })

  const handleChange = (data, e) => {
    if (data.hex) {
      color.isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: 'hex',
      }, e)
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        a: rgb.a,
        source: 'rgb',
      }, e)
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0
      } else if (data.a > 100) {
        data.a = 100
      }

      data.a /= 100
      onChange({
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: data.a,
        source: 'rgb',
      }, e)
    }
  }

  const handleHexFocus = () => {
    console.log('handleHexFocus')
    hexFocus = true
    setActiveFields(true)
  }
  const handleHexBlur = () => {
    hexFocus = false
    setActiveFields((hexFocus || aFocus))
    console.log('handleHexBlur', (hexFocus || aFocus))
  }
  const handleAFocus = () => {
    console.log('handleAFocus')
    aFocus = true
    setActiveFields(true)
  }
  const handleABlur = () => {
    aFocus = false
    setActiveFields((hexFocus || aFocus))
    console.log('handleABlur', (hexFocus || aFocus))
  }

  return (
    <div style={{ ...styles.fields, borderColor: activeFields ? '#02AED3' : '#D2DAE6' }} className="flexbox-fix sketch-fields">
      <div style={ styles.double }>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="hex"
          hideLabel={true}
          // value={ hex.replace('#', '') }
          value={hex}
          onChange={ handleChange }
          onFocus={ handleHexFocus }
          onBlur={ handleHexBlur }
        />
      </div>
      {/* <div style={ styles.single }>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="r"
          value={ rgb.r }
          onChange={ handleChange }
          dragLabel="true"
          dragMax="255"
        />
      </div>
      <div style={ styles.single }>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="g"
          value={ rgb.g }
          onChange={ handleChange }
          dragLabel="true"
          dragMax="255"
        />
      </div>
      <div style={ styles.single }>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="b"
          value={ rgb.b }
          onChange={ handleChange }
          dragLabel="true"
          dragMax="255"
        />
      </div> */}
      <div style={ styles.alpha }>
        <EditableInput
          style={{ input: {...styles.input, width: '60%', padding: '3px 0px 3px 4px'}, label: styles.label }}
          label="a"
          suffix="%"
          hideLabel={true}
          value={ Math.round(rgb.a * 100) }
          onChange={ handleChange }
          onFocus={ handleAFocus }
          onBlur={ handleABlur }
          maxLength={4}
          dragLabel="true"
          dragMax="100"
        />
      </div>
    </div>
  )
}

export default SketchFields
