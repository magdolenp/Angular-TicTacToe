/**
 * Created by Mefisto on 11-Jun-17.
 */
import {Component} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

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
  winCondition = 5;
  playerTurn: Turn;
  cells: Cell[][];
  imagePath = '//:0';
  imagePathCross = 'assets/cross.png';
  imagePathCircle = 'assets/circle.png';
  winner: string;

  constructor() {
    this.reset()
  }

  get size(): number[] {
    return Array(this._size);
  }

  get currentPlayerTurn(): string {
    if (this.playerTurn === Turn.First) {
      return 'Red';
    } else if (this.playerTurn === Turn.Second) {
      return 'Blue';
    } else {
      return '';
    }
  }

  reset(): void {
    this.cells = Array(this._size).fill([]);
    for (let i = 0; i < this._size; i++) {
      this.cells[i] = Array(this._size).fill(Cell.Clear);
    }
    this.winner = '';
    this.playerTurn = Turn.First;
  }

  cellClicked(i: number, j: number): void {
    // Set new set context
    if (this.cells[i][j] === Cell.Clear && this.winner === '') {
      if (this.playerTurn === Turn.First) {
        this.cells[i][j] = Cell.Cross;
        this.playerTurn = Turn.Second;
      } else {
        this.cells[i][j] = Cell.Circle;
        this.playerTurn = Turn.First;
      }

      // Check end of game if there is winner
      if (this.checkWinner()) {
        this.winner = this.playerTurn === Turn.First ? 'Blue' : 'Red';
        this.playerTurn = Turn.None;
      }
    }
  }

  getImage(i: number, j: number): string {
    if (this.cells[i][j] === Cell.Cross) {
      return this.imagePathCross;
    } else if (this.cells[i][j] === Cell.Circle) {
      return this.imagePathCircle;
    } else {
      return this.imagePath;
    }
  }

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
    for (let rowStart = 0; rowStart < this._size - 4; rowStart++) {
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

  test(): void {
    console.log(this.checkWinner());
  }
}
