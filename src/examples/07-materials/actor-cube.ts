import * as THREE from "three";
import { Actor, Assets } from "../../lunanore";

export class ActorCube extends Actor {
    constructor() {
        super("cube", Assets.getModel("cube"));
    }

    public async update(dt: number) {
        this.rotation.y += dt * 0.5;
        this.rotation.x = -45 * THREE.MathUtils.DEG2RAD;
        //this.rotation.x += dt * 0.5;
    }
}