import { useState } from 'react'

export default function ImageUploader({ onImageSelect, isLoading }) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      processFile(files[0])
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const processFile = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target.result
        setPreview(dataUrl)
        onImageSelect(dataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="image-uploader">
      {!preview ? (
        <div
          className={`upload-area ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="upload-icon">📸</div>
          <h3>Upload Your Selfie</h3>
          <p>Drag and drop your photo here or click to browse</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            disabled={isLoading}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input" className="button button-primary">
            {isLoading ? 'Processing...' : 'Choose Photo'}
          </label>
        </div>
      ) : (
        <div className="preview-container">
          <img src={preview} alt="Your selfie" className="preview-image" />
          <button
            className="button button-secondary"
            onClick={() => {
              setPreview(null)
              onImageSelect(null)
            }}
            disabled={isLoading}
          >
            Change Photo
          </button>
        </div>
      )}
    </div>
  )
}
