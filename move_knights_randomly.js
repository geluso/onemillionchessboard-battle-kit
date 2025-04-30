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
      console.log('Detected: Playing as black');
      break;
    } else if (text.includes('playing white')) {
      isBlack = false;
      console.log('Detected: Playing as white');
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
  
  console.log(`Found ${myPieces.length} ${isBlack ? 'black' : 'white'} pieces`);
  
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
      console.log("All pieces processed!");
      return;
    }
    
    const piece = piecesToMove[index];
    console.log(`Processing piece ${index + 1}`);
    
    // Click the piece to select it
    piece.click();
    
    // Wait for the board to update with possible moves
    setTimeout(() => {
      // Find all buttons that appeared after clicking
      // This approach doesn't rely on specific class names
      const allCurrentButtons = document.querySelectorAll('button');
      const moveButtons = Array.from(allCurrentButtons).filter(button => {
        // Look for buttons with --x and --y CSS properties that weren't there before
        return button.style.getPropertyValue('--x') !== '' && 
               button.style.getPropertyValue('--y') !== '' &&
               !button.querySelector('img'); // Exclude other pieces
      });
      
      console.log(`Found ${moveButtons.length} possible move buttons`);
      
      // If we have move buttons, select the one that's forward
      if (moveButtons.length > 0) {
        const destButton = moveButtons[Math.floor(Math.random() * moveButtons.length)];
        destButton.click();
      } else {
        console.log("No move buttons found for this piece, moving to next");
      }
      
      setTimeout(() => {
        index++
        processPiece();
      }, DELAY);
    }, DELAY);
  }
  
  // Start processing pieces
  processPiece();
}

// Run the function
moveChessPieces()
