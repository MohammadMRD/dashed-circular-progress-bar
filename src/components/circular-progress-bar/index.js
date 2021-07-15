import defu from 'defu'
import { useState } from 'react'
import { DEFAULT_PROGRESS_BAR_PROPS } from '../../utils/constants'
import './circular-progress-bar.css'

const useConfigs = (props) => {
  const configs = defu(props, DEFAULT_PROGRESS_BAR_PROPS)
  const [lastAnimatedLineIndex, setLastAnimatedLine] = useState(-1)

  const createGetter = (fn) => ({ get: fn })

  Object.defineProperties(configs, {
    numberOfStrokeLines: createGetter(function () {
      return ~~(this.arc / this.stroke.gap)
    }),

    size: createGetter(function () {
      return (
        this.r * 2 + Math.max(this.stroke.width, this.animation.stroke.width)
      )
    }),

    transform: createGetter(function () {
      return `
        translate(${this.size / 2}, ${this.size / 2})
        rotate(${-90 + this.rotate})
      `
    }),

    lineAnimationDuration: createGetter(function () {
      return this.animation.duration / this.numberOfStrokeLines
    }),

    lastAnimatedLineIndex: createGetter(function () {
      return lastAnimatedLineIndex
    }),
  })

  const handleLineAnimationEndIndex = (i) => () => {
    console.log(i)
    setLastAnimatedLine(i)
  }

  return { configs, handleLineAnimationEndIndex }
}

const getLineConfig = (configs, index) => {
  const { stroke, r, progress, animation, lastAnimatedLineIndex } = configs

  const mainStroke = Math.max(animation.stroke.width, stroke.width)
  const x2 = r
  const x1 = x2 - mainStroke
  const lineAngle = index * stroke.gap
  const isActive = lineAngle < progress

  // isActive => animWidth > width === 0
  // isActive => animWidth < width === width - animWidth
  // !isActive => animWidth > width === animWidth - width
  // !isActive => animWidth < width === 0

  const isZeroDashoffset =
    (isActive && animation.stroke.width > stroke.width) ||
    (!isActive && animation.stroke.width < stroke.width)

  const strokeDashoffset = isZeroDashoffset
    ? 0
    : Math.abs(animation.stroke.width - stroke.width)

  // isActive => index < lastIndex === 0
  // isActive => index > lastIndex === index - lastIndex

  // !isActive => index > lastIndex === 0
  // !isActive => index < lastIndex === lastIndex - index

  const durationInSecond = configs.lineAnimationDuration / 1000
  const distance = lastAnimatedLineIndex - index

  const delay =
    Math.abs(isActive ? Math.min(0, distance) : Math.max(0, distance)) *
    durationInSecond

  return {
    x1,
    x2,
    strokeDashoffset,
    strokeDasharray: `${mainStroke} ${mainStroke}`,
    transform: `rotate(${lineAngle})`,
    style: {
      '--delay': `${delay}s`,
      '--stroke': stroke.color,
      '--stroke-active': animation.stroke.color,
    },
    className: isActive ? 'active' : '',
  }
}

function CircularProgressBar(props) {
  const { configs, handleLineAnimationEndIndex } = useConfigs(props)

  const renderLines = () => {
    const lines = []

    for (let index = 0; index < configs.numberOfStrokeLines; index++) {
      lines.push(
        <line
          {...getLineConfig(configs, index)}
          onTransitionEnd={handleLineAnimationEndIndex(index)}
          key={`pb-line-${index}`}
        />
      )
    }

    return lines
  }

  return (
    <svg
      width={configs.size}
      height={configs.size}
      viewBox={`0 0 ${configs.size} ${configs.size}`}
    >
      <g transform={configs.transform}>{renderLines()}</g>
    </svg>
  )
}

export default CircularProgressBar
