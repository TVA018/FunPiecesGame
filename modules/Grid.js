class Grid {
    constructor(size){
        this.tiles = [];
        this.activeTile = null;
        this.availableTiles = [];
        this.container = document.getElementById("grid");
        this.createLabels(size);
        this.createTiles(size);
        this.pieces = [];
    }

    addPiece(piece){
        this.pieces.push(piece);
    }

    removePiece(piece){
        let index = this.pieces.indexOf(piece)
        
        if(index > -1){
            this.pieces.splice(index, 1);
        };
    }

    getTile(pos){
        return this.tiles[pos.x][pos.y];
    }

    getPiece(pos){
        return this.pieces.find(e => e.position.equals(pos));
    }

    renderTile(pos, name){
        const tile = this.getTile(pos);
        tile.innerHTML = "";
        
        if(!name){
            return;
        }
        
        const IMG_LOOKUP = {
            BlackKing: "./assets/black-king.png",
            BlackQueen: "./assets/black-queen.png",
            BlackRook: "./assets/black-rook.png",
            BlackBishop: "./assets/black-bishop.png",
            BlackKnight: "./assets/black-knight.png",
            BlackPawn: "./assets/black-pawn.png",
    
            WhiteKing: "./assets/white-king.png",
            WhiteQueen: "./assets/white-queen.png",
            WhiteRook: "./assets/white-rook.png",
            WhiteBishop: "./assets/white-bishop.png",
            WhiteKnight: "./assets/white-knight.png",
            WhitePawn: "./assets/white-pawn.png"
        }
    
        let image = document.createElement("img");
        image.src = IMG_LOOKUP[name];
        tile.append(image);
    }
    
    renderTiles(){
        for(let x = 0; x < this.tiles.length; x++){
            for(let y = 0; y < this.tiles.length; y++){
                let pos = new Vector2(x, y);
                let piece = this.getPiece(pos);

                if(piece){
                    this.renderTile(pos, piece.name);
                } else {
                    this.renderTile(pos);
                }
            }
        }
    }

    createLabels(size){
        for(let y = 1; y <= size; y++){
            let leftLabel = document.createElement("p");
            leftLabel.classList.add("tile", "black");
            leftLabel.innerText = y;
            leftLabel.style["grid-column-start"] = 1;
            leftLabel.style["grid-column-end"] = 2;
            leftLabel.style["grid-row-start"] = 10 - y;
            leftLabel.style["grid-row-end"] = 11 - y;
            this.container.append(leftLabel);
            
            let rightLabel = document.createElement("p");
            rightLabel.classList.add("tile", "black");
            rightLabel.innerText = y;
            rightLabel.style["grid-column-start"] = size + 2;
            rightLabel.style["grid-column-end"] = size + 3;
            rightLabel.style["grid-row-start"] = 10 - y;
            rightLabel.style["grid-row-end"] = 11 - y;
            this.container.append(rightLabel);
        }

        for(let x = 0; x < size; x++){
            let topLabel = document.createElement("p");
            topLabel.classList.add("tile", "black");
            topLabel.innerText = String.fromCharCode(65 + x);
            topLabel.style["grid-column-start"] = x + 2;
            topLabel.style["grid-column-end"] = x + 3;
            topLabel.style["grid-row-start"] = 1;
            topLabel.style["grid-row-end"] = 2;
            this.container.append(topLabel);

            let bottomLabel = document.createElement("p");
            bottomLabel.classList.add("tile", "black");
            bottomLabel.innerText = String.fromCharCode(65 + x);
            bottomLabel.style["grid-column-start"] = x + 2;
            bottomLabel.style["grid-column-end"] = x + 3;
            bottomLabel.style["grid-row-start"] = size + 2;
            bottomLabel.style["grid-row-end"] = size + 3;
            this.container.append(bottomLabel);
        }
    }
    
    createTiles(size){
        const getOnclickDefault = (tileX, tileY, tile) => {
            return () => {
                const pos = new Vector2(tileX, tileY);
                let piece = this.getPiece(pos);
                
                const resetAvailableTiles = () => {
                    for(const tileInfo of this.availableTiles){
                        const availableTile = tileInfo.tile;
                        const availablePos = tileInfo.position;
                        availableTile.onclick = getOnclickDefault(availablePos.x, availablePos.y, availableTile);
                        availableTile.classList.remove("variant2");
                    }

                    this.availableTiles = [];
                }

                resetAvailableTiles();

                if(!piece || this.activeTile == tile) {
                    this.activeTile = null;
                    return; 
                }

                this.activeTile = tile;

                this.availableTiles = piece.availableTiles;

                for(const tileInfo of this.availableTiles){
                    const availableTile = tileInfo.tile;
                    const availablePos = tileInfo.position;
                    
                    availableTile.classList.add("variant2");
                    availableTile.onclick = () => {
                        this.activeTile = null;

                        //remove piece at that position
                        const pieceToRemove = this.getPiece(availablePos);
                        if(pieceToRemove){
                            this.removePiece(pieceToRemove);
                        }

                        piece.position = availablePos;
                        resetAvailableTiles();
                        this.renderTiles();
                    };
                }
            }
        }

        for(let x = 0; x < size; x++){
            let column = [];
            
            for(let y = 0; y < size; y++){
                const tile = document.createElement("button");
                tile.classList.add("tile", `variant${(x + y) % 2}`);
                tile.style["grid-column-start"] = x + 2;
                tile.style["grid-column-end"] = x + 3;
                tile.style["grid-row-start"] = y + 2;
                tile.style["grid-row-end"] = y + 3;
                this.container.append(tile);
                column.push(tile);
                tile.onclick = getOnclickDefault(x, y, tile);
            }

            this.tiles.push(column);
        }
    }
}