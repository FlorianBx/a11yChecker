function updateProgress() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  const totalCheckboxes = checkboxes.length
  const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked').length

  const percentage = Math.round((checkedCheckboxes / totalCheckboxes) * 100)

  const progressFill = document.getElementById('progressFill')
  const progressText = document.getElementById('progressText')

  progressFill.style.width = `${percentage}%`
  progressText.textContent = `${percentage}%`
  if (percentage === 100) {
    // progressText.style.color = '#efefef'
    progressText.style.color = '#000'
    progressFill.style.backgroundColor = '#27a07f'
  } else {
    progressText.style.color = '#222'
    progressFill.style.backgroundColor = '#278aa0'
  }
}

function resetProgress() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false
  })
  localStorage.removeItem('accessibilityChecklist')
  updateProgress()
}

function saveProgress() {
  const checkboxStates = {}
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkboxStates[checkbox.id] = checkbox.checked
  })
  localStorage.setItem('accessibilityChecklist', JSON.stringify(checkboxStates))
}

function loadProgress() {
  const savedStates = localStorage.getItem('accessibilityChecklist')
  if (savedStates) {
    const checkboxStates = JSON.parse(savedStates)
    Object.entries(checkboxStates).forEach(([id, checked]) => {
      const checkbox = document.getElementById(id)
      if (checkbox) {
        checkbox.checked = checked
      }
    })
    updateProgress()
  }
}

document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    updateProgress()
    saveProgress()
  })
})

document.addEventListener('DOMContentLoaded', loadProgress)
