import * as THREE from "three";
import { Assets, Model, Scene } from "../../lunanore";
import { ActorKnot } from "./actor-knot";

export class SceneMain extends Scene {
    async init() {
        const mat = new THREE.MeshStandardMaterial();
        mat.flatShading = true;
        mat.color = new THREE.Color("#4784a7");

        Assets.addModel("knot", Model.torusKnot(1, 0.4, 32, 4, 2, 3, mat));

        const knot = new ActorKnot();
        this.add(knot);

        this.camera.position.z = 5;
    }

    async update(dt) {
        
    }
}