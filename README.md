# OneMillionChessBoards.com Battle Kit
Expanding on a script created by `yayitswei` this adds keyboard shortcuts to move and select pieces.

Browser to OneMillionChessBoards.com, open the JavaScript console and paste the contents of `battle-kit.js`

I expanded and added some more features. A lot are probably crummy and broken and only work for white.

* Click on a queen and control queen movement one square at a time with WASD keyboard controls
* Press TAB of F to toggle through queens on the board.
* Press P to toggle "advance all pawns" once
* Press H to toggle "horses" move all knights randomly
* Click on a King to activate "world eater" sequence.
* Two pawns advance to let rooks out.
* Rooks move forward to third row
* Rooks meet in middle of third row
* Rooks advance to enemy side killing front two middle pawns, king and queen
* Rooks expand out destroying bishops, knights, and rooks.
* Rooks step back to pawn row and move back to middle clearing pawns out.

Demo: https://www.youtube.com/watch?v=sSKKd19azm0

## Control Groups

* Press C to toggle to control group mode
* Press C to toggle back to default mode and clear out the control group
* While C is toggled click on any number of pieces
* Use WASD to move the pieces a single step in each direction.
* Press 1-9 to set the number of steps each piece in the control group will take in WASD directions
* Pieces in the control group will move taking their step in the order they were added to the control group
  * For example: If you want a row of 8 rooks to move left
  * Press C to start control group mode
  * Click on each rook from left to left
  * Press `1` then `a`
  * Each rook will take one step left
  * Press `8` then `a`
  * Each rook will slide 8 steps left in one motion
  * Press `8` then `d` and the rooks will get jammed up because they're in each other's way.gg

## TODO

* Improve timing to make moves faster and more efficient
* DONE Add steps parameter to movePieceForward function
* Add a "horse swarm" where horses randomly jump toward and around the current active Queen
* Most of the work is in the file battle-kit.js which I copy and paste everything together there after prototyping in smaller scripts.

https://github.com/geluso/onemillionchessboard-battle-kit

Wahoooo let's have some fun!!

## Credits
* https://onemillionchessboards.com/
* https://eieio.games/
* https://news.ycombinator.com/item?id=43835466
* https://gist.github.com/yayitswei/442cd5128b2dbfbd95a101b70f445183
