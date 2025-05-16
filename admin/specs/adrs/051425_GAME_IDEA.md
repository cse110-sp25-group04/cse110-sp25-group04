# The New Game Idea:

### Reasons for changes:

We decided to change our game idea for the following reasons:

- An incremental builder requires board rescaling
- Visuals would need to be scaled and moved around inconsistently
- Win / Loss condition was unclear
- Game loop was unclear

### Changes:

- Now, the board will be a constant nxn size and levels will be
  altered using stage obstructions (ex: "Rock")
- The board fills with **corrupt** tiles and a few **grass**, limiting
  positions where cards can be placed (flowers can't go on corrupt tiles)
- Playing a flower card onto the board will apply it's purifying effects
  to adjacent squares based on it's rules.
- New flowers can be placed on these cleared tiles

## CRITICAL: The puzzles are generated with an existing solution

- The player is then given the cards they need to solve the puzzle

### Win Codnition:

The player wins the game when the entire board is cleared of corruption
Once a set number of levels are complete, the player beats our game

### Potential expansions:

We will create an algorithm to reverse engineer a puzzle from a solution.
We then will increase corruption size and number of cards to create complexity