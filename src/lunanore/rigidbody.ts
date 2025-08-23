import * as RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import { Physics } from "./physics";
import { RigidBodyType } from "./enums";

/**
 * Represents a wrapper around a Rapier physics engine rigid body,
 * providing convenient accessors and mutators for position and rotation
 * using Three.js types.
 *
 * @remarks
 * This class abstracts the underlying Rapier rigid body and exposes
 * its position and rotation as THREE.Vector3 and THREE.Euler respectively.
 * It also handles conversion between Rapier and THREE.js types.
 *
 * @example
 * ```typescript
 * const rb = new RigidBody(RigidBodyType.DYNAMIC);
 * rb.position = new THREE.Vector3(1, 2, 3);
 * rb.rotation = new THREE.Euler(Math.PI / 2, 0, 0);
 * ```
 *
 * @see {@link RAPIER.RigidBody}
 * @see {@link THREE.Vector3}
 * @see {@link THREE.Euler}
 */
export class RigidBody {
    private _body: RAPIER.RigidBody;

    /**
     * Gets the underlying Rapier rigid body instance associated with this object.
     * 
     * @returns The current rapier rigidbody instance.
     */
    public get body(): RAPIER.RigidBody {
        return this._body;
    }

    /**
     * Gets the current position of the rigid body as a THREE.Vector3.
     * The position is retrieved from the underlying physics body's translation.
     *
     * @returns {THREE.Vector3} The position vector (x, y, z) of the rigid body.
     */
    public get position(): THREE.Vector3 {
        const t = this._body.translation();
        return new THREE.Vector3(t.x, t.y, t.z);
    }

    /**
     * Sets the position of the rigid body in the physics simulation.
     * 
     * @remarks
     * Converts the provided THREE.Vector3 position to a RAPIER.Vector3 and updates the body's translation.
     * 
     * @param value The new position as a THREE.Vector3.
     */
    public set position(value: THREE.Vector3) {
        const tra = new RAPIER.Vector3(value.x, value.y, value.z);
        this._body.setTranslation(tra, true);
    }

    /**
     * Gets the current rotation of the rigid body as a THREE.Euler object.
     *
     * The rotation is retrieved from the underlying physics body as a quaternion,
     * which is then converted to Euler angles using THREE.js utilities.
     *
     * @returns {THREE.Euler} The rotation of the rigid body in Euler angles.
     */
    public get rotation(): THREE.Euler {
        const rot = this._body.rotation();
        const quat = new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w);
        const euler = new THREE.Euler();
        euler.setFromQuaternion(quat);

        return euler;
    }

    /**
     * Sets the rotation of the rigid body using a THREE.Euler value.
     * Converts the Euler rotation to a quaternion and applies it to the underlying physics body.
     *
     * @param value The new rotation as a THREE.Euler instance.
     */
    public set rotation(value: THREE.Euler) {
        const quat = new THREE.Quaternion();
        quat.setFromEuler(value);

        const rot = new RAPIER.Quaternion(quat.x, quat.y, quat.z, quat.w);
        this._body.setRotation(rot, true);
    }

    /**
     * Creates a new rigid body instance of the specified type.
     * 
     * Initializes the rigid body description based on the provided `type`.
     * If the type is `RigidBodyType.DYNAMIC`, a dynamic rigid body is created;
     * otherwise, a fixed rigid body is created. The rigid body is then added to the physics world.
     * 
     * @param type The type of the rigid body to create (dynamic or fixed).
     */
    constructor(type: RigidBodyType) {
        let desc: RAPIER.RigidBodyDesc;

        if (type == RigidBodyType.DYNAMIC) {
            desc = RAPIER.RigidBodyDesc.dynamic();
        } else {
            desc = RAPIER.RigidBodyDesc.fixed();
        }

        this._body = Physics.world.createRigidBody(desc);
    }

    /**
     * Removes this rigid body from the physics world.
     *
     * This method unregisters the associated physics body from the global `Physics.world`,
     * effectively disabling its simulation and interactions.
     */
    public remove() {
        Physics.world.removeRigidBody(this._body);
    }
}