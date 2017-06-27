/**
 * Created by Mefisto on 11-Jun-17.
 */
import {Component} from '@angular/core';

const IMAGE_PATH_CROSS = 'assets/cross.png';
const IMAGE_PATH_CIRCLE = 'assets/circle.png'; // review

enum Turn {
  First = 0,
  Second,
  None
}

enum Cell {
  Clear = 0,
  Cross,
  Circle,
}

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss'],
})

export class TicTacToeComponent {
  title = 'TIC TAC TOE';
  _size = 5;
  readonly winCondition = 5;
  playerTurn: Turn;
  cells: Cell[][];
  imagePath = '//:0';

  winner: string;

  constructor() {
    this.reset()
  }

  /**
   * Getter to display current player turn.
   * @returns Red, Blue or empty string
   */
  get currentPlayerTurn(): string {
    switch (this.playerTurn) {
      case Turn.First: {
        return 'Red';
      }
      case Turn.Second: {
        return 'Blue';
      }
      default: {
        return '';
      }
    }
  }

  /**
   * Reset board to default by creating empty matrix of cells.
   */
  reset(): void {
    this.cells = Array(this._size).fill([]);
    for (let i = 0; i < this._size; i++) {
      this.cells[i] = Array(this._size).fill(Cell.Clear);
    } // review
    // this.cells = Array(this._size).fill(Array(this._size).fill(Cell.Clear));
    this.winner = '';
    this.playerTurn = Turn.First;
  }

  /**
   * Cell clicking event. If possible, make player move, switch turn and check if there is a winner.
   * @param i
   * @param j
   */
  cellClicked(i: number, j: number): void {
    console.log(i, j, this.cells[i][j]);
    if (this.cells[i][j] === Cell.Clear && this.winner === '') {  // Set new set context
      if (this.playerTurn === Turn.First) {
        this.cells[i][j] = Cell.Cross;
        this.playerTurn = Turn.Second;
      } else if (this.playerTurn === Turn.Second) {
        this.cells[i][j] = Cell.Circle;
        this.playerTurn = Turn.First;
      } // review

      console.log(this.cells);
      if (this.checkWinner()) {  // Check end of game if there is winner
        this.winner = this.playerTurn === Turn.First ? 'Blue' : 'Red';
        this.playerTurn = Turn.None;
      }
    }
  }

  /**
   * Function binding correct image to each cell
   * @param cell
   * @returns {string} path to image
   */
  getImage(cell: Cell): string {
    switch (cell) {
      case Cell.Cross: {
        return IMAGE_PATH_CROSS;
      }
      case Cell.Circle: {
        return IMAGE_PATH_CIRCLE;
      }
      default: {
        return this.imagePath;
      }
    }
  }

  /**
   * Check if there is sequence of 5 symbols of one kind in any direction.
   * @returns {boolean} true if sequence exists
   */
  checkWinner(): boolean {
    let counterCircle: number;
    let counterCross: number;

    for (let row = 0; row < this._size; row++) {  // Check rows
      counterCircle = 0;
      counterCross = 0;
      for (let col = 0; col < this._size; col++) {
        counterCircle = this.cells[row][col] === Cell.Circle ? counterCircle + 1 : 0;
        counterCross = this.cells[row][col] === Cell.Cross ? counterCross + 1 : 0;
        if (counterCircle >= this.winCondition) {
          return true;
        } else if (counterCross >= this.winCondition) {
          return true;
        }
      }
    }

    for (let col = 0; col < this._size; col++) {  // Check cols
      counterCircle = 0;
      counterCross = 0;
      for (let row = 0; row < this._size; row++) {
        counterCircle = this.cells[row][col] === Cell.Circle ? counterCircle + 1 : 0;
        counterCross = this.cells[row][col] === Cell.Cross ? counterCross + 1 : 0;
        if (counterCircle >= this.winCondition) {
          return true;
        } else if (counterCross >= this.winCondition) {
          return true;
        }
      }
    }

    // Diagonals: top-left to bottom-right
    for (let rowStart = 0; rowStart < this._size - 4; rowStart++) { // review
      counterCircle = 0;
      counterCross = 0;
      for (let row = rowStart, col = 0; row < this._size && col < this._size; row++, col++) {
        counterCircle = this.cells[row][col] === Cell.Circle ? counterCircle + 1 : 0;
        counterCross = this.cells[row][col] === Cell.Cross ? counterCross + 1 : 0;
        if (counterCircle >= this.winCondition) {
          return true;
        } else if (counterCross >= this.winCondition) {
          return true;
        }
      }
    }
    for (let colStart = 1; colStart < this._size - 4; colStart++) {
      counterCircle = 0;
      counterCross = 0;
      for (let row = 0, col = colStart; row < this._size && col < this._size; row++, col++) {
        counterCircle = this.cells[row][col] === Cell.Circle ? counterCircle + 1 : 0;
        counterCross = this.cells[row][col] === Cell.Cross ? counterCross + 1 : 0;
        if (counterCircle >= this.winCondition) {
          return true;
        } else if (counterCross >= this.winCondition) {
          return true;
        }
      }
    }

    // Diagonals: bottom-left to top-right
    for (let rowStart = this._size - 1; rowStart >= 4; rowStart--) {
      counterCircle = 0;
      counterCross = 0;
      for (let row = rowStart, col = 0; row >= 0 && col < this._size; row--, col++) {
        counterCircle = this.cells[row][col] === Cell.Circle ? counterCircle + 1 : 0;
        counterCross = this.cells[row][col] === Cell.Cross ? counterCross + 1 : 0;
        if (counterCircle >= this.winCondition) {
          return true;
        } else if (counterCross >= this.winCondition) {
          return true;
        }
      }
    }
    for (let colStart = 1; colStart < this._size - 4; colStart++) {
      counterCircle = 0;
      counterCross = 0;
      for (let row = this._size - 1, col = colStart; row >= 0 && col < this._size; row--, col++) {
        counterCircle = this.cells[row][col] === Cell.Circle ? counterCircle + 1 : 0;
        counterCross = this.cells[row][col] === Cell.Cross ? counterCross + 1 : 0;
        if (counterCircle >= this.winCondition) {
          return true;
        } else if (counterCross >= this.winCondition) {
          return true;
        }
      }
    }

    return false;
  }
}
