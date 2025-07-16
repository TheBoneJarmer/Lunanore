import { MathUtils } from "three";
import { LunaAssets, LunaModel, Lunanore, LunaObject, LunaScene } from "../../lunanore/";

class Mage extends LunaObject {
    constructor(model: LunaModel) {
        super("mage", model);
    }

    public async update(dt: number) {
        super.update(dt);

        
    }
}

class SceneMain extends LunaScene {
    private _model: LunaModel | null = null;
    private _mage: Mage | null = null;

    public async init() {
        await super.init();

        this._model = await LunaAssets.loadModel("mage.glb");

        this._mage = new Mage(this._model);
        this.add(this._mage);

        this.camera.position.set(0, 2, 5);
        this.camera.rotation.set(MathUtils.DEG2RAD * -15, 0, 0);
    }

    public async update(dt: number) {
        await super.update(dt);
    }
}

Lunanore.init().then(async () => {
    Lunanore.scene = new SceneMain();
    await Lunanore.run();
});