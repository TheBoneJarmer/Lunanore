import * as THREE from "three";
import { Assets, Model, Scene } from "../../lunanore";
import { ActorCube } from "./actor-cube";
import { Physics } from "./physics";
import { ActorFloor } from "./actor-floor";

export class SceneMain extends Scene {
    private _timer: number = 0;

    public async init() {
        const matFloor = new THREE.MeshStandardMaterial();
        matFloor.color = new THREE.Color(0.2, 1, 0.3);

        const matCube = new THREE.MeshStandardMaterial();
        matCube.color = new THREE.Color(0.2, 0, 0.8);

        Assets.addModel("floor", Model.box(20, 0.1, 20, matFloor));
        Assets.addModel("cube", Model.cube(1, matCube));

        await Physics.init();

        this.add(new ActorFloor());

        this.camera.position.z = 20;
        this.camera.position.y = 20;
        this.camera.rotation.x = THREE.MathUtils.DEG2RAD * -45;
    }

    public async update(dt: number) {
        await this.updateCubes(dt);
        await this.updateCounter();

        await Physics.update(dt);
    }

    private async updateCounter() {
        const cubes = this.actors.filter(x => x.tag == "cube");

        const el = document.getElementById("counter");
        el!.innerHTML = "Cubes: " + cubes.length;
    }

    private async updateCubes(dt: number) {
        const cubes = this.actors.filter(x => x.tag == "cube");

        if (this._timer < 4) {
            this._timer++;
            return;
        }

        this.add(new ActorCube());
        this._timer = 0;
    }
}