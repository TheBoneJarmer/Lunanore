import * as THREE from "three";
import { Actor, Assets, Scenes } from "../../lunanore";
import { RigidBody, RigidBodyType } from "./rigidbody";
import { Collider } from "./collider";

export class ActorCube extends Actor {
    private _body: RigidBody;
    private _collider: Collider;

    constructor() {
        super("cube", Assets.getModel("cube").clone());

        this._body = new RigidBody(RigidBodyType.DYNAMIC);
        this._body.position = new THREE.Vector3(0, 30, 0);

        this._collider = Collider.cube(1, this._body);

        this.position.y = 30;
    }

    public async update(dt: number) {
        this.position.copy(this._body.position);
        this.rotation.copy(this._body.rotation);

        if (this.position.y < -50) {

            Scenes.scene.remove(this);
        }
    }
}