import * as THREE from "three";
import { Actor, Keyboard, Lunanore, Model, Scene, Scenes } from "../../lunanore";
import { Keys } from "../../lunanore/enums";

class ActorCube extends Actor {
    private _rotate: boolean = true;

    public async update(dt: number) {
        const speed = dt;

        if (Keyboard.keyPressed(Keys.Space)) {
            this._rotate = !this._rotate;
        }

        if (this._rotate) {
            this.rotation.y += speed;
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
        
    }
}

const cnv = document.querySelector("canvas")!;

Lunanore.init(cnv);

Scenes.add("main", new SceneMain());
Scenes.navigate("main");

Lunanore.run();