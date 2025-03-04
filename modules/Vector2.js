class Vector2 {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    static deserialize(v){
        return new Vector2(v.x, v.y);
    }

    static fromAngle(angleRad){
        return new Vector2(Math.cos(angleRad), Math.sin(angleRad));
    }

    add(v2){
        return new Vector2(this.x - v2.x, this.y - v2.y);
    }

    sub(v2){
        return new Vector2(this.x - v2.x, this.y - v2.y);
    }

    mul(multiplier){
        if(typeof multiplier === "object"){
            return new Vector2(this.x * multiplier.x, this.y * multiplier.y);
        } else {
            return new Vector2(this.x * multiplier, this.y * multiplier);
        }
    }

    clone(){
        return new Vector2(this.x, this.y);
    }

    equals(v2){
        return (this.x === v2.x) & (this.y === v2.y);
    }

    rotateDeg(rotationDeg){
        const rotationRad = rotationDeg * 2 * Math.PI / 360;

        return Vector2.fromAngle(this.inAngleRad + rotationRad);
    }

    get magnitude(){
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    get normalized(){
        let magnitude = this.magnitude;

        if(magnitude == 0){
            return new Vector2(0, 0);
        }

        return new Vector2(this.x/magnitude, this.y/magnitude);
    }

    get inAngleRad(){
        return Math.atan2(this.y/this.x);
    }

    get toString(){
        return `(${this.x}, ${this.y})`;
    }

    get serialized(){
        return {x: this.x, y: this.y};
    }
}