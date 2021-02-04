import React from 'react'
import reactCSS from 'reactcss'

export const SketchPointer = () => {
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
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  })

  return (
    <div style={ styles.picker } />
  )
}

export default SketchPointer
