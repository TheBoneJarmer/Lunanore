import { AnimationAction, LoopOnce, LoopRepeat, MathUtils } from "three";
import { LunaAssets, LunaModel, LunaMouse, Lunanore, LunaObject, LunaScene } from "../../lunanore/";

class Mage extends LunaObject {
    constructor(model: LunaModel) {
        super("mage", model);
    }

    public async update(dt: number) {
        if (LunaMouse.isButtonDown(0)) {
            const moveX = LunaMouse.moveX;
            const moveY = LunaMouse.moveY;

            this.rotation.x -= moveY * 0.004;
            this.rotation.y -= moveX * 0.004;
        }

        if (LunaMouse.isButtonPressed(2)) {
            this.rotation.set(0, 0, 0);
        }
    }
}

class SceneMain extends LunaScene {
    private _model: LunaModel | null = null;
    private _mage: Mage | null = null;
    private _loop: boolean = false;
    private _anim: string = "";
    private _action: AnimationAction | null = null;

    public async init() {
        await super.init();

        await this.initAssets();
        await this.initScene();
        await this.initControls();
    }

    private async initAssets() {
        this._model = await LunaAssets.loadModel("mage.glb");
    }

    private async initScene() {
        this.camera.position.set(0, 2, 5);
        this.camera.rotation.set(MathUtils.DEG2RAD * -15, 0, 0);

        this._mage = new Mage(this._model!);
        this.add(this._mage);
    }

    private async initControls() {
        const elAnimations = document.forms["controls"]["animations"] as HTMLSelectElement;
        const elLoop = document.forms["controls"]["loop"] as HTMLInputElement;
        const elPlay = document.forms["controls"]["play"] as HTMLButtonElement;
        const elStop = document.forms["controls"]["stop"] as HTMLButtonElement;

        // Set defaults
        this._loop = true;
        this._anim = this._model!.animations[0].name;

        // Update form elements
        for (let anim of this._model!.animations) {
            const elOption = document.createElement("option");
            elOption.value = anim.name;
            elOption.innerText = anim.name;

            if (anim.name == this._anim) {
                elOption.selected = true;
            }

            elAnimations?.appendChild(elOption);
        }

        elLoop!.checked = this._loop;

        // Assign callbacks
        elAnimations!.onchange = async () => {
            this._anim = elAnimations!.value;

            await this.stop();
            await this.play();
        };

        elLoop!.onchange = async () => {
            this._loop = elLoop!.checked;

            await this.stop();
            await this.play();
        };

        elPlay!.onclick = async () => {
            await this.stop();
            await this.play();
        };

        elStop!.onclick = async () => {
            await this.stop();
        }

        // Autoplay
        await this.play();
    }

    public async update(dt: number) {
        await super.update(dt);
    }

    private async play() {
        const obj = this.objects.find(x => x.tag == "mage");
        this._action = await obj!.model.play(this._anim, this._loop);
    }

    private async stop() {
        if (this._action != null) {
            this._action.stop();
        }

        this._action = null;
    }
}

Lunanore.init().then(async () => {
    Lunanore.scene = new SceneMain();
    await Lunanore.run();
});