export function useWave(
  containerRef: any,
  options: {
    numberOfLines?: number
    startAmplitude?: number
    amplitudeStep?: number
    startFrequency?: number
    frequencyStep?: number
    lineColor?: string
    startOpacitySpeed?: number
    opacitySpeedStep?: number
    lineWidth?: number
    speed?: number
    setCanvasSize?: Function
    style?: string
  } = {}
) {
  const {
    numberOfLines = 5,
    startAmplitude = 15,
    amplitudeStep = 4,
    startFrequency = 0.02,
    frequencyStep = 0.005,
    lineColor = 'rgba(56, 108, 225, 1)',
    startOpacitySpeed = 0.05,
    opacitySpeedStep = 0.01,
    lineWidth = 1,
    speed = 0.2,
    style = 'position: absolute; bottom: 0; left: 0;'
  } = options

  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let animationFrameId: number | null = null

  const setCanvasSize = options?.setCanvasSize
    ? options?.setCanvasSize
    : (canvasElement: HTMLCanvasElement) => {
        if (canvasElement) {
          const rect = containerRef.value.getBoundingClientRect()
          canvasElement.width = rect.width
          canvasElement.height = rect.height
        }
      }

  let currentSpeed = 0 // 当前速度
  let opacityTime = 0 // 独立的透明度时间变量
  const draw = () => {
    if (!ctx || !canvas) return

    setCanvasSize(canvas) // 更新 canvas 大小
    ctx.clearRect(0, 0, canvas.width, canvas.height) // 清空画布

    for (let j = 0; j < numberOfLines; j++) {
      ctx.beginPath()
      ctx.lineWidth = lineWidth

      const opacitySpeed = startOpacitySpeed + j * opacitySpeedStep
      const opacity = Math.abs(Math.sin(opacityTime * opacitySpeed) * 0.1)
      ctx.strokeStyle = `${lineColor.replace(/1\)$/, `${opacity})`)}`

      const frequency = startFrequency + j * frequencyStep
      const amplitude = startAmplitude + j * amplitudeStep
      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin(x * frequency + (j * Math.PI) / numberOfLines + currentSpeed * 0.1) * amplitude
        ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    currentSpeed += speed // 控制波动速度
    opacityTime += 0.1 // 增加透明度变化时间
    animationFrameId = requestAnimationFrame(draw)
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

    setCanvasSize(canvas) // 初始设置大小
    window.addEventListener('resize', setCanvasSize(canvas)) // 监听窗口调整大小
    draw() // 开始绘制
  })

  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
    window.removeEventListener('resize', setCanvasSize()) // 卸载事件
  })
}
