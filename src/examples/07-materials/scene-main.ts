import * as THREE from "three";
import { Assets, Model, Scene } from "../../lunanore";
import { ActorObject } from "./actor-object";

export class SceneMain extends Scene {
    public async init() {
        const mat = new THREE.MeshStandardMaterial();
        mat.map = await Assets.importTexture("rock", "assets/rock.png");
        mat.aoMap = await Assets.importTexture("rock_ao", "assets/rock_ao.png");
        mat.displacementMap = await Assets.importTexture("rock_disp", "assets/rock_disp.png");
        mat.displacementScale = 1;
        mat.displacementBias = 1;
        mat.roughnessMap = await Assets.importTexture("rock_roughness", "assets/rock_rough.png");
        mat.normalMap = await Assets.importTexture("rock_normal", "assets/rock_normal.png");

        const model = Model.sphere(1, 128, 128, mat);
        Assets.addModel("obj", model);

        const cube = new ActorObject();
        this.add(cube);

        this.camera.position.z = 8;
    }

    public async update(dt: number) {

    }
}