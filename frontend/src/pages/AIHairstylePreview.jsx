import { useState } from 'react'
import { useToast } from '../components/ToastProvider'
import ImageUploader from '../components/ImageUploader'
import HairstyleSelector from '../components/HairstyleSelector'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import AIResultCard from '../components/AIResultCard'
import { getPreviewImage, hairstyles } from '../data/hairstyles'

const DEMO_SELFIE =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=60'

export default function AIHairstylePreview() {
  const [step, setStep] = useState('upload') // upload -> select -> generating -> results
  const [uploadedImage, setUploadedImage] = useState(null)
  const [selectedHairstyle, setSelectedHairstyle] = useState('')
  const [previewImage, setPreviewImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const toast = useToast()

  const handleImageSelect = (image) => {
    setUploadedImage(image)
    toast.success('Photo uploaded! Now select a hairstyle.')
  }

  const handleHairstyleSelect = (hairstyleId) => {
    setSelectedHairstyle(hairstyleId)
  }

  const handleGeneratePreview = () => {
    if (!uploadedImage) {
      toast.error('Please upload a photo first')
      return
    }
    if (!selectedHairstyle) {
      toast.error('Please select a hairstyle')
      return
    }

    // Simulate AI generation process
    setIsGenerating(true)
    setStep('generating')

    // Mock generation (in production, this would call an AI service)
    setTimeout(() => {
      const generatedImage = getPreviewImage(selectedHairstyle)
      setPreviewImage(generatedImage)
      setIsGenerating(false)
      setStep('results')
      toast.success('Preview ready! Check out how you would look.')
    }, 2400) // Simulate 2.4s processing time
  }

  const handleReset = () => {
    setStep('upload')
    setUploadedImage(null)
    setSelectedHairstyle('')
    setPreviewImage(null)
    setIsGenerating(false)
  }

  return (
    <div className="page-content ai-hairstyle-preview-page">
      <div className="ai-hero">
        <div className="ai-header">
          <span className="eyebrow">✨ AI-Powered</span>
          <h1>Try Hairstyles Before You Book</h1>
          <p>Upload a selfie and see how different hairstyles look on you with our AI preview</p>
        </div>
      </div>

      <div className="ai-preview-container glass-panel">
        {step === 'upload' && (
          <div className="ai-step">
            <ImageUploader onImageSelect={handleImageSelect} isLoading={isGenerating} />
          </div>
        )}

        {(step === 'select' || step === 'upload') && uploadedImage && (
          <div className="ai-step">
            <HairstyleSelector selectedHairstyle={selectedHairstyle} onSelect={handleHairstyleSelect} disabled={isGenerating} />
            <div className="ai-actions">
              <button className="button button-secondary" onClick={() => setUploadedImage(null)}>
                ← Change Photo
              </button>
              <button
                className="button button-primary"
                onClick={() => {
                  if (selectedHairstyle) {
                    handleGeneratePreview()
                  } else {
                    toast.warning('Please select a hairstyle first')
                  }
                }}
                disabled={!selectedHairstyle || isGenerating}
              >
                {isGenerating ? 'Generating Preview...' : 'Generate Preview'}
              </button>
            </div>
          </div>
        )}

        {step === 'generating' && (
          <div className="ai-generating">
            <div className="generating-animation">
              <div className="spinner"></div>
              <h2>Creating your hairstyle preview...</h2>
              <p>Our AI is analyzing your features and generating your new look</p>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>
        )}

        {step === 'results' && uploadedImage && previewImage && (
          <div className="ai-step ai-results">
            <BeforeAfterSlider
              beforeImage={uploadedImage}
              afterImage={previewImage}
              hairstyleName={hairstyles.find((h) => h.id === selectedHairstyle)?.name || 'Selected hairstyle'}
            />
            <AIResultCard
              hairstyleId={selectedHairstyle}
              hairstyleName={hairstyles.find((h) => h.id === selectedHairstyle)?.name}
            />
            <div className="ai-actions">
              <button className="button button-secondary" onClick={handleReset}>
                Try Another Hairstyle
              </button>
            </div>
          </div>
        )}
      </div>

      {step !== 'upload' && (
        <div className="ai-progress">
          <div className={`progress-dot ${step === 'upload' ? 'active' : 'done'}`}>
            <span>📸</span>
            <p>Photo</p>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-dot ${step === 'select' || (step !== 'upload' && step !== 'results') ? 'active' : 'done'}`}>
            <span>💇</span>
            <p>Style</p>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-dot ${step === 'generating' ? 'active' : step === 'results' ? 'done' : ''}`}>
            <span>✨</span>
            <p>Preview</p>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-dot ${step === 'results' ? 'done' : ''}`}>
            <span>🎯</span>
            <p>Book</p>
          </div>
        </div>
      )}
    </div>
  )
}
