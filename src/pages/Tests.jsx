import React, { useState, useRef, useEffect } from 'react'
import { Car, Camera, Plus, AlertTriangle, CheckCircle, Clock, Eye, Settings, Gauge, Shield, Wrench, Zap, X, Upload, ArrowLeft, Play, RotateCcw, Send, Pause } from 'lucide-react'
import { vehicleStore } from '../store/store'

const Tests = () => {
  const [currentView, setCurrentView] = useState('inspection') // 'inspection', 'functional-tests', 'test-execution', 'test-results'
  const [currentTest, setCurrentTest] = useState(null)
  const [testResults, setTestResults] = useState({})
  const [liveReading, setLiveReading] = useState(0)
  const [testDuration, setTestDuration] = useState(0)
  const [testStatus, setTestStatus] = useState('ready') // 'ready', 'running', 'completed'
  const [isTestRunning, setIsTestRunning] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const [showProgressAfterDelay, setShowProgressAfterDelay] = useState(false)
  const vehicle=vehicleStore((state)=>state.currentVehicle)
  console.log(vehicle);
  const [inspectionData, setInspectionData] = useState({
    plateNumber: '',
    vehicleModel: '',
    year: '',
    technicianName: ''
  })

  const [categoryPhotos, setCategoryPhotos] = useState({})
  const fileInputRefs = useRef({})

  const functionalTests = [
    {
      id: 'emission',
      name: 'Emission Test',
      description: 'Measure vehicle emission levels',
      icon: Zap,
      color: 'blue',
      maxValue: 100,
      unit: 'ppm',
      acceptableRange: [0, 50]
    },
    {
      id: 'horn',
      name: 'Horn Test',
      description: 'Test horn sound levels',
      icon: Settings,
      color: 'blue',
      maxValue: 120,
      unit: 'dB',
      acceptableRange: [90, 110]
    },
    {
      id: 'exhaust-noise',
      name: 'Exhaust Noise Test',
      description: 'Measure exhaust noise levels',
      icon: Gauge,
      color: 'blue',
      maxValue: 100,
      unit: 'dB',
      acceptableRange: [0, 85]
    },
    {
      id: 'speedometer',
      name: 'Speedometer Test',
      description: 'Calibrate speedometer accuracy',
      icon: Gauge,
      color: 'blue',
      maxValue: 200,
      unit: 'km/h',
      acceptableRange: [0, 180]
    },
    {
      id: 'speed-governor',
      name: 'Speed Governor Test',
      description: 'Test speed limiting system',
      icon: Shield,
      color: 'blue',
      maxValue: 120,
      unit: 'km/h',
      acceptableRange: [0, 100]
    },
    {
      id: 'side-slip',
      name: 'Side Slip Test',
      description: 'Measure wheel alignment',
      icon: Settings,
      color: 'blue',
      maxValue: 10,
      unit: 'm/km',
      acceptableRange: [0, 5]
    },
    {
      id: 'front-suspension',
      name: 'Front Suspension Test',
      description: 'Test front suspension system',
      icon: Car,
      color: 'blue',
      maxValue: 100,
      unit: '%',
      acceptableRange: [80, 100]
    },
    {
      id: 'rear-suspension',
      name: 'Rear Suspension Test',
      description: 'Test rear suspension system',
      icon: Car,
      color: 'blue',
      maxValue: 100,
      unit: '%',
      acceptableRange: [80, 100]
    },
    {
      id: 'service-brake',
      name: 'Service Brake Test',
      description: 'Test service brake efficiency',
      icon: Shield,
      color: 'blue',
      maxValue: 100,
      unit: '%',
      acceptableRange: [50, 100]
    },
    {
      id: 'parking-brake',
      name: 'Parking Brake Test',
      description: 'Test parking brake efficiency',
      icon: Shield,
      color: 'blue',
      maxValue: 100,
      unit: '%',
      acceptableRange: [16, 100]
    },
    {
      id: 'under-body',
      name: 'Under Body Visual Inspection',
      description: 'Visual inspection using axle play detector',
      icon: Eye,
      color: 'blue',
      maxValue: 100,
      unit: '%',
      acceptableRange: [90, 100]
    },
    {
      id: 'steering-angle',
      name: 'Steering Angle Test',
      description: 'Test steering system angles',
      icon: Settings,
      color: 'blue',
      maxValue: 45,
      unit: '°',
      acceptableRange: [0, 40]
    },
    {
      id: 'headlamp',
      name: 'Headlamp Test',
      description: 'Test headlamp alignment and intensity',
      icon: Eye,
      color: 'blue',
      maxValue: 100,
      unit: 'lux',
      acceptableRange: [75, 100]
    }
  ]

  const inspectionCategories = [
    {
      id: 'headlamps',
      name: 'Headlamps Assembly',
      icon: Eye,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'lights1',
      name: 'Lights',
      icon: Zap,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'lights2',
      name: 'Lights',
      icon: Zap,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'suppressor',
      name: 'Suppressor Cap/High Tension Cable',
      icon: Zap,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'mirrors',
      name: 'Rear View Mirrors',
      icon: Eye,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'safety-glass',
      name: 'Safety Glass (Windscreen)',
      icon: Shield,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'horn',
      name: 'Horn',
      icon: Settings,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'silencer',
      name: 'Silencer',
      icon: Settings,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'wiper',
      name: 'Windscreen Wiper',
      icon: Eye,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'dashboard',
      name: 'Dashboard Equipment',
      icon: Gauge,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'braking',
      name: 'Braking System',
      icon: Settings,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'joint-play',
      name: 'Joint Play Test',
      icon: Wrench,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'speedometer',
      name: 'Speedometer',
      icon: Gauge,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'rear-rupd',
      name: 'Rear Under Run Protection Device (RUPD)',
      icon: Shield,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    },
    {
      id: 'lateral-rupd',
      name: 'Lateral Under Run Protection Device (LURPD)',
      icon: Shield,
      color: 'blue',
      photosRequired: 4,
      status: 'pending'
    }
  ]

  // Timer effect for test execution
  useEffect(() => {
    let interval = null
    if (isTestRunning) {
      interval = setInterval(() => {
        setTestDuration(prev => prev + 1)
        
        // Show progress after 2 seconds
        if (testDuration >= 2 && !showProgressAfterDelay) {
          setShowProgressAfterDelay(true)
        }
        
        // Simulate live reading changes and progress
        if (currentTest && showProgressAfterDelay) {
          const test = functionalTests.find(t => t.id === currentTest.id)
          const randomValue = Math.random() * test.maxValue
          setLiveReading(randomValue)
          
          // Update progress value (0-100%)
          const progress = Math.min((testDuration - 2) * 10, 100) // Progress starts after 2 seconds
          setProgressValue(progress)
          
          // Auto complete test after 12 seconds (10 seconds of progress)
          if (testDuration >= 12) {
            setTestStatus('completed')
            setIsTestRunning(false)
          }
        }
      }, 1000)
    } else if (!isTestRunning && testDuration !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isTestRunning, testDuration, currentTest, showProgressAfterDelay])

  const handleInputChange = (field, value) => {
    setInspectionData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileSelect = (categoryId, photoIndex, event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCategoryPhotos(prev => ({
          ...prev,
          [categoryId]: {
            ...prev[categoryId],
            [photoIndex]: {
              file: file,
              preview: e.target.result,
              name: file.name,
              size: file.size
            }
          }
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoUpload = (categoryId, photoIndex) => {
    const inputId = `${categoryId}-${photoIndex}`
    if (!fileInputRefs.current[inputId]) {
      fileInputRefs.current[inputId] = document.createElement('input')
      fileInputRefs.current[inputId].type = 'file'
      fileInputRefs.current[inputId].accept = 'image/*'
      fileInputRefs.current[inputId].onchange = (e) => handleFileSelect(categoryId, photoIndex, e)
    }
    fileInputRefs.current[inputId].click()
  }

  const handleRemovePhoto = (categoryId, photoIndex) => {
    setCategoryPhotos(prev => {
      const updated = { ...prev }
      if (updated[categoryId]) {
        delete updated[categoryId][photoIndex]
        if (Object.keys(updated[categoryId]).length === 0) {
          delete updated[categoryId]
        }
      }
      return updated
    })
  }

  const handleBulkUpload = (categoryId) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = 'image/*'
    input.onchange = (e) => {
      const files = Array.from(e.target.files).slice(0, 4)
      files.forEach((file, index) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onload = (event) => {
            setCategoryPhotos(prev => ({
              ...prev,
              [categoryId]: {
                ...prev[categoryId],
                [index]: {
                  file: file,
                  preview: event.target.result,
                  name: file.name,
                  size: file.size
                }
              }
            }))
          }
          reader.readAsDataURL(file)
        }
      })
    }
    input.click()
  }

  const startTest = (test) => {
    setCurrentTest(test)
    setCurrentView('test-execution')
    setTestStatus('ready')
    setTestDuration(0)
    setLiveReading(0)
    setProgressValue(0)
    setShowProgressAfterDelay(false)
  }

  const handleStartTest = () => {
    setIsTestRunning(true)
    setTestStatus('running')
  }

  const handleCompleteTest = () => {
    setIsTestRunning(false)
    setTestStatus('completed')
    
    // Save test result
    const finalReading = liveReading
    const test = functionalTests.find(t => t.id === currentTest.id)
    const passed = finalReading >= test.acceptableRange[0] && finalReading <= test.acceptableRange[1]
    
    setTestResults(prev => ({
      ...prev,
      [currentTest.id]: {
        value: finalReading,
        passed: passed,
        duration: testDuration
      }
    }))
    
    setCurrentView('test-results')
  }

  const handleRetryTest = () => {
    setTestDuration(0)
    setLiveReading(0)
    setTestStatus('ready')
    setIsTestRunning(false)
    setProgressValue(0)
    setShowProgressAfterDelay(false)
  }

  const handleSubmitTest = () => {
    setCurrentView('functional-tests')
    setCurrentTest(null)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const renderPhotoSlots = (category) => {
    const slots = []
    const categoryPhotosData = categoryPhotos[category.id] || {}
    
    for (let i = 0; i < category.photosRequired; i++) {
      const photo = categoryPhotosData[i]
      
      slots.push(
        <div key={i} className="relative group">
          {photo ? (
            <div className="aspect-square border-2 border-green-300 rounded-lg overflow-hidden relative bg-green-50">
              <img
                src={photo.preview}
                alt={`${category.name} photo ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <button
                  onClick={() => handleRemovePhoto(category.id, i)}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 truncate">
                {photo.name} ({formatFileSize(photo.size)})
              </div>
              <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1">
                <CheckCircle className="h-3 w-3" />
              </div>
            </div>
          ) : (
            <div
              className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors group"
              onClick={() => handlePhotoUpload(category.id, i)}
            >
              <Camera className="h-6 w-6 text-gray-400 group-hover:text-blue-500 mb-1 transition-colors" />
              <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">Photo {i + 1}</span>
              <span className="text-xs text-gray-400 mt-1">Click to upload</span>
            </div>
          )}
        </div>
      )
    }
    return slots
  }

  const getCategoryStatus = (categoryId) => {
    const photos = categoryPhotos[categoryId] || {}
    const photoCount = Object.keys(photos).length
    const required = 4
    
    if (photoCount === 0) return 'pending'
    if (photoCount < required) return 'in-progress'
    return 'completed'
  }

  const getStatusIcon = (categoryId) => {
    const status = getCategoryStatus(categoryId)
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
  }

  const getTotalPhotos = () => {
    return Object.values(categoryPhotos).reduce((total, categoryData) => {
      return total + Object.keys(categoryData).length
    }, 0)
  }

  const getCompletedCategories = () => {
    return inspectionCategories.filter(category => getCategoryStatus(category.id) === 'completed').length
  }

  const getCompletedTests = () => {
    return Object.keys(testResults).length
  }

  const getRemainingPhotos = (categoryId) => {
    const photos = categoryPhotos[categoryId] || {}
    return 4 - Object.keys(photos).length
  }

  // Render different views based on current state
  if (currentView === 'test-results') {
    const test = functionalTests.find(t => t.id === currentTest.id)
    const result = testResults[currentTest.id]
    const Icon = test.icon
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentView('test-execution')}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Test
            </button>
            <div className="flex items-center">
              <div className={`p-2 bg-blue-100 rounded-lg mr-3`}>
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{test.name}</h2>
                <p className="text-gray-600">{test.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Result Card */}
        <div className="max-w-md mx-auto">
          <div className={`bg-white rounded-lg shadow-sm border-2 ${result.passed ? 'border-green-200' : 'border-red-200'} p-6`}>
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${result.passed ? 'bg-green-100' : 'bg-red-100'}`}>
                <CheckCircle className={`h-8 w-8 ${result.passed ? 'text-green-600' : 'text-red-600'}`} />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Result</h3>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {result.value.toFixed(2)} {test.unit}
              </div>
              <div className={`text-sm font-medium mb-6 ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                {result.passed ? 'Within acceptable range' : 'Outside acceptable range'}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleRetryTest}
                  className="flex-1 flex items-center justify-center px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retry
                </button>
                <button
                  onClick={handleSubmitTest}
                  className="flex-1 flex items-center justify-center px-4 py-2 text-white bg-green-600 border border-green-600 rounded-md hover:bg-green-700 transition-colors"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'test-execution') {
    const test = functionalTests.find(t => t.id === currentTest.id)
    const Icon = test.icon
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentView('functional-tests')}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Tests
            </button>
            <div className="flex items-center">
              <div className={`p-2 bg-blue-100 rounded-lg mr-3`}>
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{test.name}</h2>
                <p className="text-gray-600">{test.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Execution Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Reading */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Live Reading</h3>
            
            <div className="text-center mb-6">
              <div className={`text-6xl font-bold mb-2 ${testStatus === 'completed' ? 'text-green-600' : 'text-blue-600'}`}>
                {showProgressAfterDelay ? liveReading.toFixed(1) : '0.0'}
              </div>
              <div className="text-gray-500">{test.unit}</div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>0</span>
                <span>{test.maxValue} {test.unit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    testStatus === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${showProgressAfterDelay ? (liveReading / test.maxValue) * 100 : 0}%` }}
                ></div>
              </div>
              {showProgressAfterDelay && (
                <div className="text-center text-sm text-gray-600 mt-2">
                  Progress: {progressValue.toFixed(0)}%
                </div>
              )}
            </div>

            {/* Test Status */}
            {testStatus === 'completed' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="text-green-800 font-medium">Test Completed</div>
                <div className="text-green-600 text-sm">Final reading: {liveReading.toFixed(2)} {test.unit}</div>
              </div>
            )}

            {/* Action Buttons */}
            {testStatus === 'ready' && (
              <button
                onClick={handleStartTest}
                className="w-full flex items-center justify-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Test
              </button>
            )}

            {testStatus === 'running' && (
              <button
                onClick={() => setIsTestRunning(false)}
                className="w-full flex items-center justify-center px-6 py-3 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Pause className="h-5 w-5 mr-2" />
                Pause Test
              </button>
            )}

            {testStatus === 'completed' && (
              <button
                onClick={handleCompleteTest}
                className="w-full flex items-center justify-center px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Complete Test
              </button>
            )}
          </div>

          {/* Test Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Test Information</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Test Duration</span>
                <span className="font-medium">{testDuration}s</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Maximum Value</span>
                <span className="font-medium">{test.maxValue} {test.unit}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Current Reading</span>
                <span className="font-medium">{showProgressAfterDelay ? liveReading.toFixed(2) : '0.00'} {test.unit}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Acceptable Range</span>
                <span className="font-medium">{test.acceptableRange[0]} - {test.acceptableRange[1]} {test.unit}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  testStatus === 'ready' ? 'bg-gray-100 text-gray-800' :
                  testStatus === 'running' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {testStatus === 'ready' ? 'Ready' : testStatus === 'running' ? 'Running' : 'Completed'}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-medium text-blue-600 mb-3">Test Instructions</h4>
              <ul className="space-y-2 text-sm text-blue-600">
                <li>• Click "Start Test" to begin the measurement</li>
                <li>• Progress will show after 2 seconds</li>
                <li>• Monitor the live readings on the gauge</li>
                <li>• Test will auto-complete after 12 seconds</li>
                <li>• Click "Complete Test" to finish and view results</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'functional-tests') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Functional Tests</h2>
                <p className="text-gray-600">Complete all vehicle functional tests</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Progress</div>
              <div className="text-lg font-semibold text-gray-900">{getCompletedTests()}/13</div>
            </div>
          </div>

          {/* Vehicle Information Display */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plate Number</label>
              <div className="text-gray-900 font-medium">{inspectionData.plateNumber || 'Not specified'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model</label>
              <div className="text-gray-900 font-medium">{inspectionData.vehicleModel || 'Not specified'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <div className="text-gray-900 font-medium">{inspectionData.year || 'Not specified'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technician Name</label>
              <div className="text-gray-900 font-medium">{inspectionData.technicianName || 'Not specified'}</div>
            </div>
          </div>
        </div>

        {/* Functional Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {functionalTests.map((test) => {
            const Icon = test.icon
            const result = testResults[test.id]
            const isCompleted = !!result
            
            return (
              <div key={test.id} className={`bg-white rounded-lg shadow-sm border-2 p-6 ${
                isCompleted ? (result.passed ? 'border-green-200' : 'border-red-200') : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-2 bg-blue-100 rounded-lg mr-3`}>
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{test.name}</h3>
                      <p className="text-sm text-gray-500">{test.description}</p>
                    </div>
                  </div>
                  {isCompleted && (
                    <CheckCircle className={`h-5 w-5 ${result.passed ? 'text-green-500' : 'text-red-500'}`} />
                  )}
                </div>

                {isCompleted && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900">Test Result</div>
                    <div className="text-lg font-bold text-gray-900">{result.value.toFixed(2)} {test.unit}</div>
                    <div className={`text-sm ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                      {result.passed ? 'Within acceptable range' : 'Outside acceptable range'}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => startTest(test)}
                        className="flex-1 text-xs text-gray-600 border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
                      >
                        Retry
                      </button>
                      <button className="flex-1 text-xs text-white bg-green-600 rounded px-2 py-1 hover:bg-green-700">
                        Submit
                      </button>
                    </div>
                  </div>
                )}

                {!isCompleted && (
                  <button
                    onClick={() => startTest(test)}
                    className="w-full flex items-center justify-center px-4 py-2 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Test
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Default inspection view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <Car className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Vehicle Inspection</h2>
              <p className="text-gray-600">Upload photos for each inspection category (optional)</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Progress</div>
            <div className="text-lg font-semibold text-gray-900">{getCompletedCategories()}/15</div>
          </div>
        </div>

        {/* Vehicle Information Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plate Number</label>
            {/* <input
              type="text"
              value={inspectionData.plateNumber}
              onChange={(e) => handleInputChange('plateNumber', e.target.value)}
              placeholder="Enter plate number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            /> */}
            <div className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>{vehicle.RegistrationNumber}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Model</label>
            {/* <input
              type="text"
              value={inspectionData.vehicleModel}
              onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
              placeholder="Enter vehicle model"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            /> */}
             <div className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>{vehicle.VechicleType}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            {/* <input
              type="text"
              value={inspectionData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              placeholder="Enter year"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            /> */}
                   <div className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>{vehicle.VechicleType}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Technician Name</label>
            <input
              type="text"
              value={inspectionData.technicianName}
              onChange={(e) => handleInputChange('technicianName', e.target.value)}
              placeholder="Enter technician name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Inspection Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {inspectionCategories.map((category) => {
          const Icon = category.icon
          const remainingPhotos = getRemainingPhotos(category.id)
          const status = getCategoryStatus(category.id)
          
          return (
            <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`p-2 bg-blue-100 rounded-lg mr-3`}>
                    <Icon className={`h-5 w-5 text-blue-600`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
                    <p className="text-xs text-gray-500">{category.photosRequired} photos (optional)</p>
                  </div>
                </div>
                {getStatusIcon(category.id)}
              </div>

              {/* Photo Upload Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {renderPhotoSlots(category)}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {remainingPhotos > 0 && (
                  <button 
                    onClick={() => handleBulkUpload(category.id)}
                    className="w-full flex items-center justify-center px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Add Photos ({remainingPhotos} remaining)
                  </button>
                )}
                
                {status === 'completed' && (
                  <div className="w-full flex items-center justify-center px-3 py-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Complete
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Camera className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Total Photos: {getTotalPhotos()}/60</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Categories Complete: {getCompletedCategories()}/15</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-blue-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Ready to proceed</span>
            </div>
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => setCurrentView('functional-tests')}
            >
              Next
            </button>
          </div>
        </div>
        
        <div className="mt-3 text-sm text-blue-600">
          <Clock className="h-4 w-4 inline mr-1" />
          Inspection Progress: All fields and photos are optional. You can proceed to functional tests at any time.
        </div>
      </div>
    </div>
  )
}

export default Tests