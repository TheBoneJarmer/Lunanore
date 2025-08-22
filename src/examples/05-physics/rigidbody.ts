import * as RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import { Physics } from "./physics";

export enum RigidBodyType {
    DYNAMIC,
    STATIC
}

export class RigidBody {
    private _body: RAPIER.RigidBody;

    public get body(): RAPIER.RigidBody {
        return this._body;
    }

    public get position(): THREE.Vector3 {
        const t = this._body.translation();
        return new THREE.Vector3(t.x, t.y, t.z);
    }

    public set position(value: THREE.Vector3) {
        const tra = new RAPIER.Vector3(value.x, value.y, value.z);
        this._body.setTranslation(tra, true);
    }

    public get rotation(): THREE.Euler {
        const rot = this._body.rotation();
        const quat = new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w);
        const euler = new THREE.Euler();
        euler.setFromQuaternion(quat);

        return euler;
    }

    public set rotation(value: THREE.Euler) {
        const quat = new THREE.Quaternion();
        quat.setFromEuler(value);

        const rot = new RAPIER.Quaternion(quat.x, quat.y, quat.z, quat.w);
        this._body.setRotation(rot, true);
    }

    constructor(type: RigidBodyType) {
        let desc: RAPIER.RigidBodyDesc;

        if (type == RigidBodyType.DYNAMIC) {
            desc = RAPIER.RigidBodyDesc.dynamic();
        } else {
            desc = RAPIER.RigidBodyDesc.fixed();
        }

        this._body = Physics.world.createRigidBody(desc);
    }

    public remove() {
        Physics.world.removeRigidBody(this._body);
    }
}