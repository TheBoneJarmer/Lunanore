import { MeshPhongMaterial, WebGLRenderer } from "three";
import { Game } from "../../lunanore/game";
import { GameScene } from "../../lunanore/game-scene";
import { GameAssets } from "../../lunanore/game-assets";
import { GameObject } from "../../lunanore/game-object";
import { Model } from "../../lunanore/model";

class Cube extends GameObject {
    public async update(dt: number) {
        await super.update(dt);
    }
}

class SceneMain extends GameScene {
    private _model: Model | null = null;
    private _cube: Cube | null = null;

    public async init(assets: GameAssets) {
        super.init(assets);

        const mat = new MeshPhongMaterial();
        mat.color.set("#00ff00");

        this._model = Model.cube(1, mat);
        this._cube = new Cube("cube", this._model);
        this.add(this._cube);

        this.camera.position.z = 5;
    }

    public async update(delta: number) {
        super.update(delta);

        this._cube!.update(delta);
        this._cube!.rotation.y += 0.01;
        this._cube!.rotation.x += 0.01;
    }

    public async render(renderer: WebGLRenderer) {
        super.render(renderer);
    }
}

const game = new Game();
game.scene = new SceneMain();
game.run();