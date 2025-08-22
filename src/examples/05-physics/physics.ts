import RAPIER from "@dimforge/rapier3d-compat";

export class Physics {
    private static _world: RAPIER.World;

    public static get world(): RAPIER.World {
        return this._world;
    }

    public static async init() {
        const gravity = new RAPIER.Vector3(0, -10, 0);

        await RAPIER.init();
        this._world = new RAPIER.World(gravity);
    }

    public static async update(dt: number) {
        this._world.step();
    }
}