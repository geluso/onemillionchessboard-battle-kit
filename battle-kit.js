let PIECE_ID = '927372'

const TIMEOUT_DELAY = 10
const SQUARE_SIZE = 28

const allTextElements = document.querySelectorAll('p');
let isBlack = true; // Default to black if can't determine

document.addEventListener('click', ev => {
  const el = ev.srcElement
  if (el.tagName === 'IMG' && el.src.includes("white-") && el.parentElement.tagName === 'BUTTON') {
    let id = el.parentElement.getAttribute('data-id')
    PIECE_ID = id
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
      let commandDelayIncrement = 150
      // Move pawns two spaces up and connect rooks
      setTimeout(() => movePieceForward(queenRookPawnId, 'up'), commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookPawnId, 'up'), commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'up'),     commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'up'),     commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookPawnId, 'up'),  commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookPawnId, 'up'),  commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'up'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'up'),      commandDelay)

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

      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'up'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'up'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'up'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'up'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'up'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'up'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'up'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'up'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(kingRookId, 'up'),      commandDelay)
      commandDelay += commandDelayIncrement
      setTimeout(() => movePieceForward(queenRookId, 'up'),      commandDelay)

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

  if (ev.which === 65) { // A - left
    move = 'left'
  } else if (ev.which === 83) { // S - down
    move = 'down'
  } else if (ev.which === 87) { // W - up
    move = 'up'
  } else if (ev.which === 68) { // D - right
    move = 'right'
  } else if (ev.which === 81) { // Q - up-left
    move = 'up-left'
  } else if (ev.which === 69) { // E - up-right
    move = 'up-right'
  } else if (ev.which === 90) { // Z - down-left
    move = 'down-left'
  } else if (ev.which === 88) { // X - down-right
    move = 'down-right'
  }
  movePieceForward(PIECE_ID, move)
})

function movePieceForward(pieceId, direction) {
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

      if (direction === 'left' && dx === -SQUARE_SIZE && dy === 0) {
        button.click()
      } else if (direction === 'right' && dx === SQUARE_SIZE && dy === 0) {
        button.click()
      } else if (direction === 'up' && dx === 0 && dy === -SQUARE_SIZE) {
        button.click()
      } else if (direction === 'down' && dx === 0 && dy === SQUARE_SIZE) {
        button.click()
      } else if (direction === 'up-left' && dx === -SQUARE_SIZE && dy === -SQUARE_SIZE) {
        button.click()
      } else if (direction === 'up-right' && dx === SQUARE_SIZE && dy === -SQUARE_SIZE) {
        button.click()
      } else if (direction === 'down-left' && dx === -SQUARE_SIZE && dy === SQUARE_SIZE) {
        button.click()
      } else if (direction === 'down-right' && dx === SQUARE_SIZE && dy === SQUARE_SIZE) {
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
      } else if (text.includes('playing white')) {
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