/** This is a description of the Operation class. */
export class Operation {
    /**
    * Represents an Operation.
    * @constructor
    */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * sum the x and the y of Operation object.
     * @param {string} no - there is no param.
     */
    sum() {
        return this.x + this.y;
    }
}