import { Actor, Assets, Mouse } from "../../lunanore";

export class Cube extends Actor {
    constructor() {
        super("cube", Assets.getModel("cube"));
    }

    public async update(dt: number) {
        if (Mouse.isButtonDown(0)) {
            const intersect = Mouse.intersect(this);

            if (intersect == null) {
                return
            }

            this.position.set(intersect.x, intersect.y, 0);
        }
    }
}