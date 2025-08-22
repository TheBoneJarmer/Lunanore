import * as THREE from "three";
import { Actor, Assets } from "../../lunanore";

export class ActorObject extends Actor {
    constructor() {
        super("obj", Assets.getModel("obj"));
    }

    public async update(dt: number) {
        this.rotation.y += dt * 0.5;
        //this.rotation.x = -45 * THREE.MathUtils.DEG2RAD;
        this.rotation.x += dt * 0.5;
    }
}