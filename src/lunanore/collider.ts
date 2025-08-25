import * as RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";

import { Physics } from "./physics";
import { RigidBody } from "./rigidbody";

/**
 * The `Collider` class provides a wrapper around RAPIER's collider objects,
 * allowing for creation and management of various collider shapes attached to rigid bodies.
 * 
 * Use the static factory methods to create colliders of different shapes and attach them to a `RigidBody`.
 * 
 * @example
 * const body = ...; // RigidBody instance
 * const collider = Collider.sphere(1, body);
 */
export class Collider {
    private _collider: RAPIER.Collider;

    public get collider(): RAPIER.Collider {
        return this._collider;
    }

    public remove() {
        Physics.world.removeCollider(this._collider, true);
    }

    /* STATIC FUNCTIONS */
    /**
     * Creates a cuboid collider with equal dimensions (cube) and attaches it to the given rigid body.
     * 
     * @param size The length of each side of the cube.
     * @param body The rigid body to attach the collider to.
     * @returns A new `Collider` instance representing the cube.
     */
    public static cube(size: number, body: RigidBody): Collider {
        const desc = RAPIER.ColliderDesc.cuboid(size / 2, size / 2, size / 2);
        const col = new Collider();
        col._collider = Physics.world.createCollider(desc, body.body);

        return col;
    }

    /**
     * Creates a box-shaped collider and attaches it to the given rigid body.
     * 
     * @param width The width of the box.
     * @param height The height of the box.
     * @param depth The depth of the box.
     * @param body The rigid body to attach the collider to.
     * @returns A new `Collider` instance representing the box.
     */
    public static box(width: number, height: number, depth: number, body: RigidBody): Collider {
        const desc = RAPIER.ColliderDesc.cuboid(width / 2, height / 2, depth / 2);
        const col = new Collider();
        col._collider = Physics.world.createCollider(desc, body.body);

        return col;
    }

    /**
     * Creates a spherical collider and attaches it to the given rigid body.
     * 
     * @param radius The radius of the sphere.
     * @param body The rigid body to attach the collider to.
     * @returns A new `Collider` instance representing the sphere.
     */
    public static sphere(radius: number, body: RigidBody): Collider {
        const desc = RAPIER.ColliderDesc.ball(radius);
        const col = new Collider();
        col._collider = Physics.world.createCollider(desc, body.body);

        return col;
    }

    /**
     * Creates a capsule-shaped collider and attaches it to the given rigid body.
     * 
     * @param halfHeight Half the height of the capsule (excluding the hemispherical ends).
     * @param radius The radius of the capsule's hemispherical ends.
     * @param body The rigid body to attach the collider to.
     * @returns A new `Collider` instance representing the capsule.
     */
    public static capsule(halfHeight: number, radius: number, body: RigidBody): Collider {
        const desc = RAPIER.ColliderDesc.capsule(halfHeight, radius);
        const col = new Collider();
        col._collider = Physics.world.createCollider(desc, body.body);

        return col;
    }

    /**
     * Creates a cylinder-shaped collider and attaches it to the given rigid body.
     * 
     * @param halfHeight Half the height of the cylinder.
     * @param radius The radius of the cylinder.
     * @param body The rigid body to attach the collider to.
     * @returns A new `Collider` instance representing the cylinder.
     */
    public static cylinder(halfHeight: number, radius: number, body: RigidBody): Collider {
        const desc = RAPIER.ColliderDesc.cylinder(halfHeight, radius);
        const col = new Collider();
        col._collider = Physics.world.createCollider(desc, body.body);

        return col;
    }

    /**
     * Creates a cone-shaped collider and attaches it to the given rigid body.
     * 
     * @param halfHeight Half the height of the cone.
     * @param radius The radius of the cone's base.
     * @param body The rigid body to attach the collider to.
     * @returns A new `Collider` instance representing the cone.
     */
    public static cone(halfHeight: number, radius: number, body: RigidBody): Collider {
        const desc = RAPIER.ColliderDesc.cone(halfHeight, radius);
        const col = new Collider();
        col._collider = Physics.world.createCollider(desc, body.body);

        return col;
    }

    /**
     * Creates a rounded cuboid collider and attaches it to the given rigid body.
     * 
     * @param width The width of the cuboid.
     * @param height The height of the cuboid.
     * @param depth The depth of the cuboid.
     * @param borderRadius The radius of the rounded edges.
     * @param body The rigid body to attach the collider to.
     * @returns A new `Collider` instance representing the rounded cuboid.
     */
    public static roundCuboid(width: number, height: number, depth: number, borderRadius: number, body: RigidBody): Collider {
        const desc = RAPIER.ColliderDesc.roundCuboid(width / 2, height / 2, depth / 2, borderRadius);
        const col = new Collider();
        col._collider = Physics.world.createCollider(desc, body.body);

        return col;
    }

    /**
     * Creates a convex hull collider from a set of points and attaches it to the given rigid body.
     * 
     * @param points The vertices defining the convex hull, as a flat Float32Array.
     * @param body The rigid body to attach the collider to.
     * @returns A new `Collider` instance representing the convex hull.
     */
    public static convexHull(points: Float32Array, body: RigidBody): Collider {
        const desc = RAPIER.ColliderDesc.convexHull(points)!;
        const col = new Collider();
        col._collider = Physics.world.createCollider(desc, body.body);

        return col;
    }

    /**
     * Creates a triangle mesh collider from vertices and indices, and attaches it to the given rigid body.
     * 
     * @param vertices The vertices of the mesh, as a flat Float32Array.
     * @param indices The indices defining the mesh triangles, as a Uint32Array.
     * @param body The rigid body to attach the collider to.
     * @returns A new `Collider` instance representing the triangle mesh.
     */
    public static trimesh(vertices: Float32Array, indices: Uint32Array, body: RigidBody): Collider {
        const desc = RAPIER.ColliderDesc.trimesh(vertices, indices);
        const col = new Collider();
        col._collider = Physics.world.createCollider(desc, body.body);

        return col;
    }

    /**
     * Creates a heightfield collider from a grid of heights and attaches it to the given rigid body.
     * 
     * @param cols The number of columns in the heightfield grid.
     * @param rows The number of rows in the heightfield grid.
     * @param heights The height values for each grid cell, as a Float32Array.
     * @param scale The scale to apply to the heightfield, as a THREE.Vector3.
     * @param body The rigid body to attach the collider to.
     * @returns A new `Collider` instance representing the heightfield.
     */
    public static heightfield(cols: number, rows: number, heights: Float32Array, scale: THREE.Vector3, body: RigidBody): Collider {
        const desc = RAPIER.ColliderDesc.heightfield(rows, cols, heights, scale);
        const col = new Collider();
        col._collider = Physics.world.createCollider(desc, body.body);

        return col;
    }
}