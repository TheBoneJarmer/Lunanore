import * as THREE from "three";
import { Actor, Assets, Keyboard } from "../../lunanore"
import { RigidBody, RigidBodyType } from "./rigidbody";
import { Collider } from "./collider";
import { Keys } from "../../lunanore/enums";

export class ActorFloor extends Actor {
    private _body: RigidBody;
    private _collider: Collider | null;

    constructor() {
        super("floor", Assets.getModel("floor"));

        this._body = new RigidBody(RigidBodyType.STATIC);
        this._collider = Collider.box(20, 0.1, 20, this._body);
    }

    public async update(dt: number) {
        this.position.copy(this._body.position);

        if (Keyboard.keyPressed(Keys.Space)) {
            const mat = this.model.material as THREE.MeshStandardMaterial;

            if (this._collider == null) {
                this._collider = Collider.box(20, 0.1, 20, this._body);
                
            } else {
                this._collider.remove();
                this._collider = null;
            }
        }
    }
}