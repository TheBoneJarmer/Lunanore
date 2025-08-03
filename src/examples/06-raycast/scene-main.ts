import { Assets, Model, Mouse, Scene } from "../../lunanore";
import { Cube } from "./cube";

export class SceneMain extends Scene {
    public async init() {
        Assets.addModel("cube", Model.cube());

        for (let i = 0; i < 10; i++) {
            const cube = new Cube();
            cube.position.x = -6 + Math.random() * 12;
            cube.position.y = -4 + Math.random() * 8;

            this.add(cube);
        }

        this.camera.position.z = 10;
    }

    public async update(dt: number) {

    }
}