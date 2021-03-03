import React from 'react'
import reactCSS from 'reactcss'

export const SketchPointer = (props) => {
  const styles = reactCSS({
    'default': {
      picker: {
        boxSizing: 'border-box',
        width: '10px',
        height: '10px',
        borderRadius: '5px',
        border: '2px solid #fff',
        transform: 'translate(-5px, -1px)',
        backgroundColor: 'transparent',
        boxShadow: '0 0 0 0.4px #A8A8A8',
      },
    },
  })

  return (
    <div style={{...styles.picker, background: (props.hue && (props.left > 97 || props.left < 3)) ?  '#f00' : 'unset' }} />
  )
}

export default SketchPointer
