import * as THREE from "three";
import { Keyboard } from "./keyboard.js";
import { Mouse } from "./mouse";
import { LunanoreOptions } from "./structs";
import { ShadowType } from "./enums";
import { Scenes } from "./scenes";
import { Joystick } from "./joystick";

export class Lunanore {
    static #deltaTime = 0;
    static #lastTime = 0;
    static #renderer = null;
    static #canvas = null;
    static #options = null;

    static get options() {
        return this.#options;
    }

    static get canvas() {
        return this.#canvas;
    }

    static init(canvas, options = new LunanoreOptions()) {
        this.#options = options;
        this.#canvas = canvas;

        // Set the css touch-action to none to prevent the mobile os from thinking that dragging means panning
        // Otherwise swiping wont work at all
        canvas.style.touchAction = "none";

        this.#initRenderer();
        this.#initInput();
    }

    static #initInput() {
        Keyboard.init();
        Mouse.init();
        Joystick.init();
    }

    static #initRenderer() {
        const width = this.#canvas.clientWidth;
        const height = this.#canvas.clientHeight;
        const shadowOptions = this.#options.graphics.shadows;

        const rendererParams = {
            antialias: this.#options.graphics.antialias,
            canvas: this.#canvas
        };

        const renderer = new THREE.WebGLRenderer(rendererParams);
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = shadowOptions.enabled;

        if (shadowOptions.type == ShadowType.Hard) {
            renderer.shadowMap.type = THREE.PCFShadowMap;
        } else {
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }

        this.#renderer = renderer;
    }

    static run() {
        this.#callback(0);
    }

    static resize(width, height) {
        const scene = Scenes.scene;

        if (this.#renderer != null) {
            this.#renderer.setSize(width, height);
        }

        if (scene != null) {
            const cam = scene.camera;

            cam.aspect = width / height;
            cam.updateProjectionMatrix();
        }
    };

    static async #callback(time) {
        try {
            await Lunanore.#update(time);
            await Lunanore.#render();

            requestAnimationFrame(Lunanore.#callback);
        } catch (error) {
            console.error("An error occurred during the game loop");
            console.error(error);
        }
    }

    static async #update(time) {
        this.#deltaTime = time - this.#lastTime;
        this.#lastTime = time;

        await Scenes.update(this.#deltaTime / 1000.0);

        Keyboard.update();
        Mouse.update();
        Joystick.update();
    }

    static async #render() {
        await Scenes.render(this.#renderer);
    }
}
