export class Ship {
    /** The ship length. */
    length: number;

    /** The number of hits this ship has received. */
    hits: number;

    constructor({ length }: { length: number }) {
        this.length = length;
        this.hits = 0;
    }

    /** Hits the ship. */
    hit() {
        if (this.isSunk()) return;

        this.hits += 1;
    }

    /** Wether the ship is sunk */
    isSunk() {
        return this.hits === this.length;
    }
}
