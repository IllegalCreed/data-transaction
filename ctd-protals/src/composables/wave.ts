import type { Ref } from 'vue'

const NUMBER_OF_LINES = 5
const DEFAULT_AMPLITUDE = 15
const DEFAULT_FREQUENCY = 0.02
const DEFAULT_LINE_COLOR = '#386CE1'
const DEFAULT_OPACITY_SPEED = 5
const DEFAULT_OPACITY = 0.1
const DEFAULT_OPACITY_UPPER_LIMIT = 0.1
const DEFAULT_OPACITY_LOWER_LIMIT = 0
const DEFAULT_LINE_WIDTH = 1
const DEFAULT_SPEED = 1
const DEFAULT_STYLE = 'position: absolute; bottom: 0; left: 0;'
const TIME_STEP = 0.01
const OPACITY_TIME_STEP = 0.001

export function useWave(
  containerRef: Ref<HTMLElement | null>,
  options: {
    numberOfLines?: number
    amplitude?: number | number[] // 振幅
    frequency?: number | number[] // 频率
    lineColor?: string | string[]
    opacity?: number | number[]
    opacityUpperLimit?: number | number[]
    opacityLowerLimit?: number | number[]
    opacitySpeed?: number | number[]
    lineWidth?: number | number[]
    speed?: number | number[]
    setCanvasSize?: Function
    style?: string
  } = {}
) {
  const {
    numberOfLines = NUMBER_OF_LINES,
    amplitude = DEFAULT_AMPLITUDE,
    frequency = DEFAULT_FREQUENCY,
    lineColor = DEFAULT_LINE_COLOR,
    opacity = DEFAULT_OPACITY,
    opacityUpperLimit = DEFAULT_OPACITY_UPPER_LIMIT,
    opacityLowerLimit = DEFAULT_OPACITY_LOWER_LIMIT,
    opacitySpeed = DEFAULT_OPACITY_SPEED,
    lineWidth = DEFAULT_LINE_WIDTH,
    speed = DEFAULT_SPEED,
    style = DEFAULT_STYLE
  } = options
  const lineWidths = createArray(lineWidth, numberOfLines, DEFAULT_LINE_WIDTH)
  const opacities = createArray(opacity, numberOfLines, DEFAULT_OPACITY)
  const upperLimits = createArray(opacityUpperLimit, numberOfLines, DEFAULT_OPACITY_UPPER_LIMIT)
  const lowerLimits = createArray(opacityLowerLimit, numberOfLines, DEFAULT_OPACITY_LOWER_LIMIT)
  const opacitySpeeds = createArray(opacitySpeed, numberOfLines, DEFAULT_OPACITY_SPEED)
  const speeds = createArray(speed, numberOfLines, DEFAULT_SPEED)
  const amplitudes = createArray(amplitude, numberOfLines, DEFAULT_AMPLITUDE)
  const frequencies = createArray(frequency, numberOfLines, DEFAULT_FREQUENCY)
  const lineColors = createArray(lineColor, numberOfLines, DEFAULT_LINE_COLOR)
  const setCanvasSize = options?.setCanvasSize
    ? options?.setCanvasSize
    : (canvasElement: HTMLCanvasElement) => {
        if (canvasElement) {
          const rect = containerRef.value?.getBoundingClientRect()
          canvasElement.width = rect ? rect.width : 0
          canvasElement.height = rect ? rect.height : 0
        }
      }

  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let animationFrameId: number | null = null

  let currentTime = 0
  let opacityTime = 0

  const draw = () => {
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let j = 0; j < numberOfLines; j++) {
      ctx.beginPath()
      ctx.lineWidth = lineWidths[j]

      const opacitySpeedValue = opacitySpeeds[j]
      const initialOpacityPercentage = opacities[j]
      const requiredTimeOffset = Math.asin(initialOpacityPercentage) / opacitySpeeds[j]
      const opacityPercentage = Math.abs(
        Math.sin((opacityTime + requiredTimeOffset) * opacitySpeedValue)
      )
      const currentOpacity = (upperLimits[j] - lowerLimits[j]) * opacityPercentage + lowerLimits[j]
      const rgbaColor = hexToRgba(lineColors[j], currentOpacity)
      ctx.strokeStyle = rgbaColor

      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin(x * frequencies[j] + (j * Math.PI) / numberOfLines + currentTime * speeds[j]) *
            amplitudes[j]
        ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    currentTime += TIME_STEP
    opacityTime += OPACITY_TIME_STEP
    animationFrameId = requestAnimationFrame(draw)
  }

  function createArray<T>(input: T | T[], numberOfLines: number, defaultValue: T): T[] {
    if (Array.isArray(input)) {
      return [
        ...input.slice(0, numberOfLines),
        ...Array(Math.max(0, numberOfLines - input.length)).fill(defaultValue)
      ]
    }
    return Array(numberOfLines).fill(input)
  }

  function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  onMounted(() => {
    if (!containerRef.value) {
      console.error('Container reference is not available.')
      return
    }

    canvas = document.createElement('canvas')
    canvas.style.cssText = style
    ctx = canvas.getContext('2d')
    containerRef.value.appendChild(canvas)

    setCanvasSize(canvas)
    useEventListener(window, 'resize', () => {
      setCanvasSize(canvas)
    })
    draw()
  })

  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  })
}
