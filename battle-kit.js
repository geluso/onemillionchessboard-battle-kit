let PIECE_ID = '927372'

const TIMEOUT_DELAY = 10
const SQUARE_SIZE = 28

const allTextElements = document.querySelectorAll('p');
let isBlack = true; // Default to black if can't determine
let color = 'black'

const MODES = ['DEFAULT', 'COLLECT']
let MODE = 'COLLECT'
let STEP_SIZE = 1
let COLLECTED_PIECE_IDS = new Set()

let IS_WORLD_EATER_ENABLED = true
let STEP_SIZE_BUTTONS = []
let MAX_STEP_SIZE = 34

for (const element of allTextElements) {
  const text = element.textContent.toLowerCase();
  if (text.includes('playing black')) {
    isBlack = true;
    color = 'black'
    break;
  } else if (text.includes('playing white')) {
    isBlack = false;
    color = 'white'
    break;
  }
}

const oldControls = document.getElementById('controls')
if (oldControls) {
  oldControls.remove()
}

const controls = document.createElement('div')
controls.style.backgroundColor = 'black'
controls.style.width = '200px'
controls.id = 'controls'
controls.style.position = 'absolute'
controls.style.top = 0
controls.style.left = 0

const title = document.createElement('p')
title.textContent = 'Macros'
controls.appendChild(title)

const worldEaterContainer = document.createElement('div')
const worldEaterLabel = document.createElement('label')
const worldEaterCheckbox = document.createElement('input')
const worldEaterText = document.createElement('span')
worldEaterText.textContent = 'World Eater'
worldEaterCheckbox.type = 'checkbox'
worldEaterCheckbox.checked = IS_WORLD_EATER_ENABLED

worldEaterCheckbox.addEventListener('change', () => {
  IS_WORLD_EATER_ENABLED = worldEaterCheckbox.checked
})

worldEaterLabel.appendChild(worldEaterCheckbox)
worldEaterLabel.appendChild(worldEaterText)
worldEaterContainer.appendChild(worldEaterLabel)
controls.appendChild(worldEaterContainer)

const idListContainer = document.createElement('div')
const idListTitle = document.createElement('p')
idListTitle.textContent = 'Control Group'
const idListClear = document.createElement('button')
idListClear.addEventListener('click', () => removeAllIdsFromList())

const startCollectButton = document.createElement('button')
const stopCollectButton = document.createElement('button')
startCollectButton.textContent = 'Collect'
stopCollectButton.textContent = 'Stop'
if (MODE === 'COLLECT') {
  startCollectButton.disabled = true
} else {
  stopCollectButton.disabled = true
}

const stepSizeTitle = document.createElement('p')
stepSizeTitle.textContent = 'Set Step Size'
controls.appendChild(stepSizeTitle)

let row = document.createElement('div')
for (let i = 1; i <= MAX_STEP_SIZE; i++) {
  const button = document.createElement('button')
  button.className = 'set-step-size-button'
  button.textContent = i
  row.appendChild(button)
  STEP_SIZE_BUTTONS.push(button)
  
  button.addEventListener('click', () => setStepSize(i))
  
  if (i % 6 === 0) {
    controls.appendChild(row)
    row = document.createElement('div')
  }
}

if (row.firstChild) {
  controls.appendChild(row)
}

highlightCurrentStepSize()

const idList = document.createElement('div')
rebuildPieceIdList()

startCollectButton.addEventListener('click', startCollect)
stopCollectButton.addEventListener('click', stopCollect)

idListContainer.appendChild(idListTitle)
idListContainer.appendChild(startCollectButton)
idListContainer.appendChild(stopCollectButton)
idListContainer.appendChild(idList)

document.body.appendChild(controls)
controls.appendChild(idListContainer)

function setStepSize(i) {
  STEP_SIZE = i
  highlightCurrentStepSize()
}

function highlightCurrentStepSize() {
  STEP_SIZE_BUTTONS.forEach(button => {
    if (button.textContent === '' + STEP_SIZE) {
      button.style.backgroundColor = 'yellow'
    } else {
      button.style.backgroundColor = ''
    }
  })
}

function startCollect() {
  console.log('startCollect')
  MODE = 'COLLECT'
  startCollectButton.disabled = true
  stopCollectButton.disabled = false
}

function stopCollect() {
  console.log('stopCollect')
  MODE = 'DEFAULT'
  startCollectButton.disabled = false
  stopCollectButton.disabled = true
}

function rebuildPieceIdList() {
  removeAllIdsFromList()
  COLLECTED_PIECE_IDS.forEach(addPieceIdToList)
}

function addPieceIdToList(id) {
  const piece = getPieceElementById(id)
  if (!piece) {
    console.log('addPieceIdToList ID not found', id)
    return
  }

  if (COLLECTED_PIECE_IDS.has(id)) {
    console.log('addPieceIdToList ID already collected', id)
    return
  }

  COLLECTED_PIECE_IDS.add(id)
  console.log('COLLECTED', COLLECTED_PIECE_IDS)

  console.log('addPieceIdToList', id)
  const li = document.createElement('div')
  const o = document.createElement('button')
  const x = document.createElement('button')
  const img = document.createElement('img')
  const idText = document.createElement('span')

  o.textContent = 'O'
  o.addEventListener('click', () => centerOnPiece(id))

  x.textContent = 'X'
  x.addEventListener('click', () => removeIdFromList(id))

  img.src = piece.firstChild.src
  img.style.width = '28px'
  img.style.display = 'inline'
  idText.textContent = 'ID:' + id

  // TODO add hover effect for piece

  li.appendChild(img)
  li.appendChild(idText)
  li.appendChild(o)
  li.appendChild(x)

  idList.appendChild(li) 
}

function centerOnPiece(id) {
  const piece = getPieceElementById(id)
  const paragraphs = [...document.getElementsByTagName('p')].filter(pp => pp.textContent.includes(','))
  if (paragraphs.length >= 2) {
    // get the second paragraph under the piece picture in the starcraft display
    const locationHash = paragraphs[1].textContent
    window.location.hash = locationHash
  }
}

function removeIdFromList(id) {
  if (!COLLECTED_PIECE_IDS.has(id)) {
    console.log('removeIdFromList does not contain ID:', id)
    return
  }

  console.log('removeIdFromList', id)
  COLLECTED_PIECE_IDS.delete(id)
  idList.childNodes.forEach(el => {
    if (el.textContent.includes('ID:'+id)) {
      el.remove()
    }
  })
}

function removeAllIdsFromList() {
  COLLECTED_PIECE_IDS = new Set()
  COLLECTED_PIECE_IDS.add(PIECE_ID)
  console.log('removeAllIdsFromList')
  while (idList.firstChild) {
    idList.firstChild.remove()
  }
}

function getPieceElementById(id) {
  const piece = document.querySelector(`[data-id="${id}"]`);
  return piece
}

document.addEventListener('click', ev => {
  const el = ev.srcElement
  if (el.tagName === 'IMG' && el.src.includes(color + "-") && el.parentElement.tagName === 'BUTTON') {
    let id = el.parentElement.getAttribute('data-id')
    PIECE_ID = id

    if (MODE === 'COLLECT') {
      addPieceIdToList(id)
    } else {
      removeAllIdsFromList()
    }

    if (el.src && el.src.includes("king")) {
      const king = el.parentElement
      const kingId = parseInt(king.getAttribute('data-id'))
      console.log('clicked king', kingId)
      let sampledKingId = 26284941
      let sampledQueenRookPawnId = 26284929
      let sampledKingRookPawnId = 26284936
      let sampledQueenRookId = 26284937
      let sampledKingRookId = 26284944

      let queenRookPawnId = kingId - (sampledKingId - sampledQueenRookPawnId)
      let kingRookPawnId = kingId - (sampledKingId - sampledKingRookPawnId)
      let queenRookId = kingId - (sampledKingId - sampledQueenRookId)
      let kingRookId = kingId - (sampledKingId - sampledKingRookId)

      console.log({queenRookPawnId, kingRookPawnId, queenRookId, kingRookId})

      const queenRookPawn = document.querySelector(`[data-id="${queenRookPawnId}"]`);
      const kingRookPawn = document.querySelector(`[data-id="${kingRookPawnId}"]`);
      const queenRook = document.querySelector(`[data-id="${queenRookId}"]`);
      const kingRook = document.querySelector(`[data-id="${kingRookId}"]`);

      let commandDelay = 0 
      let commandDelayIncrement = 500
      // Move pawns two spaces up and connect rooks
      setTimeout(() => movePieceForward(queenRookPawnId, 'up', 2), commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'up', 2),     commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookPawnId, 'up', 2),  commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'up', 2),      commandDelay)
      commandDelay += commandDelayIncrement

      setTimeout(() => movePieceForward(kingRookId, 'left', 3),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'right', 3),      commandDelay)
      commandDelay += commandDelayIncrement

      setTimeout(() => movePieceForward(kingRookId, 'up', 4),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'up', 4),      commandDelay)
      commandDelay += commandDelayIncrement

      setTimeout(() => movePieceForward(kingRookId, 'up'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'up'),      commandDelay)
      commandDelay += commandDelayIncrement

      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'right'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'left'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'right'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'left'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'right'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'left'),      commandDelay)

      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'down'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'down'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'left'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'right'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'left'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'right'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'left'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'right'),      commandDelay)
    }
  }
})

function getAllPieces(pieceType) {
  const allButtons = document.querySelectorAll('button');
  const myPieces = Array.from(allButtons).filter(button => {
    const img = button.querySelector('img');
    return img && img.src && img.src.includes(`${isBlack ? 'black' : 'white'}-processed`);
  });
  
  
  // Filter for pawns only (optional - remove this filter to move all pieces)
  const pieces = myPieces.filter(piece => {
    const img = piece.querySelector('img');
    return img && img.src.includes(`/${pieceType}.png`);
  });
  return pieces
}

function getAllQueens() {
  return getAllPieces('queen')
}

document.addEventListener('keydown', ev => {
  let move = 'none'

  if (ev.which === 72) { // H - move knights randomly
    moveKnightsRandomly();
    return
  }

  
  if (ev.which === 80) { // P - advance all pawns
    advanceAllPawns();
    return
  }
  
  if (ev.which === 70) { // F - select next queen
    const queens = getAllQueens();
    if (queens.length > 0) {
      const currentIndex = queens.findIndex(q => q.dataset.id === PIECE_ID);
      const nextIndex = (currentIndex + 1) % queens.length;
      PIECE_ID = queens[nextIndex].dataset.id;
    }
    return
  }
  if (ev.which === 67) { // C - toggle collect mode
    if (MODE === 'DEFAULT') {
      startCollect()
    } else {
      stopCollect()
    }
    return
  }

  if (ev.which >= 49 && ev.which <= 57) { // 1-9 keys
    STEP_SIZE = ev.which - 48; // Convert ASCII to number (49-57 -> 1-9)
    if (STEP_SIZE === 9) {
      STEP_SIZE = 31
    }
    console.log('STEP_SIZE now', STEP_SIZE)
    return
  }
  
  if (ev.which === 65) { // A - left
    move = 'left'
  } else if (ev.which === 83) { // S - down
    move = 'down'
    if (isBlack) {
      move = 'up'
    }
  } else if (ev.which === 87) { // W - up
    move = 'up'
    if (isBlack) {
      move = 'down'
    }
  } else if (ev.which === 68) { // D - right
    move = 'right'
  } else if (ev.which === 81) { // Q - up-left
    move = 'up-left'
    if (isBlack) {
      move = 'down-left'
    }
  } else if (ev.which === 69) { // E - up-right
    move = 'up-right'
    if (isBlack) {
      move = 'down-right'
    }
  } else if (ev.which === 90) { // Z - down-left
    move = 'down-left'
    if (isBlack) {
      move = 'up-right'
    }
  } else if (ev.which === 88) { // X - down-right
    move = 'down-right'
    if (isBlack) {
      move = 'up-right'
    }
  }
  
  if (move !== 'none') {
    let index = 0
    COLLECTED_PIECE_IDS.forEach(id => {
      setTimeout(() => {
        console.log('move', id, move)
        movePieceForward(id, move, STEP_SIZE)
      }, 300 * index)
      index++
    })
  }
})

function movePieceForward(pieceId, direction, steps=1) {
  const piece = document.querySelector(`[data-id="${pieceId}"]`);
  if (!piece) {
    return
  }
  const transform = piece.style.transform
  const [x0, y0] = transform.match(/\d+/g).map(Number)
  piece.click()

  requestAnimationFrame(() => {
    const allCurrentButtons = document.querySelectorAll('button');
    const moveButtons = Array.from(allCurrentButtons).filter(button => {
      // Look for buttons with --x and --y CSS properties that weren't there before
      return button.style.getPropertyValue('--x') !== '' && 
            button.style.getPropertyValue('--y') !== '' &&
            !button.querySelector('img'); // Exclude other pieces
    });
    moveButtons.forEach(button => {
      const xx = parseInt(button.style.getPropertyValue('--x'))
      const yy = parseInt(button.style.getPropertyValue('--y'))
      const dx = xx - x0
      const dy = yy - y0

      let inversion = 1
      if (isBlack) {
        inversion = -1
      }

      let distance = SQUARE_SIZE * steps
      if (direction === 'left' && dx === -distance && dy === 0) {
        button.click()
      } else if (direction === 'right' && dx === distance && dy === 0) {
        button.click()
      } else if (direction === 'up' && dx === 0 && dy === -distance * inversion) {
        button.click()
      } else if (direction === 'down' && dx === 0 && dy === distance * inversion) {
        button.click()
      } else if (direction === 'up-left' && dx === -distance && dy === -distance * inversion) {
        button.click()
      } else if (direction === 'up-right' && dx === distance && dy === -distance * inversion) {
        button.click()
      } else if (direction === 'down-left' && dx === -distance && dy === distance * inversion) {
        button.click()
      } else if (direction === 'down-right' && dx === distance && dy === distance * inversion) {
        button.click()
      }
    })
  })
}

function moveKnightsRandomly() {
  const DELAY = 100

  // Credit
  // https://news.ycombinator.com/item?id=43835466
  // https://gist.github.com/yayitswei/442cd5128b2dbfbd95a101b70f445183

  // Function to move chess pieces forward (down for black, up for white)
  function moveChessPieces() {
    // More robust way to determine if playing as black or white
    // Look for text that explicitly states which color you're playing
    const allTextElements = document.querySelectorAll('p');
    let isBlack = true; // Default to black if can't determine
    
    for (const element of allTextElements) {
      const text = element.textContent.toLowerCase();
      if (text.includes('playing black')) {
        isBlack = true;
        break;
      } else if (text.includes('playing black')) {
        isBlack = false;
        break;
      }
    }
    
    const column = [
      '17744838'
    ]

    // Identify pieces by image URL pattern rather than relying on specific class names
    const allButtons = document.querySelectorAll('button');
    const myPieces = Array.from(allButtons).filter(button => {
      if (true || column.includes(button.getAttribute('data-id'))) {
        const img = button.querySelector('img');
        return img && img.src && img.src.includes(`${isBlack ? 'black' : 'white'}-processed`);
      }
      return false
    });
    
    // Filter for pawns only (optional - remove this filter to move all pieces)
    const myKnights = myPieces.filter(piece => {
      const img = piece.querySelector('img');
      return img && img.src.includes('/knight.png');
    });
    
    
    // Choose which pieces to move (pawns only or all pieces)
    const piecesToMove = myKnights; // Change to myPieces to move all pieces
    
    // Process each piece one by one
    let index = 0;
    let count = 0;
    
    function processPiece() {
      if (index >= piecesToMove.length) {
        return;
      }
      
      const piece = piecesToMove[index];
      
      // Click the piece to select it
      piece.click();
      
      // Wait for the board to update with possible moves
      requestAnimationFrame(() => {
        // Find all buttons that appeared after clicking
        // This approach doesn't rely on specific class names
        const allCurrentButtons = document.querySelectorAll('button');
        const moveButtons = Array.from(allCurrentButtons).filter(button => {
          // Look for buttons with --x and --y CSS properties that weren't there before
          return button.style.getPropertyValue('--x') !== '' && 
            button.style.getPropertyValue('--y') !== '' &&
            !button.querySelector('img'); // Exclude other pieces
        });
        
        // If we have move buttons, select the one that's forward
        if (moveButtons.length > 0) {
          const destButton = moveButtons[Math.floor(Math.random() * moveButtons.length)];
          destButton.click();
        } else {
        }
        
        requestAnimationFrame(() => {
          index++
          processPiece();
        });
      });
    }
    
    // Start processing pieces
    processPiece();
  }

  // Run the function
  moveChessPieces()
}


function advanceAllPawns() {
  // Credit
  // https://news.ycombinator.com/item?id=43835466
  // https://gist.github.com/yayitswei/442cd5128b2dbfbd95a101b70f445183

  // Function to move chess pieces forward (down for black, up for white)
  function moveChessPieces() {
    // More robust way to determine if playing as black or white
    // Look for text that explicitly states which color you're playing
    const allTextElements = document.querySelectorAll('p');
    let isBlack = true; // Default to black if can't determine
    
    for (const element of allTextElements) {
      const text = element.textContent.toLowerCase();
      if (text.includes('playing black')) {
        isBlack = true;
        break;
      } else if (text.includes('playing white')) {
        isBlack = false;
        break;
      }
    }
    
    // Identify pieces by image URL pattern rather than relying on specific class names
    const allButtons = document.querySelectorAll('button');
    const myPieces = Array.from(allButtons).filter(button => {
      const img = button.querySelector('img');
      return img && img.src && img.src.includes(`${isBlack ? 'black' : 'white'}-processed`);
    });
    
    
    // Filter for pawns only (optional - remove this filter to move all pieces)
    const myPawns = myPieces.filter(piece => {
      const img = piece.querySelector('img');
      return img && img.src.includes('/pawn.png');
    });
    
    // Choose which pieces to move (pawns only or all pieces)
    const piecesToMove = myPawns; // Change to myPieces to move all pieces
    
    // Process each piece one by one
    let index = 0;
    
    function processPiece() {
      if (index >= piecesToMove.length) {
        return;
      }
      
      const piece = piecesToMove[index];
      
      // Click the piece to select it
      piece.click();
      
      // Wait for the board to update with possible moves
      requestAnimationFrame(() => {
        // Find all buttons that appeared after clicking
        // This approach doesn't rely on specific class names
        const allCurrentButtons = document.querySelectorAll('button');
        const moveButtons = Array.from(allCurrentButtons).filter(button => {
          // Look for buttons with --x and --y CSS properties that weren't there before
          return button.style.getPropertyValue('--x') !== '' && 
                button.style.getPropertyValue('--y') !== '' &&
                !button.querySelector('img'); // Exclude other pieces
        });
        
        // If we have move buttons, select the one that's forward
        if (moveButtons.length > 0) {
          // For black, "forward" is down (increasing Y)
          // For white, "forward" is up (decreasing Y)
          const sortedButtons = Array.from(moveButtons).sort((a, b) => {
            const aY = parseInt(a.style.getPropertyValue('--y'));
            const bY = parseInt(b.style.getPropertyValue('--y'));
            return isBlack ? (bY - aY) : (aY - bY); // Reverse sort for white
          });
          
          // Get the first button (furthest in the desired direction)
          const destButton = sortedButtons[0];
          const destY = destButton.style.getPropertyValue('--y');
          destButton.click();
        } else {
        }
        
        // Move to next piece after a delay
        requestAnimationFrame(() => {
          index++;
          processPiece();
        });
      });
    }
    
    // Start processing pieces
    processPiece();
  }

  // Run the function
  moveChessPieces();
}
