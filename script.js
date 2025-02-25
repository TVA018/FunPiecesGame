function log(msg){
    c = document.getElementById("console");
    c.innerText = `${msg}\n${c.innerText}`;
}

const grid = new Grid(8);

const DEFAULT_BOARD_LAYOUT = [
    new Rook(grid, new Vector2(0, 0), "Black"),
    new Rook(grid, new Vector2(7, 0), "Black"),
    new Knight(grid, new Vector2(1, 0), "Black"),
    new Knight(grid, new Vector2(6, 0), "Black"),
    new Bishop(grid, new Vector2(2, 0), "Black"),
    new Bishop(grid, new Vector2(5, 0), "Black"),
    new Queen(grid, new Vector2(3, 0), "Black"),
    new King(grid, new Vector2(4, 0), "Black"),

    new Rook(grid, new Vector2(0, 7), "White"),
    new Rook(grid, new Vector2(7, 7), "White"),
    new Knight(grid, new Vector2(1, 7), "White"),
    new Knight(grid, new Vector2(6, 7), "White"),
    new Bishop(grid, new Vector2(2, 7), "White"),
    new Bishop(grid, new Vector2(5, 7), "White"),
    new Queen(grid, new Vector2(3, 7), "White"),
    new King(grid, new Vector2(4, 7), "White"),
];

for(let i = 0; i < 8; i++){
    DEFAULT_BOARD_LAYOUT.push(new Pawn(grid, new Vector2(i, 1), "Black"));
    DEFAULT_BOARD_LAYOUT.push(new Pawn(grid, new Vector2(i, 6), "White"));
}

const TEST_BOARD_LAYOUT = [
    new Rook(grid, new Vector2(0, 0), "Black"),
    new Rook(grid, new Vector2(7, 0), "Black"),
    new Knight(grid, new Vector2(1, 0), "Black"),
    new Knight(grid, new Vector2(6, 0), "Black"),
    new Bishop(grid, new Vector2(2, 0), "Black"),
    new Bishop(grid, new Vector2(5, 0), "Black"),
    new Queen(grid, new Vector2(3, 0), "Black"),
    new King(grid, new Vector2(4, 0), "Black"),

    // new Rook(grid, new Vector2(0, 7), "White"),
    // new Rook(grid, new Vector2(7, 7), "White"),
    // new Knight(grid, new Vector2(1, 7), "White"),
    // new Knight(grid, new Vector2(6, 7), "White"),
    // new Bishop(grid, new Vector2(2, 7), "White"),
    // new Bishop(grid, new Vector2(5, 7), "White"),
    // new Queen(grid, new Vector2(3, 7), "White"),
    // new King(grid, new Vector2(4, 7), "White"),
];

for(let i = 0; i < 8; i++){
    TEST_BOARD_LAYOUT.push(new Pawn(grid, new Vector2(i, 1), "Black"));
}

const BOARD_LAYOUT = TEST_BOARD_LAYOUT;

for(const piece of BOARD_LAYOUT){
    grid.addPiece(piece);
}

grid.renderTiles();