import { Scene } from "../../lunanore";
import { Joystick } from "../../lunanore/joystick";

export class SceneMain extends Scene {
    private _buttons: number[] = [];
    private _axes: number[] = [];

    public async init() {

    }

    public async update(dt: number) {
        this.updateInfo();
        this.updateState();
    }

    private updateState() {
        if (Joystick.isConnected(0)) {
            this._buttons = Joystick.getButtons(0);
            this._axes = Joystick.getAxes(0);
        }
    }

    private updateInfo() {
        const el = this.getEl();

        if (!this.stateHasChanged()) {
            return;
        }

        if (Joystick.isConnected(0)) {
            const buttons = Joystick.getButtons(0);
            const axes = Joystick.getAxes(0);

            el.className = "info connected";
            el.innerHTML = "";
            el.innerHTML += "<div class='col'>";
            el.innerHTML += "<h2>Buttons</h2>";

            for (let i = 0; i < buttons.length; i++) {
                el.innerHTML += `<span>Button${i}: ${buttons[i]}</span>`;
            }

            el.innerHTML += "</div>";

            el.innerHTML += "<div class='col'>";
            el.innerHTML += "<h2>Axes</h2>";

            for (let i = 0; i < axes.length; i++) {
                el.innerHTML += `<span>Axes${i}: ${axes[i]}</span>`;
            }

            el.innerHTML += "</div>";
        } else {
            el.innerHTML = "Joystick is not connected";
            el.className = "info disconnected";
        }
    }

    /* HELPER FUNCTIONS */
    private stateHasChanged(): boolean {
        if (!Joystick.isConnected(0)) {
            return false;
        }

        const buttons = Joystick.getButtons(0);
        const axes = Joystick.getAxes(0);

        for (let i=0; i<buttons.length; i++) {
            const value1 = buttons[i];
            const value2 = this._buttons[i];

            if (value1 != value2) {
                return true;
            }
        }

        for (let i=0; i<axes.length; i++) {
            const value1 = axes[i];
            const value2 = this._axes[i];

            if (value1 != value2) {
                return true;
            }
        }

        return false;
    }

    private getEl(): HTMLDivElement {
        return document.querySelector(".info") as HTMLDivElement;
    }
}