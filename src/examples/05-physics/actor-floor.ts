import { Actor, Assets } from "../../lunanore"
import { RigidBody, RigidBodyType } from "./rigidbody";
import { Collider } from "./collider";

export class ActorFloor extends Actor {
    private _body: RigidBody;
    private _collider: Collider;

    constructor() {
        super("floor", Assets.getModel("floor"));

        this._body = new RigidBody(RigidBodyType.STATIC);
        this._collider = Collider.box(20, 0.1, 20, this._body);
    }

    public async update(dt: number) {
        this.position.copy(this._body.position);
    }
}