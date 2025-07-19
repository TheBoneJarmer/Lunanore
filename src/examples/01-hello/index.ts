import * as THREE from "three";
import { Actor, Keyboard, Lunanore, Model, Scene } from "../../lunanore";
import { Keys } from "../../lunanore/enums";

class ActorCube extends Actor {
    private _rotate: boolean = true;

    public async update(dt: number) {
        const speed = 0.2 * dt;

        if (Keyboard.keyPressed(Keys.Space)) {
            this._rotate = !this._rotate;

            console.log(`Rotation ${this._rotate ? "enabled" : "disabled"}`);
        }

        if (this._rotate) {
            //this.rotation.x += speed;
            this.rotation.y += speed;
            //this.rotation.z += speed;
        }
    }
}

class SceneMain extends Scene {
    private _cube: ActorCube | null = null;

    public async init() {
        const mat = new THREE.MeshPhongMaterial();
        mat.color.set("#4784a7");
        mat.flatShading = true;

        const model = Model.torusKnot(1, 0.4, 32, 4, 2, 3, mat);
        this._cube = new ActorCube("cube", model);
        this.add(this._cube);

        this.camera.position.z = 5;
        this.light.position.set(1, 1, 1);
    }

    public async update(dt: number) {
        super.update(dt);
    }
}

Lunanore.init();
Lunanore.register("main", new SceneMain());
Lunanore.run("main");