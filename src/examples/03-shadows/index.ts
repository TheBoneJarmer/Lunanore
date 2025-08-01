import * as THREE from "three";
import { Actor, Assets, Lunanore, Model, Scene } from "../../lunanore";
import { Scenes } from "../../lunanore/scenes";

class ActorShape extends Actor {
    private _velocity: number = 0;
    private _angle: number = 0;

    constructor(tag: string, model: Model) {
        super(tag, model);

        for (let obj of this.model.data.children) {
            obj.castShadow = true;
        }
    }

    public async update(dt: number) {
        this._velocity += 0.01;
        this._angle = Math.cos(this._velocity);

        this.position.y += this._angle * dt;
        this.rotation.y += dt;
        this.rotation.x += dt;
        this.rotation.z += dt;
    }
}

class ActorFloor extends Actor {
    constructor(tag: string) {
        super(tag, Assets.getModel("floor"));
    }

    public async update(dt: number) {
        
    }
}

class SceneMain extends Scene {
    public async init() {
        await this.initAssets();
        await this.initActors();
        await this.initScene();
    }

    private async initAssets() {
        Assets.addModel("cube", Model.cube());
        Assets.addModel("floor", Model.box(20, 0.1, 20));
        Assets.addModel("torus", Model.torus());
        Assets.addModel("sphere", Model.sphere());
    }

    private async initScene() {
        this.light.position.set(20, 100, 20);
        this.camera.position.set(0, 10, 20);
        this.camera.rotation.set(THREE.MathUtils.DEG2RAD * -25, 0, 0);
    }

    private async initActors() {
        const cube = new ActorShape("cube", Assets.getModel("cube"));
        cube.position.set(-5, 3, 0);

        const sphere = new ActorShape("sphere", Assets.getModel("sphere"));
        sphere.position.set(0, 3, 0);

        const torus = new ActorShape("torus", Assets.getModel("torus"));
        torus.position.set(5, 3, 0);

        const floor = new ActorFloor("floor");

        this.add(cube);
        this.add(sphere);
        this.add(torus);
        this.add(floor);
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