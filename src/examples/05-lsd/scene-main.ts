import * as THREE from "three";
import { Assets, Scene } from "../../lunanore";
import { Spinner } from "./spinner";

export class SceneMain extends Scene {
    private _step: number = 0;
    private _r: number = 0;
    private _g: number = 1;
    private _b: number = 0;

    public async init() {
        await Assets.importModel("spinner", "spinner.glb");

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const spinner = new Spinner();
                spinner.position.x = -30 + x * 6;
                spinner.position.y = -30 + y * 6;

                this.add(spinner);
            }
        }

        this.camera.position.z = 10;
    }

    public async update(dt: number) {
        await this.updateColor(dt);
    }

    private async updateColor(dt: number) {
        const speed = dt * 0.1;

        if (this._step == 0) {
            if (this._r > 0) {
                this._r -= speed;
                this._g += speed;
            } else if (this._g < 1) {
                this._g += speed;
            } else {
                this._step++;
            }
        }

        if (this._step == 1) {
            if (this._g > 0) {
                this._g -= speed;
                this._b += speed;
            } else if (this._b < 1) {
                this._b += speed;
            } else {
                this._step++;
            }
        }

        if (this._step == 2) {
            if (this._b > 0) {
                this._b -= speed;
                this._r += speed;
            } else if (this._r < 1) {
                this._r += speed;
            } else {
                this._step++;
            }
        }

        if (this._step == 3) {
            this._step = 0;
        }

        this.scene.background = new THREE.Color(this._r, this._g, this._b);
    }
}