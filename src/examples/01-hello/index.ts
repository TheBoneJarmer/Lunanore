import { EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, TorusKnotGeometry, WebGLRenderer } from "three";
import { Game } from "../../lunanore/game";
import { GameScene } from "../../lunanore/game-scene";
import { GameObject } from "../../lunanore/game-object";
import { Model } from "../../lunanore/model";
import { Keyboard, Keys } from "../../lunanore/keyboard";

class Cube extends GameObject {
    private _rotate: boolean = true;

    public async update(dt: number) {
        const speed = 0.1 * dt;

        if (Keyboard.keyPressed(Keys.Space)) {
            this._rotate = !this._rotate;

            console.log(`Rotation ${this._rotate ? "enabled" : "disabled"}`);
        }

        if (this._rotate) {
            this.rotation.x += speed;
            this.rotation.y += speed;
            this.rotation.z += speed;
        }

        await super.update(dt);
    }
}

class SceneMain extends GameScene {
    private _model: Model | null = null;
    private _cube: Cube | null = null;

    public async init() {
        super.init();

        const mat = new MeshPhongMaterial();
        mat.color.set("#4784a7");
        mat.flatShading = true;

        this._model = Model.torusKnot(1, 0.4, 32, 4, 2, 3, mat);
        this._cube = new Cube("cube", this._model);
        this.add(this._cube);

        this.camera.position.z = 5;
        this.light.position.set(1, 1, 1);
    }

    public async update(dt: number) {
        super.update(dt);
    }

    public async render(renderer: WebGLRenderer) {
        super.render(renderer);
    }
}

Game.init().then(() => {
    Game.scene = new SceneMain();
    Game.run();
});