import {wordsArray} from './words.js'

const $wordElm = document.querySelector('[data-word]')
const text = document.querySelector('[data-text]')
const $scoreElm = document.querySelector('[data-score]')
const $timeElm = document.querySelector('[data-time]')
const $endGameElm = document.querySelector('[data-end-game-container]')
const settingsBtn = document.querySelector('[data-settings-btn]')
const settings = document.querySelector('[data-settings]')
const settingsForm = document.querySelector('[data-settings-form]')
const difficultySelection = document.querySelector('[difficulty]')

let randomWord
let score = 0
let time = 10

let difficulty = 
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty') 
    : 'medium'

difficultySelection.value = 
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium'

.text.focus()

// Start countint down
const timeInterval = setInterval(updateTime, 1000)

function getRandomWord() {
  return wordsArray[Math.floor(Math.random() * wordsArray.length)]
}

// Add word to the DOM
function addWordDOM() {
  randomWord = getRandomWord()
  $wordElm.innerHTML = randomWord
}

// Update score 
function updateScore() {
  score++
  $scoreElm.innerHTML = score
}

// Update time
function updateTime() {
  time--
  $timeElm.innerHTML = `${time}s`

  if (time === 0) {
    clearInterval(timeInterval)
    gameOver()
  }
}

// Game over & show end screen
function gameOver() {
  $endGameElm.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onClick='location.reload()'>Reload</button>
  `

  $endGameElm.style.display = 'flex'
}

addWordDOM()

//Event listeners
//Typing
text.addEventListener('input', e => {
  const instertedText = e.target.value

  if (instertedText === randomWord) {
    addWordDOM()
    updateScore()

    // Clear
    a.target.value = ''

    if (difficulty === 'hard') {
      time += 2
    } else if (difficulty === 'medium') {
      time += 3
    } else {
      time += 5
    }
    updateTime()
  }
})

// Setttings button click event
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'))

// Settings selection
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value
  localStorage.setItem('difficulty', difficulty)
})
