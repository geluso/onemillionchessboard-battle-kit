let PIECE_ID = '927372'

const TIMEOUT_DELAY = 10
const SQUARE_SIZE = 28

const allTextElements = document.querySelectorAll('p');
let isBlack = true; // Default to black if can't determine

for (const element of allTextElements) {
  const text = element.textContent.toLowerCase();
  if (text.includes('playing black')) {
    isBlack = true;
    console.log('Detected: Playing as black');
    break;
  } else if (text.includes('playing white')) {
    isBlack = false;
    console.log('Detected: Playing as white');
    break;
  }
}

function getAllPieces(pieceType) {
  const allButtons = document.querySelectorAll('button');
  const myPieces = Array.from(allButtons).filter(button => {
    const img = button.querySelector('img');
    return img && img.src && img.src.includes(`${isBlack ? 'black' : 'white'}-processed`);
  });
  
  console.log(`Found ${myPieces.length} ${isBlack ? 'black' : 'white'} pieces`);
  
  // Filter for pawns only (optional - remove this filter to move all pieces)
  const pieces = myPieces.filter(piece => {
    const img = piece.querySelector('img');
    console.log(img.src)
    return img && img.src.includes(`/${pieceType}.png`);
  });
  console.log(pieces)
  return pieces
}

function getAllQueens() {
  return getAllPieces('queen')
}

document.addEventListener('keydown', ev => {
  let move = 'none'
  if (ev.which === 9) { // Tab - select next queen
    console.log('Tab - select next queen');
    const queens = getAllQueens();
    if (queens.length > 0) {
      const currentIndex = queens.findIndex(q => q.dataset.id === PIECE_ID);
      const nextIndex = (currentIndex + 1) % queens.length;
      PIECE_ID = queens[nextIndex].dataset.id;
      console.log(`Selected queen ${nextIndex + 1} of ${queens.length}`);
    }
  }
  if (ev.which === 65) { // A - left
    console.log('A - left');
    move = 'left'
  } else if (ev.which === 83) { // S - down
    console.log('S - down');
    move = 'down'
  } else if (ev.which === 87) { // W - up
    console.log('W - up');
    move = 'up'
  } else if (ev.which === 68) { // D - right
    console.log('D - right');
    move = 'right'
  } else if (ev.which === 81) { // Q - up-left
    console.log('Q - up-left');
    move = 'up-left'
  } else if (ev.which === 69) { // E - up-right
    console.log('E - up-right');
    move = 'up-right'
  } else if (ev.which === 90) { // Z - down-left
    console.log('Z - down-left');
    move = 'down-left'
  } else if (ev.which === 88) { // X - down-right
    console.log('X - down-right');
    move = 'down-right'
  }

  const piece = document.querySelector(`[data-id="${PIECE_ID}"]`);
  const transform = piece.style.transform
  const [x0, y0] = transform.match(/\d+/g).map(Number)
  console.log({transform, x0, y0})
  piece.click()

  setTimeout(() => {
    const allCurrentButtons = document.querySelectorAll('button');
    const moveButtons = Array.from(allCurrentButtons).filter(button => {
      // Look for buttons with --x and --y CSS properties that weren't there before
      return button.style.getPropertyValue('--x') !== '' && 
            button.style.getPropertyValue('--y') !== '' &&
            !button.querySelector('img'); // Exclude other pieces
    });
    console.log({moveButtons})
    moveButtons.forEach(button => {
      const xx = parseInt(button.style.getPropertyValue('--x'))
      const yy = parseInt(button.style.getPropertyValue('--y'))
      console.log({xx, yy})
      const dx = xx - x0
      const dy = yy - y0
      console.log({dx, dy})

      if (move === 'left' && dx === -SQUARE_SIZE && dy === 0) {
        console.log('moved left')
        button.click()
      } else if (move === 'right' && dx === SQUARE_SIZE && dy === 0) {
        console.log('moved right')
        button.click()
      } else if (move === 'up' && dx === 0 && dy === -SQUARE_SIZE) {
        console.log('moved up')
        button.click()
      } else if (move === 'down' && dx === 0 && dy === SQUARE_SIZE) {
        console.log('moved down')
        button.click()
      } else if (move === 'up-left' && dx === -SQUARE_SIZE && dy === -SQUARE_SIZE) {
        console.log('moved up-left')
        button.click()
      } else if (move === 'up-right' && dx === SQUARE_SIZE && dy === -SQUARE_SIZE) {
        console.log('moved up-right')
        button.click()
      } else if (move === 'down-left' && dx === -SQUARE_SIZE && dy === SQUARE_SIZE) {
        console.log('moved down-left')
        button.click()
      } else if (move === 'down-right' && dx === SQUARE_SIZE && dy === SQUARE_SIZE) {
        console.log('moved down-right')
        button.click()
      }
    })
  }, TIMEOUT_DELAY)
})