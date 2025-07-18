import { MeshPhongMaterial, WebGLRenderer } from "three";
import { Lunanore, LunaKey, LunaKeyboard, LunaModel, LunaObject, LunaScene } from "../../lunanore";

class Cube extends LunaObject {
    private _rotate: boolean = true;

    public async update(dt: number) {
        const speed = 0.2 * dt;

        if (LunaKeyboard.keyPressed(LunaKey.Space)) {
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

class SceneMain extends LunaScene {
    private _model: LunaModel | null = null;
    private _cube: Cube | null = null;

    public async init() {
        const mat = new MeshPhongMaterial();
        mat.color.set("#4784a7");
        mat.flatShading = true;

        this._model = LunaModel.torusKnot(1, 0.4, 32, 4, 2, 3, mat);
        this._cube = new Cube("cube", this._model);
        this.add(this._cube);

        this.camera.position.z = 5;
        this.light.position.set(1, 1, 1);
    }

    public async update(dt: number) {
        super.update(dt);
    }
}

Lunanore.init().then(() => {
    Lunanore.scene = new SceneMain();
    Lunanore.run();
});