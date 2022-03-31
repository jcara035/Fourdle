const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')

const fourdle = 'FOUR'
let gameInProgress = true
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<'
]

const guessRows = [
    ['','','',''],
    ['','','',''],
    ['','','',''],
    ['','','',''],
    ['','','',''],
    ['','','','']
]
let currentRow = 0
let currentTile = 0

guessRows.forEach((guessRow,guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id','guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

const handleClick = (key) => {
    if (gameInProgress) {
        console.log('clicked', key)
        if (key == '<<') {
            removeLetter()
        }else if (key == 'ENTER') {
            submitGuess()
        }
        else {
            addLetter(key)
        }
    }
    
    
}

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const addLetter = (letter) => {
    if (currentTile < 4 ) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
        console.log('guessRows', guessRows)
    } 
}

const removeLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')

        
    }
}

const submitGuess = () => {
    if (currentTile == 4) {
        const guess = guessRows[currentRow].join('')
        console.log("guess is "+ guess + ", fourdle is " + fourdle)
        if (guess == fourdle) {
            console.log("correct guess, you win in " + (currentRow + 1) + " tries!")
            gameInProgress = false;

        } else {
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            } else {
                console.log("game lost, correct word was " + fourdle)
                gameInProgress = false;
            }
        }
    } else {
        console.log("not enough letters in guess")
    }
    
}