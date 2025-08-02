import * as THREE from "three";
import { Assets, Model, Mouse, Scene } from "../../lunanore";
import { Cube } from "./cube";

export class SceneMain extends Scene {
    public async init() {
        Assets.addModel("cube", Model.cube());

        for (let i = 0; i < 10; i++) {
            const cube = new Cube();
            cube.position.x = -8 + Math.random() * 16;
            cube.position.y = -5 + Math.random() * 10;

            this.add(cube);
        }

        this.camera.position.z = 10;
    }

    public async update(dt: number) {
        
    }
}