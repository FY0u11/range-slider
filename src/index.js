import "./assets/scss/styles.scss"

const sliders = document.getElementsByClassName('r-slider')


Array.from(sliders).forEach((slider, i) => {
  const circle = document.createElement('div'),
    movingCloud = document.createElement('div'),
    leftCloud = document.createElement('div'),
    rightCloud = document.createElement('div'),
    filledLine = document.createElement('div'),
    getSliderWidth = () => slider.getBoundingClientRect().width,
    getSliderLeftX = () => slider.getBoundingClientRect().left,
    sliderUpdatedEvent = new CustomEvent('r-slider-updated', {
      detail: {
        value: null,
      }
    })


  slider.insertAdjacentElement('afterbegin', circle)
  circle.classList.add('r-slider__circle')

  circle.insertAdjacentElement('afterbegin', movingCloud)
  movingCloud.classList.add('r-slider__cloud', 'r-slider__cloud_moving',
    'r-slider_hidden')

  const circleWidth = circle.getBoundingClientRect().width,
    circleBorderWidth = parseFloat(getStyle(circle, 'border-width')),
    getMovingCloudWidth = () => movingCloud.getBoundingClientRect().width,
    steps = getSteps(),
    getStepWidth = () => (getSliderWidth() - circleWidth) / (steps.length - 1)

  let isDragged = false,
    currentStepIndex = getStartIndex(),
    previousStepIndex = null


  function getStyle(el, property) {
    return document.defaultView.getComputedStyle(el)[property]
  }

  function getSteps() {
    let dataSteps = slider.dataset.steps

    if (!dataSteps) {
      let dataMin = parseInt(slider.dataset.min) || 0

      let dataMax = parseInt(slider.dataset.max)
      dataMax = isNaN(dataMax) ? 100 : dataMax

      let dataStep = parseInt(slider.dataset.step) || 1
      dataStep = dataStep < 0 ? 1 : dataStep

      const steps = []

      let step = dataMin
      while (step <= dataMax) {
        steps.push(step)
        step += dataStep
      }

      return steps
    }

    try {
      dataSteps = JSON.parse(dataSteps)

      if (!Array.isArray(dataSteps)) {
        return null
      }

      if (dataSteps.length < 2) {
        return null
      }

      dataSteps = dataSteps
        .filter(v => typeof v === 'number' || typeof v === 'string')
    } catch (err) {
      return null
    }

    return dataSteps
  }

  function getStartIndex() {
    let dataStartIndex = parseInt(slider.dataset.startIndex) || 0

    return dataStartIndex >= steps.length
      ? steps.length - 1
      : dataStartIndex < 0
        ? 0
        : dataStartIndex
  }

  slider.insertAdjacentElement('afterbegin', leftCloud)
  leftCloud.classList.add('r-slider__cloud', 'r-slider__cloud_left')

  slider.insertAdjacentElement('beforeend', rightCloud)
  rightCloud.classList.add('r-slider__cloud', 'r-slider__cloud_right')

  slider.insertAdjacentElement('beforeend', filledLine)
  filledLine.classList.add('r-slider__filled-line')

  movingCloud.style.visibility = 'visible'

  leftCloud.innerHTML = '' + steps[0]
  rightCloud.innerHTML = '' + steps[steps.length - 1]


  circle.addEventListener('mousedown', () => {
    isDragged = true
  })

  document.addEventListener('mouseup', () => {
    isDragged = false
  })

  document.addEventListener('mousemove', (e) => {
    if (!isDragged) {
      return
    }

    updateCurrentStepIndex(e.clientX)
    render()
  })

  circle.addEventListener('touchstart', () => {
    isDragged = true
  })

  document.addEventListener('touchend', () => {
    isDragged = false
  })

  document.addEventListener('touchmove', (e) => {
    if (!isDragged) {
      return
    }

    updateCurrentStepIndex(e.touches[0].clientX)
    render()
  })

  window.addEventListener('resize', () => {
    render(true)
  })

  slider.addEventListener('click', (e) => {
    updateCurrentStepIndex(e.clientX)
    render()
  })

  render()

  function updateCurrentStepIndex(clientX) {
    currentStepIndex = Math.round((clientX - getSliderLeftX()
      - circleWidth/2) / getStepWidth())

    currentStepIndex = currentStepIndex >= steps.length
      ? steps.length - 1
      : currentStepIndex < 0
        ? 0
        : currentStepIndex
  }

  function render(force = false) {
    if (!force && previousStepIndex === currentStepIndex) {
      return
    }

    previousStepIndex = currentStepIndex

    const newLeft = getStepWidth() * currentStepIndex
    circle.style.left = newLeft + 'px'

    leftCloud.style.visibility = currentStepIndex === 0
      ? 'hidden'
      : 'visible'

    rightCloud.style.visibility = currentStepIndex === steps.length - 1
      ? 'hidden'
      :  'visible'

    movingCloud.innerHTML = '' + steps[currentStepIndex]
    movingCloud.style.left = -(circleBorderWidth + getMovingCloudWidth()/2
      - circleWidth/2) + 'px'

    filledLine.style.width = newLeft + circleWidth/2 + 'px'

    sliderUpdatedEvent.detail.value = steps[currentStepIndex]
    slider.dispatchEvent(sliderUpdatedEvent)
  }
})
