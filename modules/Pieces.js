class Piece {
    constructor(grid, startingPos, side){
        this.position = startingPos;
        this.grid = grid;
        this.side = side;
        this.name = `${side}Piece`;
    }

    canMoveTo(pos, canTake){
        if(pos.x < 0 && pos.x >= this.grid.tiles.length){
            return;
        } else if(!canTake && this.grid.getPiece(pos)){
            return;
        }

        return true;
    }
    
    get availableTiles(){ return []; }
}

class King extends Piece {
    constructor(grid, startingPos, side){
        super(grid, startingPos, side);
        this.name = `${side}King`;
    }
}

class Queen extends Piece {
    constructor(grid, startingPos, side){
        super(grid, startingPos, side);
        this.name = `${side}Queen`;
    }
}

class Rook extends Piece {
    constructor(grid, startingPos, side){
        super(grid, startingPos, side);
        this.name = `${side}Rook`;
    }
}

class Bishop extends Piece {
    constructor(grid, startingPos, side){
        super(grid, startingPos, side);
        this.name = `${side}Bishop`;
    }
}

class Knight extends Piece {
    constructor(grid, startingPos, side){
        super(grid, startingPos, side);
        this.name = `${side}Knight`;
    }
}

class Pawn extends Piece {
    constructor(grid, startingPos, side){
        super(grid, startingPos, side);
        this.name = `${side}Pawn`;
        this.initPos = startingPos;
        this.direction = (side == "White") ? 1 : -1;
    }

    get availableTiles(){
        let tiles = [];
        let pos1 = this.position.add(new Vector2(0, this.direction));
        let pos2 = this.position.add(new Vector2(0, this.direction * 2));
        
        if(this.canMoveTo(pos1)){
            tiles.push({
                position: pos1,
                tile: this.grid.getTile(pos1)
            });

            if(this.initPos.equals(this.position) && this.canMoveTo(pos2)){
                tiles.push({
                    position: pos2,
                    tile: this.grid.getTile(pos2)
                });
            }
        }
        
        return tiles;
    }
}