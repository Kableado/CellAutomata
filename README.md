# Cellular Automata - Conway's Game of Life

This project is a simple implementation of Conway's Game of Life, a cellular automaton devised by the British mathematician John Horton Conway in 1970.

## How to Run

To run this project, simply open the `index.html` file in a web browser.

## Project Structure

- `index.html`: The main HTML file that sets up the canvas and includes the JavaScript code.
- `CellAutomata.js`: Contains the JavaScript logic for the cellular automata simulation, including cell grid management, update rules, and drawing.
- `LICENSE.txt`: Contains the license information for the project.

## How it Works

The simulation implements Conway's Game of Life rules:
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

The simulation updates at a fixed rate of 60 Ticks Per Second (TPS), processing the cell states and redrawing the grid accordingly.

## License

This project is licensed under the MIT License. See the `LICENSE.txt` file for details.
