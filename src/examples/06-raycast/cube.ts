import { Actor, Assets } from "../../lunanore";

export class Cube extends Actor {
    constructor() {
        super("cube", Assets.getModel("cube"));
    }

    public async update(dt: number) {
        
    }
}