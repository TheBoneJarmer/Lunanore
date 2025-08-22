import * as RAPIER from "@dimforge/rapier3d-compat";
import { Physics } from "./physics";
import { RigidBody } from "./rigidbody";

export class Collider {
    private _collider: RAPIER.Collider;

    public get collider(): RAPIER.Collider {
        return this._collider;
    }

    public remove() {
        Physics.world.removeCollider(this._collider, true);
    }

    /* STATIC FUNCTIONS */
    public static cube(size: number, body: RigidBody): Collider {
        const desc = RAPIER.ColliderDesc.cuboid(size / 2, size / 2, size / 2);
        const col = new Collider();
        col._collider = Physics.world.createCollider(desc, body.body);

        return col;
    }

    public static box(width: number, height: number, depth: number, body: RigidBody): Collider {
        const desc = RAPIER.ColliderDesc.cuboid(width / 2, height / 2, depth / 2);
        const col = new Collider();
        col._collider = Physics.world.createCollider(desc, body.body);

        return col;
    }
}