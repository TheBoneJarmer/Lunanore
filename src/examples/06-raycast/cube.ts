import * as THREE from "three";
import { Actor, Assets, Mouse, Scenes } from "../../lunanore";

export class Cube extends Actor {
    constructor() {
        const model = Assets.getModel("cube");
        const clone = model.clone(true);

        super("cube", clone);
    }

    public async update(dt: number) {
        let intersect = Mouse.intersect(this);
        let selected = false;

        if (Mouse.isButtonDown(0) && intersect != null) {
            selected = true;
        }

        if (selected) {
            const scene = Scenes.scene;
            const cubes = scene.actors as Cube[];

            for (let i=0; i<cubes.length; i++) {
                const dist = cubes[i].position.distanceTo(this.position);

                if (cubes[i].id == this.id) {
                    continue;
                }

                if (dist < 1) {
                    scene.remove(cubes[i]);
                    break;
                }
            }

            const mat = this.model.material as THREE.MeshStandardMaterial;
            mat.color.set(0, 1, 0);

            this.position.set(intersect.x, intersect.y, 0);
        } else {
            const mat = this.model.material as THREE.MeshStandardMaterial;
            mat.color.set(1, 1, 1);
        }
    }
}