import React, { useRef, useEffect, useMemo } from 'react'

const Matrix = () => {
  const width = 256
  const height = 128
  const canvasRef = useRef(null)
  const steps = 32

  const colors = useMemo(() => {
    const colorComponents = []
    for (let r = 0; r < steps; r++) {
      for (let g = 0; g < steps; g++) {
        for (let b = 0; b < steps; b++) {
          const redComponent = Math.floor((r * 255) / (steps - 1))
          const greenComponent = Math.floor((g * 255) / (steps - 1))
          const blueComponent = Math.floor((b * 255) / (steps - 1))
          colorComponents.push(
            `${redComponent},${greenComponent},${blueComponent}`
          )
        }
      }
    }
    return colorComponents
  }, [])

  const fillCanvas = (ctx) => {
    const shuffled = [...colors]
    shuffled.sort(() => Math.random() - 0.5)
    let indexColor = 0
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const color = shuffled[indexColor]
        ctx.fillStyle = `rgb(${color})`
        ctx.fillRect(x, y, 1, 1)
        indexColor++
      }
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      setInterval(() => {
        fillCanvas(ctx)
      }, 500)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ backgroundColor: 'black' }}
    />
  )
}

export default Matrix
