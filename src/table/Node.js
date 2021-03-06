import React from 'react'
import styled from 'styled-components'

import Handle from './Handle'

const Size = 100
const HandleW = 40

const NodeCircle = styled.circle`
  r: ${Size / 2}px;
  stroke: #635342;
  stroke-width: 5;
  fill: #91867a;
`

const Bracket = styled.path`
  fill: #635342;
  opacity: 0.5;
`

class Node extends React.Component {

  makePath = (x1, y1, x2, y2) => {
    const bx1 = (x1 + x2 - Size) / 2
    const bx2 = (x1 + x2 + Size) / 2
    const midy = (y1 + y2) / 2
    return `
      M${x1} ${y1}
      C${x1} ${midy}, ${bx1} ${midy}, ${bx1} ${y2}
      L${bx2} ${y2}
      C${bx2} ${midy}, ${x2} ${midy}, ${x2} ${y1}
      L${x1} ${y1}
    `
  }

  render () {
    const { from, to, rootWidth, rootHeight, numColumns, onUpdate } = this.props

    const cw = rootWidth / numColumns
    const x = (from + to)*cw / 2
    const y = rootHeight / 2

    return (
      <React.Fragment>
        <defs>
          <pattern id='pattern-hover' patternUnits='userSpaceOnUse' width='6' height='6' patternTransform='rotate(45)'>
	  	    	<line x1='0' y='0' x2='0' y2='6' stroke='#ffae59' strokeWidth='6' />
      		</pattern>  
 
          <pattern id='pattern' patternUnits='userSpaceOnUse' width='6' height='6' patternTransform='rotate(45)'>
	  	    	<line x1='0' y='0' x2='0' y2='6' stroke='#e09a50' strokeWidth='6' />
      		</pattern>  
        </defs>

        <Bracket d={this.makePath(from * cw, 0, to * cw, rootHeight / 2)} />

        <Handle
          x={from*cw}
          y={0}
          onDragging={dx => {
            const newFrom = Math.round(dx / cw)
            if (newFrom !== from && newFrom < to) {
              onUpdate({
                from: newFrom,
                to
              })
            }
          }}
        />

        <Handle
          x={to*cw - HandleW}
          y={0}
          onDragging={dx => {
            const newTo = Math.round(dx / cw)
            if (newTo !== to && newTo > from) {
              onUpdate({
                from,
                to: newTo
              })
            }
          }}
        />

        <NodeCircle cx={x} cy={y} />
      </React.Fragment>
    )
  }
}

export default Node
