# OneMillionChessBoards.com
I ran into this website on Hacker News late Monday night at 1AM
I got totally instantly addicted to it and stayed up playing until 4AM

The website is 1 million chess boards arranged all together in a giant
grid. It DOES NOT play like regular chess.

* Players are assigned to play either as black or white
* Turn order is not enforced.
* A player may play any piece of their color as many times as they like
* You can free up a Queen and absolutely clear out all other pieces
* But nothing special happens when you capture a king
* And your piece can actually move on to other boards
* And your piece can capture pieces on other boards
* BUT your piece must move on to a board before it captures any pieces
* So, if you build a wall you can kind of protect a board
* But you better make sure your wall is thick enough a horse can't get in
* And, even if you make a super thick fortification there's no guarantee
  another player in the world will ruin your formation moving the pieces

The site is build by someone with the user name `eieio`
They're name is Nolen. They've made some very cool things in the past
* Running pong in browser tabs
* Running brick breaker in Google Calendar
* A website with 1 million checkboxes anyone can toggle
* A app creating a worldwide global all Earth caps-lock key
* A website where you can stare at stangers in silence
* Something that creates passwords from your stored passwords (a fav)
* Pacman with your face

All sorts of stuff
This person Nolen is smart
Nolen used to work at a quantitative trading firm, and at amazon
I think they make games now
I'm not sure what games they make
unless onemillionchessboards.com is considered a game
I'm laughing at myself that I don't consider it a game. ha.

And, also, this chess game is implemented well.
Apparently the game runs off just one server
And the game exists in memory.
The game is written in Go
and uses websockets sending binary data over the wire to make moves
the game features "optimistic rendering" where your browser
assumes your moves will succeed until it gets from the server that
your move wasn't allowed
(like if you move on to a space at the same time as someone else
 and the other person gets there first)
your move is just taken back if the server rejects your move

so. what kept me busy staying up playing this game?

well. let me show you a little of what I've been up to.

* Creating a fortress of 64 queens
* Creating a fortress of 64 rooks
* Creating a fortress of 64 knights
* Creating a fortress of 64 bishops
* Creating a fortress with four kings
* Creating a fortress with 64 pawns

* Finding a script
* Advance all pawns
* Shoutout to creator
* Extending the script to add WASD keyboard control to one queen
* Extending the script to add wild jumpy horses
* Building the "World Eater" routine obliterating boards w/ rooks
* Adding steps so the queen may slide 1-9 squares smoothe at once
* Adding "COLLECT" mode creating a single control group
* Trying to create a fortress with 64 pawns again
