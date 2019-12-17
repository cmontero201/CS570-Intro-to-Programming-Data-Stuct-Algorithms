/*
Write a program that creates a string that represents an 8x8 grid, using
newline characters to separate lines. At each position of the grid there
is either a space or a “#” character. The characters should form a chess
board.
Passing this string to console.log should show something like this:
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
When you have a program that generates this pattern, define a variable
size = 8 and change the program so that it works for any size, outputting
a grid of the given width and height.
*/

var size = 8
var line = ''

for (var col = 0; col <= size; col += 1) {
  for (var row = 0; row <= size; row +=1) {
    if ((row + col) % 2 == 0)
      line += ' ';
    else
        line += '#';
  }
  line += '\n'
}
console.log(line)
