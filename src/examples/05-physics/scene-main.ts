import * as RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import { Assets, Model, Scene } from "../../lunanore";
import { ActorFloor } from "./actor-floor";
import { ActorCube } from "./actor-cube";

export class SceneMain extends Scene {
    private _timer: number = 0;
    private _world: RAPIER.World;

    public async init() {
        Assets.addModel("floor", Model.box(10, 0.1, 10));
        Assets.addModel("cube", Model.cube());

        await RAPIER.init();

        this._world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
        //this.add(new ActorFloor(this._world));

        this.camera.position.z = 12;
        this.camera.position.y = 8;
        this.camera.rotation.x = THREE.MathUtils.DEG2RAD * -35;
    }

    public async update(dt: number) {
        await this.updateCubes(dt);

        this._world.step();
    }

    private async updateCubes(dt: number) {
        const cubes = this.actors.filter(x => x.tag == "cube");

        if (cubes.length >= 10) {
            return;
        }

        if (this._timer < 20) {
            this._timer++;
            return;
        }

        this.add(new ActorCube(this._world));
        this._timer = 0;
    }
}