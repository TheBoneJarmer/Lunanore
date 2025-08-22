import * as RAPIER from "@dimforge/rapier3d-compat";
import { Actor, Assets } from "../../lunanore";

export class ActorCube extends Actor {
    private _body: RAPIER.RigidBody;
    private _collider: RAPIER.Collider;

    constructor(world: RAPIER.World) {
        super("cube", Assets.getModel("cube"));

        let bodyDesc = RAPIER.RigidBodyDesc.dynamic();
        this._body = world.createRigidBody(bodyDesc);
        this._body.setTranslation({ x: 0, y: 1, z: 0 }, true);

        let colliderDesc = RAPIER.ColliderDesc.cuboid(1, 1, 1);
        this._collider = world.createCollider(colliderDesc, this._body);
    }

    public async update(dt: number) {
        const pos = this._body.translation();

        this.position.x = pos.x;
        this.position.y = pos.y;
        this.position.z = pos.z;
    }
}