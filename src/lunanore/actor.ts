import * as THREE from "three";
import { Model } from "./model";

export abstract class Actor {
    private static _count: number = 0;

    private _id: number = 0;
    private _tag: string = "";
    private _model: Model = null;

    public get id(): number {
        return this._id;
    }

    public get tag(): string {
        return this._tag;
    }

    public get model(): Model {
        return this._model;
    }

    public get position(): THREE.Vector3 {
        return this._model.position;
    }

    public get rotation(): THREE.Euler {
        return this._model.rotation;
    }

    public get scale(): THREE.Vector3 {
        return this._model.scale;
    }

    constructor(tag: string, model: Model) {
        this._tag = tag;
        this._model = model;
        this._id = Actor._count;
        Actor._count++;
    }

    /* OVERRIDES */
    public async update(dt: number) {
        
    }
}