import * as THREE from "three";
import { Assets, Model, Mouse, Lunanore, Actor, Scene, Scenes } from "../../lunanore/";

class ActorMage extends Actor {
    constructor() {
        const model = Assets.getModel("mage");

        super("mage", model);
    }

    public async update(dt: number) {
        if (Mouse.isButtonDown(0)) {
            const moveX = Mouse.moveX;
            const moveY = Mouse.moveY;

            this.rotation.x -= moveY * 0.004;
            this.rotation.y -= moveX * 0.004;
        }

        if (Mouse.isButtonPressed(2)) {
            this.rotation.set(0, 0, 0);
        }
    }
}

class ActorFloor extends Actor {
    constructor() {
        const model = Assets.getModel("floor");

        super("floor", model);
    }
}

class SceneMain extends Scene {
    private _mage: ActorMage | null = null;
    private _floor: ActorFloor | null = null;
    private _loop: boolean = false;
    private _anim: string = "";
    private _action: THREE.AnimationAction | null = null;

    public async init() {
        await this.initAssets();
        await this.initScene();
        await this.initControls();
    }

    private async initAssets() {
        await Assets.importModel("mage", "mage.glb");
        await Assets.addModel("floor", Model.box(20, 0.1, 20));
    }

    private async initScene() {
        this.camera.position.set(0, 2, 5);
        this.camera.rotation.set(THREE.MathUtils.DEG2RAD * -15, 0, 0);

        this._mage = new ActorMage();
        this._floor = new ActorFloor();

        this.add(this._mage);
        this.add(this._floor);
    }

    private async initControls() {
        const elAnimations = document.forms["controls"]["animations"] as HTMLSelectElement;
        const elLoop = document.forms["controls"]["loop"] as HTMLInputElement;
        const elPlay = document.forms["controls"]["play"] as HTMLButtonElement;
        const elStop = document.forms["controls"]["stop"] as HTMLButtonElement;

        // Set defaults
        this._loop = true;
        this._anim = this._mage!.model!.animations[0].name;

        // Update form elements
        for (let anim of this._mage!.model!.animations) {
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

    private async play() {
        const obj = this.actors.find(x => x.tag == "mage");
        this._action = await obj!.model.play(this._anim, this._loop);
    }

    private async stop() {
        if (this._action != null) {
            this._action.stop();
        }

        this._action = null;
    }
}

window.addEventListener("load", () => {
    const cnv = document.querySelector("canvas")!;

    Lunanore.init(cnv);

    Scenes.add("main", new SceneMain());
    Scenes.navigate("main");

    Lunanore.run();
});

window.addEventListener("resize", () => {
    Lunanore.resize(innerWidth, innerHeight);
});