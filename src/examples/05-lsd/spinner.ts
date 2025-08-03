import * as THREE from "three";
import { Actor, Assets } from "../../lunanore";

export class Spinner extends Actor {
    private _velocity: number = 0;
    private _reverse: boolean = false;

    private _r: number = 1;
    private _g: number = 0;
    private _b: number = 0;
    private _step: number = 0;

    constructor() {
        super("spinner", Assets.getModel("spinner").clone());

        this.rotation.x = 90;
        this._reverse = Math.random() * 100 > 50;
    }

    public async update(dt: number) {
        await this.updateAnimation(dt);
        await this.updateColor(dt);
    }

    private async updateAnimation(dt: number) {
        const max = 100 * dt;
        const speed = dt * 0.01;

        //this.rotation.x += this._velocity;
        this.rotation.y += this._velocity;

        if (this._reverse) {
            if (this._velocity > -max) {
                this._velocity -= speed;
            } else {
                this._reverse = false;
            }
        } else {
            if (this._velocity < max) {
                this._velocity += speed;
            } else {
                this._reverse = true;
            }
        }
    }


    private async updateColor(dt: number) {
        const speed = dt;

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

        this.model.data.children.forEach((child) => {
            if (child instanceof THREE.Mesh) {
                const mat = child.material as THREE.MeshBasicMaterial;
                mat.color.set(this._r, this._g, this._b);
            }
        });
    }
}