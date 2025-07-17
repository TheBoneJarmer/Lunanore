import { Euler, Vector3 } from "three";
import { LunaModel } from "./luna-model";

export abstract class LunaObject {
    private static _count: number = 0;

    private _id: number = 0;
    private _tag: string = "";
    private _model: LunaModel = null;

    public get id(): number {
        return this._id;
    }

    public get tag(): string {
        return this._tag;
    }

    public get model(): LunaModel {
        return this._model;
    }

    public set model(value: LunaModel) {
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

    constructor(tag: string, model: LunaModel) {
        this._tag = tag;
        this._model = model.clone();
        this._id = LunaObject._count;
        LunaObject._count++;
    }

    /* OVERRIDES */
    public async update(dt: number) {
        
    }
}