import * as RAPIER from "@dimforge/rapier3d-compat";

/**
 * The `Physics` class provides a static interface for initializing and managing a physics simulation world
 * using the Rapier physics engine. It encapsulates the creation, access, and update of the physics world,
 * allowing for easy integration into applications that require physics simulation.
 *
 * @remarks
 * - The class is designed to be used statically; all methods and properties are static.
 * - The physics world is initialized with a default gravity vector of (0, -10, 0).
 * - The `init` method must be called before accessing or updating the physics world.
 *
 * @example
 * ```typescript
 * await Physics.init();
 * Physics.update(deltaTime);
 * const world = Physics.world;
 * ```
 */
export class Physics {
    private static _world: RAPIER.World;

    /**
     * Gets the current physics simulation world.
     *
     * @returns The instance of a Rapier world representing the physics world.
     */
    public static get world(): RAPIER.World {
        return this._world;
    }

    /**
     * Initializes the physics world with a specified gravity vector.
     * 
     * This method asynchronously initializes the Rapier physics engine and creates a new physics world
     * with gravity set to (0, -10, 0). Must be called before performing any physics operations.
     */
    public static async init() {
        const gravity = new RAPIER.Vector3(0, -10, 0);

        await RAPIER.init();
        this._world = new RAPIER.World(gravity);
    }

    /**
     * Advances the physics simulation by one step.
     */
    public static async update() {
        this._world.step();
    }
}