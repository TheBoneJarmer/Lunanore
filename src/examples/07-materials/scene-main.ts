import * as THREE from "three";
import { Assets, Model, Scene } from "../../lunanore";
import { ActorCube } from "./actor-cube";

export class SceneMain extends Scene {
    public async init() {
        const mat = new THREE.MeshStandardMaterial();
        mat.map = await Assets.importTexture("planks", "assets/planks.png");
        mat.aoMap = await Assets.importTexture("planks_ao", "assets/planks_ao.png");
        mat.metalnessMap = await Assets.importTexture("planks_metal", "assets/planks_metal.png");
        mat.roughnessMap = await Assets.importTexture("planks_roughness", "assets/planks_roughness.png");
        mat.normalMap = await Assets.importTexture("planks_normal", "assets/planks_normal.png");

        const model = Model.cube(1, mat);
        Assets.addModel("cube", model);

        const cube = new ActorCube();
        this.add(cube);

        this.camera.position.z = 4;
        this.light.position.x *= -1;
    }

    public async update(dt: number) {

    }
}