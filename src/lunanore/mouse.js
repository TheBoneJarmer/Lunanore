import * as THREE from "three";
import { Lunanore } from "./lunanore";
import { Scenes } from "./scenes";

export class Mouse {
    static #raycaster= null;
    static #states = [];
    static #x = 0;
    static #y = 0;
    static #prevX = 0;
    static #prevY = 0;
    static #moveX = 0;
    static #moveY = 0;

    static get x() {
        return this.#x;
    }

    static get y() {
        return this.#y;
    }

    static get prevX() {
        return this.#prevX;
    }

    static get prevY() {
        return this.#prevY;
    }

    static get moveX() {
        return this.#moveX;
    }

    static get moveY() {
        return this.#moveY;
    }

    static init() {
        this.#raycaster = new THREE.Raycaster();

        this.#initStates();
        this.#initListeners();
    }

    static #initStates() {
        for (let i = 0; i < 10; i++) {
            this.#states[i] = 0;
        }
    }

    static #initListeners() {
        const cnv = Lunanore.canvas;

        cnv.addEventListener("pointerdown", (e) => {
            this.#states[e.button] = 1;
            this.#x = e.clientX - cnv.getBoundingClientRect().left;
            this.#y = e.clientY - cnv.getBoundingClientRect().top;
        });
        cnv.addEventListener("pointermove", (e) => {
            this.#prevX = this.#x;
            this.#prevY = this.#y;
            this.#x = e.clientX - cnv.getBoundingClientRect().left;
            this.#y = e.clientY - cnv.getBoundingClientRect().top;
            this.#moveX = this.#prevX - this.#x;
            this.#moveY = this.#prevY - this.#y;
        });
        cnv.addEventListener("pointerup", (e) => {
            if (this.#states[e.button] === 2) {
                this.#states[e.button] = 3;
            }

            this.#x = e.clientX - cnv.getBoundingClientRect().left;
            this.#y = e.clientY - cnv.getBoundingClientRect().top;
        });

        cnv.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });
    }

    static update() {
        this.#moveX = 0;
        this.#moveY = 0;

        for (let i = 0; i < this.#states.length; i++) {
            const state = this.#states[i];

            if (state === 1) {
                this.#states[i] = 2;
            }

            if (state === 3) {
                this.#states[i] = 0;
            }
        }

        if (Scenes.scene != null) {
            const point = new THREE.Vector2();
            point.x = (this.x / innerWidth) * 2 - 1;
            point.y = -(this.y / innerHeight) * 2 + 1;

            this.#raycaster.setFromCamera(point, Scenes.scene.camera);
        }
    }

    static isButtonDown(button) {
        return this.#states[button] > 0 && this.#states[button] < 3;
    }

    static isButtonUp(button) {
        return this.#states[button] == 3;
    }

    static isButtonPressed(button) {
        return this.#states[button] == 1;
    }

    static intersect(actor) {
        const objects = actor.model.data.children;
        const intersections = this.#raycaster.intersectObjects(objects);

        if (intersections.length > 0) {
            return intersections[0].point;
        }

        return null;
    }
}
