import * as THREE from "three";
import { Lunanore } from "./lunanore";
import { ShadowQuality } from "./enums";

export class Scene {
    #actors = [];
    #scene = null;
    #camera = null;
    #light = null;
    #ambient = null;

    get scene() {
        return this.#scene;
    }

    get actors() {
        return this.#actors;
    }

    get camera() {
        return this.#camera;
    }

    set camera(value) {
        this.#camera = value;
    }

    get light() {
        return this.#light;
    }

    set light(value) {
        this.#light = value;
    }

    get ambient() {
        return this.#ambient;
    }

    set ambient(value) {
        this.#ambient = value;
    }

    constructor() {
        this.#constructScene();
        this.#constructCamera();
        this.#constructLight();
    }

    #constructScene() {
        this.#scene = new THREE.Scene();
    }

    #constructCamera() {
        const width = Lunanore.canvas.clientWidth;
        const height = Lunanore.canvas.clientHeight;

        const fov = 45.0;
        const aspect = width / height;
        const near = 0.01;
        const far = 1000.0;

        this.#camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    }

    #constructLight() {
        const shadowOptions = Lunanore.options.graphics.shadows;

        this.#light = new THREE.DirectionalLight("#ffffff", 1.0);
        this.#light.position.set(10, 10, 10);

        if (shadowOptions.enabled) {
            this.#light.castShadow = true;

            if (shadowOptions.quality == ShadowQuality.Low) {
                this.#light.shadow.mapSize.width = 512;
                this.#light.shadow.mapSize.height = 512;
            }

            if (shadowOptions.quality == ShadowQuality.Medium) {
                this.#light.shadow.mapSize.width = 1024;
                this.#light.shadow.mapSize.height = 1024;
            }

            if (shadowOptions.quality == ShadowQuality.High) {
                this.#light.shadow.mapSize.width = 2048;
                this.#light.shadow.mapSize.height = 2048;
            }

            if (shadowOptions.quality == ShadowQuality.Ultra) {
                this.#light.shadow.mapSize.width = 4096;
                this.#light.shadow.mapSize.height = 4096;
            }

            const cam = this.#light.shadow.camera;
            cam.left = -20;
            cam.right = 20;
            cam.top = 20;
            cam.bottom = -20;
            cam.near = this.#camera.near;
            cam.far = this.#camera.far;
        }

        this.#ambient = new THREE.AmbientLight("#ffffff", 1.0);
    }

    clear() {
        this.#actors = [];
        this.#scene.clear();
        this.#scene.add(this.#light);
        this.#scene.add(this.#ambient);
    }

    add(actor) {
        this.#actors.push(actor);
        this.#scene.add(actor.model.data);
    }

    remove(actor) {
        const index = this.#actors.indexOf(actor);

        if (index == -1) {
            return;
        }

        this.#actors.splice(index, 1);
        this.#scene.remove(actor.model.data);
    }

    /* OVERRIDES */
    async update(dt) {

    }

    async init() {

    }
}