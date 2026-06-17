import { useState } from 'react'

export default function BeforeAfterSlider({ beforeImage, afterImage, hairstyleName }) {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleMouseMove = (e) => {
    const container = e.currentTarget
    const rect = container.getBoundingClientRect()
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, newPosition)))
  }

  const handleTouchMove = (e) => {
    const container = e.currentTarget
    const rect = container.getBoundingClientRect()
    const touch = e.touches[0]
    const newPosition = ((touch.clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, newPosition)))
  }

  return (
    <div className="before-after-slider">
      <h2>Your {hairstyleName} Preview</h2>
      <p className="subtitle">Drag to compare before and after</p>
      <div
        className="slider-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setSliderPosition(50)}
        onTouchMove={handleTouchMove}
      >
        {/* Before image */}
        <div className="slider-image">
          <img src={beforeImage} alt="Before" />
          <div className="label before">Before</div>
        </div>

        {/* After image */}
        <div className="slider-image after-layer" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
          <img src={afterImage} alt="After" />
          <div className="label after">After</div>
        </div>

        {/* Slider handle */}
        <div className="slider-handle" style={{ left: `${sliderPosition}%` }}>
          <div className="slider-arrow"></div>
        </div>
      </div>

      <div className="slider-help">
        <span>← Swipe to compare →</span>
      </div>
    </div>
  )
}
