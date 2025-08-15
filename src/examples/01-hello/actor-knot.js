import { Actor, Assets, Joystick, Keyboard } from "../../lunanore";
import { Keys } from "../../lunanore/enums";

export class ActorKnot extends Actor {
    constructor() {
        super("knot", Assets.getModel("knot"));
    }

    async update(dt) {
        if (Joystick.isConnected(0)) {
            this.rotation.y += dt * Joystick.getAxis(0, 0);
            this.rotation.x += dt * Joystick.getAxis(0, 1);
        }

        if (Keyboard.keyPressed(Keys.R)) {
            this.rotation.x = 0;
            this.rotation.y = 0;
        }

        if (Keyboard.keyDown(Keys.Left)) {
            this.rotation.y -= dt;
        }

        if (Keyboard.keyDown(Keys.Right)) {
            this.rotation.y += dt
        }

        if (Keyboard.keyDown(Keys.Up)) {
            this.rotation.x -= dt;
        }

        if (Keyboard.keyDown(Keys.Down)) {
            this.rotation.x += dt;
        }
    }
}