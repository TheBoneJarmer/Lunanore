import { Lunanore } from "./lunanore";

export class LunaMouse {
    private static _states: number[] = [];
    private static _x: number = 0;
    private static _y: number = 0;
    private static _prevX: number = 0;
    private static _prevY: number = 0;
    private static _moveX: number = 0;
    private static _moveY: number = 0;

    public static get x(): number {
        return this._x;
    }

    public static get y(): number {
        return this._y;
    }

    public static get prevX(): number {
        return this._prevX;
    }

    public static get prevY(): number {
        return this._prevY;
    }

    public static get moveX(): number {
        return this._moveX;
    }

    public static get moveY(): number {
        return this._moveY;
    }

    public static init() {
        this.initStates();
    }

    private static initStates() {
        for (let i=0; i<10; i++) {
            this._states[i] = 0;
        }

        this.initListeners();
    }

    private static initListeners() {
        const cnv = Lunanore.canvas;
    
        cnv.addEventListener("pointerdown", (e) => {
            LunaMouse._states[e.button] = 1;
            LunaMouse._x = e.clientX - cnv.getBoundingClientRect().left;
            LunaMouse._y = e.clientY - cnv.getBoundingClientRect().top;
        });
        cnv.addEventListener("pointermove", (e) => {
            LunaMouse._prevX = LunaMouse._x;
            LunaMouse._prevY = LunaMouse._y;
            LunaMouse._x = e.clientX - cnv.getBoundingClientRect().left;
            LunaMouse._y = e.clientY - cnv.getBoundingClientRect().top;
            LunaMouse._moveX = LunaMouse._prevX - LunaMouse._x;
            LunaMouse._moveY = LunaMouse._prevY - LunaMouse._y;
        });
        cnv.addEventListener("pointerup", (e) => {
            if (LunaMouse._states[e.button] === 2) {
                LunaMouse._states[e.button] = 3;
            }

            LunaMouse._x = e.clientX - cnv.getBoundingClientRect().left;
            LunaMouse._y = e.clientY - cnv.getBoundingClientRect().top;
        });

        cnv.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });
    }

    public static update() {
        this._moveX = 0;
        this._moveY = 0;

        for (let i=0; i<this._states.length; i++) {
            const state = this._states[i];

            if (state === 1) {
                this._states[i] = 2;
            }

            if (state === 3) {
                this._states[i] = 0;
            }
        }
    }

    public static isButtonDown(button: number): boolean {
        return this._states[button] > 0 && this._states[button] < 3;
    }

    public static isButtonUp(button: number): boolean {
        return this._states[button] == 3;
    }

    public static isButtonPressed(button: number): boolean {
        return this._states[button] == 1;
    }
}
