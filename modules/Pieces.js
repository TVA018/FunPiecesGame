class Piece {
    constructor(grid, startingPos, side){
        this.position = startingPos;
        this.grid = grid;
        this.side = side;
        this.name = `${side}Piece`;
    }

    isValidPos(pos){
        return (pos.x >= 0 && pos.x < this.grid.tiles.length) && (pos.y >= 0 && pos.y < this.grid.tiles.length);
    }

    canMoveTo(pos, canTake){
        if(!this.isValidPos(pos)){
            return;
        }
        
        const piece = this.grid.getPiece(pos);

        if(piece){ //there is a piece in the way
            if(!canTake || piece.side == this.side){ //can't take piece or piece is on the same side
                return;
            }
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

    get availableTiles(){
        const tiles = [];
        let posToCheck = this.position.clone();
        const directionIncrements = [
            () => posToCheck.y++, //downwards
            () => posToCheck.y--, //upwards
            () => posToCheck.x++, //right
            () => posToCheck.x--, //left
            () => posToCheck = posToCheck.add(new Vector2(1, 1)), //down-right
            () => posToCheck = posToCheck.add(new Vector2(1, -1)), //down-left
            () => posToCheck = posToCheck.add(new Vector2(-1, 1)), //up-right
            () => posToCheck = posToCheck.add(new Vector2(-1, -1)), //up-left
        ]

        for(const posIncrementMethod of directionIncrements){
            while(true){
                posIncrementMethod();
    
                if(!this.canMoveTo(posToCheck, true)){ //can't move there
                    break;
                }
    
                tiles.push({ //add to possible tiles
                    position: posToCheck.clone(),
                    tile: this.grid.getTile(posToCheck)
                });
    
                if(this.grid.getPiece(posToCheck)){ //hit a tile, stop checking this direction
                    break;
                }
            }

            posToCheck = this.position.clone();
        }

        return tiles;
    }
}

class Rook extends Piece {
    constructor(grid, startingPos, side){
        super(grid, startingPos, side);
        this.name = `${side}Rook`;
    }

    get availableTiles(){
        const tiles = [];
        let posToCheck = this.position.clone();
        const directionIncrements = [
            () => posToCheck.y++, //downwards
            () => posToCheck.y--, //upwards
            () => posToCheck.x++, //right
            () => posToCheck.x--, //left
        ]

        for(const posIncrementMethod of directionIncrements){
            while(true){
                posIncrementMethod();
    
                if(!this.canMoveTo(posToCheck, true)){ //can't move there
                    break;
                }
    
                tiles.push({ //add to possible tiles
                    position: posToCheck.clone(),
                    tile: this.grid.getTile(posToCheck)
                });
    
                if(this.grid.getPiece(posToCheck)){ //hit a tile, stop checking this direction
                    break;
                }
            }

            posToCheck = this.position.clone();
        }

        return tiles;
    }
}

class Bishop extends Piece {
    constructor(grid, startingPos, side){
        super(grid, startingPos, side);
        this.name = `${side}Bishop`;
    }

    get availableTiles(){
        const tiles = [];
        let posToCheck = this.position.clone();
        const directionIncrements = [
            () => posToCheck = posToCheck.add(new Vector2(1, 1)), //down-right
            () => posToCheck = posToCheck.add(new Vector2(1, -1)), //down-left
            () => posToCheck = posToCheck.add(new Vector2(-1, 1)), //up-right
            () => posToCheck = posToCheck.add(new Vector2(-1, -1)), //up-left
        ]

        for(const posIncrementMethod of directionIncrements){
            while(true){
                posIncrementMethod();
    
                if(!this.canMoveTo(posToCheck, true)){ //can't move there
                    break;
                }
    
                tiles.push({ //add to possible tiles
                    position: posToCheck.clone(),
                    tile: this.grid.getTile(posToCheck)
                });
    
                if(this.grid.getPiece(posToCheck)){ //hit a tile, stop checking this direction
                    break;
                }
            }

            posToCheck = this.position.clone();
        }

        return tiles;
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
        this.forwardDirection = (side == "White") ? 1 : -1;
    }

    get availableTiles(){
        const tiles = [];
        let pos1 = this.position.add(new Vector2(0, this.forwardDirection));
        let pos2 = this.position.add(new Vector2(0, this.forwardDirection * 2));
        let diagonalPos = [
            this.position.add(new Vector2(1, this.forwardDirection * 1)),
            this.position.add(new Vector2(-1, this.forwardDirection * 1))
        ];
        
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

        for(const pos of diagonalPos){
            if(!this.isValidPos(pos)){
                continue;
            }

            let piece = this.grid.getPiece(pos);

            if(!piece){ continue; }

            if(this.canMoveTo(pos, true)){
                tiles.push({
                    position: pos,
                    tile: this.grid.getTile(pos)
                });
            }
        }
        
        return tiles;
    }
}