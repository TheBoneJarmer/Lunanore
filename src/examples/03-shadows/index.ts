import { Actor, Assets, Lunanore, Model, Scene } from "../../lunanore";

class ActorCube extends Actor {
    constructor(tag: string) {
        super(tag, Assets.getModel("cube"));
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
    }

    private async initScene() {
        this.camera.position.set(0, 2.5, 5);
    }

    private async initActors() {
        const cube1 = new ActorCube("cube1");
        cube1.position.set(-5, 5, 0);

        const cube2 = new ActorCube("cube2");
        cube2.position.set(0, 5, 0);
        
        const cube3 = new ActorCube("cube3");
        cube3.position.set(5, 5, 0);

        this.add(cube1);
        this.add(cube2);
        this.add(cube3);
    }

    public async update(dt: number) {
        
    }
}

Lunanore.init();
Lunanore.register("main", new SceneMain());
Lunanore.run("main");