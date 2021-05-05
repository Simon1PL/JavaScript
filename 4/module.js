class Operation {
    /**
    * Create an operation object
    * @constructor
    * @param {number} x - First number to sum
    * @param {number} y - Second number to sum
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
module.exports.Operation = Operation;