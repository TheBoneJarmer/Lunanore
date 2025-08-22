import * as RAPIER from "@dimforge/rapier3d-compat";
import { Actor, Assets } from "../../lunanore"

export class ActorFloor extends Actor {
    private _body: RAPIER.RigidBody;
    private _collider: RAPIER.Collider;

    constructor(world: RAPIER.World) {
        super("floor", Assets.getModel("floor"));

        let bodyDesc = RAPIER.RigidBodyDesc.fixed();
        this._body = world.createRigidBody(bodyDesc);        

        let colliderDesc = RAPIER.ColliderDesc.cuboid(10, 0.1, 10);
        this._collider = world.createCollider(colliderDesc, this._body);
    }

    public async update(dt: number) {
        const pos = this._body.translation();

        this.position.x = pos.x;
        this.position.y = pos.y;
        this.position.z = pos.z;
    }
}