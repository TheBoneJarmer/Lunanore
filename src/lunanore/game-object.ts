import { Euler, Vector3 } from "three";
import { Model } from "./model";

export abstract class GameObject {
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

    public set model(value: Model) {
        this._model = value.clone();
    }

    public get position(): Vector3 {
        return this._model.position;
    }

    public get rotation(): Euler {
        return this._model.rotation;
    }

    public get scale(): Vector3 {
        return this._model.scale;
    }

    constructor(tag: string, model: Model) {
        this._tag = tag;
        this._model = model.clone();
        this._id = GameObject._count;
        GameObject._count++;
    }

    public async update(dt: number) {
        await this._model.update(dt);
    }
}