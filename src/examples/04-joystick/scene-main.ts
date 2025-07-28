import { Scene } from "../../lunanore";
import { Joystick } from "../../lunanore/joystick";

export class SceneMain extends Scene {
    private _buttons: boolean[] = [];
    private _axes: number[] = [];

    public async init() {
        if (Joystick.isConnected(0)) {
            console.log("Joystick is connected");
        } else {
            console.log("Joystick is not connected");
        }
    }

    public async update(dt: number) {
        await this.initState();
        await this.refreshState();
    }

    private async initState() {
        if (this._buttons.length > 0 || this._axes.length > 0) {
            return;
        }

        if (Joystick.isConnected(0)) {
            this._buttons = Joystick.getButtons(0);
            this._axes = Joystick.getAxes(0);
        } else {
            this._buttons = [];
            this._axes = [];
        }
    }

    private async refreshState() {
        let refresh = false;

        if (!Joystick.isConnected(0)) {
            return;
        }

        const buttons = Joystick.getButtons(0);
        const axes = Joystick.getAxes(0);

        for (let i=0; i<buttons.length; i++) {
            const value1 = buttons[i];
            const value2 = this._buttons[i];

            if (value1 != value2) {
                refresh = true;
            }
        }

        for (let i=0; i<axes.length; i++) {
            const value1 = axes[i];
            const value2 = this._axes[i];

            if (value1 != value2) {
                refresh = true;
            }
        }

        // Prevent constant re-rendering of the DOM elements
        if (refresh) {
            

            // Update the state as last
            this._buttons = buttons;
            this._axes = axes;
        }
    }
}