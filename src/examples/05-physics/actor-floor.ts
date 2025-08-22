import * as THREE from "three";
import { Actor, Assets, Mouse } from "../../lunanore"
import { RigidBody, RigidBodyType } from "./rigidbody";
import { Collider } from "./collider";

export class ActorFloor extends Actor {
    private _body: RigidBody;
    private _collider: Collider;

    constructor() {
        super("floor", Assets.getModel("floor"));

        this._body = new RigidBody(RigidBodyType.STATIC);
        this._collider = Collider.box(20, 1, 20, this._body);
    }

    public async update(dt: number) {
        if (Mouse.isButtonDown(0)) {
            const rot = this._body.rotation;
            rot.z += Mouse.moveX * dt;
            rot.x -= Mouse.moveY * dt;

            this._body.rotation = rot;
        }

        if (Mouse.isButtonDown(2)) {
            const pos = this._body.position;
            pos.y += Mouse.moveY * dt * 10;

            this._body.position = pos;
        }

        this.position.copy(this._body.position);
        this.rotation.copy(this._body.rotation);
    }
}