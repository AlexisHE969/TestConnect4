export class Connect4 {
    private readonly ROWS: number = 6;
    private readonly COLUMNS: number = 7;
    private readonly board: number[][];
    private currentPlayer: number;
    private gameOver: boolean;

    constructor(){
        this.board = Array.from({ length: this.ROWS }, () => Array(this.COLUMNS).fill(0));
        this.currentPlayer = 1;
        this.gameOver = false;
    }

    play(column: number): string {
        if (this.gameOver) {
            return "Game has finished!";
        }
    
        if (column < 0 || column >= this.COLUMNS) {
            return "Invalid number of column!";
        }
    
        let playerTurn = this.currentPlayer;
    
        for (let row = this.ROWS - 1; row >= 0; row--) {
            if (this.board[row][column] === 0) {
                this.board[row][column] = this.currentPlayer;
                //console.log(this.checkForWin(row, column));
                if (this.checkForWin(row, column)) {
                    this.gameOver = true;
                    return `Player ${this.currentPlayer} wins!`;
                }
    
                if (this.isBoardFull()) {
                    this.gameOver = true;
                    return 'Game has finished!';
                }
    
                this.switchPlayer();
                return `Player ${playerTurn} has a turn`;
            }
        }
    
        return "Column full!";
    }
    

    private switchPlayer(): void {
        this.currentPlayer = 3 - this.currentPlayer;
    }

    private isBoardFull(): boolean {
        return this.board.every(row => row.every(cell => cell != 0));
    }

    private checkForWin(row: number, col: number): boolean {
        //console.log(`row ${row}`);
        //console.log(`col ${col}`);

        return (
            this.checkDirection(row, col, 1, 0) || //Horizontal
            this.checkDirection(row, col, 0, 1) || //Vertical
            this.checkDirection(row, col, 1, 1) || // Diagonal \
            this.checkDirection(row, col, 1, -1)   // Diagonal /
        );
    }

    private checkDirection(row: number, col: number, deltaRow: number, deltaCol: number): boolean {
        const player = this.board[row][col];

        for (let i = 0; i < 4; i++) {
            const newRow = row + i * deltaRow;
            const newCol = col + i * deltaCol;

            if (
                newRow < 0 || newRow >= this.ROWS ||
                newCol < 0 || newCol >= this.COLUMNS ||
                this.board[newRow][newCol] !== player
            ) {
                return false; // No hay 4 en fila en esta direccion
            }
        }

        return true; // Se encontraron 4 en fila en la direccion
    }
}

// Ejemplo de uso:
const game = new Connect4();
    console.log(game.play(0));
    console.log(game.play(1));
    console.log(game.play(0));
    console.log(game.play(1));
    console.log(game.play(0));
    console.log(game.play(1));
    console.log(game.play(0));