import * as THREE from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

export class Model {
    private _mixer: THREE.AnimationMixer = null;
    private _data: THREE.Group = null;
    private _animations: THREE.AnimationClip[] = [];
    private _material: THREE.Material = null;

    /**
     * Returns the model's data. This is allways a Group object because a model does not just contain meshes but also bones as well.
     */
    public get data(): THREE.Group {
        return this._data;
    }

    /**
     * Set the model's data. This also creates a new animation mixer if there are animations.
     */
    public set data(value: THREE.Group) {
        if (value == null) {
            throw new Error("Value cannot be null");
        }

        this._data = value;
        this._mixer = new THREE.AnimationMixer(value);
    }

    /**
     * Returns all the model's animation clips
     */
    public get animations(): THREE.AnimationClip[] {
        return this._animations;
    }

    /**
     * Sets the animationclip array for this model.
     */
    public set animations(value: THREE.AnimationClip[]) {
        if (value == null) {
            throw new Error("Value cannot be null");
        }

        this._animations = value;
    }

    /**
     * Returns the data's position.
     */
    public get position(): THREE.Vector3 {
        return this._data.position;
    }

    /**
     * Returns the data's rotation in euler angles.
     */
    public get rotation(): THREE.Euler {
        return this._data.rotation;
    }

    /**
     * Returns the data's scale.
     */
    public get scale(): THREE.Vector3 {
        return this._data.scale;
    }

    /**
     * Returns the model material. By default it will return null because meshes have their own material.
     * But if you set the model material you replace all the meshes's materials with the one from their model.
     */
    public get material(): THREE.Material {
        return this._material;
    }

    /**
     * Sets the model material. This will replace all materials from all the model's meshes with this one.
     */
    public set material(value: THREE.Material) {
        this._material = value;

        for (let child of this._data.children) {
            if (child instanceof THREE.Mesh) {
                child.material = value;
            }

            if (child instanceof THREE.SkinnedMesh) {
                child.material = value;
            }
        }
    }

    /**
     * Clones the model's data and animations. Can be refined to deep clone certain parts of the model as well.
     * @param cloneMaterials If true the function will clone the materials as well. This is **false** by default because cloning materials is very expensive memory-wise.
     * @param cloneAnimations If true the function will clone the animation clips as well. This is **false** by default because there is no need to do this in almost all cases.
     * @returns A (deep) clone of the model and all of its data.
     */
    public clone(cloneMaterials: boolean = false, cloneAnimations: boolean = false): Model {
        let model = new Model();

        if (cloneMaterials && this.material != null) {
            model.material = this.material.clone();
        }

        for (let obj of this._data.children) {
            const clone = SkeletonUtils.clone(obj);

            if (cloneMaterials && this.material != null) {
                if (clone instanceof THREE.Mesh) {
                    clone.material = model.material;
                }

                if (clone instanceof THREE.SkinnedMesh) {
                    clone.material = model.material;
                }
            }

            if (cloneMaterials && this.material == null) {
                if (obj instanceof THREE.Mesh && clone instanceof THREE.Mesh) {
                    const mat = obj.material as THREE.MeshBasicMaterial;
                    clone.material = mat.clone();
                }

                if (obj instanceof THREE.SkinnedMesh && clone instanceof THREE.SkinnedMesh) {
                    const mat = obj.material as THREE.MeshBasicMaterial;
                    clone.material = mat.clone();
                }
            }

            model.data.add(clone);
        }

        if (cloneAnimations) {
            for (let anim of this.animations) {
                const clone = anim.clone();
                model.animations.push(clone);
            }
        }

        return model;
    }

    constructor() {
        this._data = new THREE.Group();
        this._mixer = new THREE.AnimationMixer(this._data);
        this._animations = [];
    }

    /**
     * Is being used in the game loop from Lunanore. Do not call this manually unless you absolutely know what you are doing.
     * @param dt Delta time
     */
    public async update(dt: number) {
        this._mixer.update(dt);
    }

    /**
     * Plays an animation clip
     * @param source The animation clip or the name of the animation clip
     * @param loop If true, the animation will not stop unless stopped manually.
     * @returns The animation action created by the mixer.
     */
    public async play(source: string | THREE.AnimationClip, loop: boolean = false): Promise<THREE.AnimationAction> {
        let clip: THREE.AnimationClip = null;

        if (typeof (source) == "string") {
            clip = this._animations.find(x => x.name == source) ?? null;
        }

        if (source instanceof THREE.AnimationClip) {
            clip = source;
        }

        if (clip != null) {
            const action = this._mixer.clipAction(clip);
            action.loop = loop ? THREE.LoopRepeat : THREE.LoopOnce;
            action.play();

            return action;
        }

        return null;
    }

    /* STATIC FUNCTIONS */
    /**
     * Generates a cube model with a single mesh and no animations.
     * If no material is specified, the mesh will use a MeshStandardMaterial with default values.
     * @param size The size of the cube. Default is 1.
     * @param mat The material used by the mesh.
     * @returns A new cube Model instance.
     */
    public static cube(size: number = 1, mat: THREE.Material = null): Model {
        let geom = new THREE.BoxGeometry(size, size, size);

        if (mat == null) {
            mat = new THREE.MeshStandardMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        const model = new Model();
        model.material = mat;
        model.data.add(mesh);

        return model;
    }

    /**
     * Generates a sphere model with a single mesh and no animations.
     * If no material is specified, the mesh will use a MeshStandardMaterial with default values.
     * @param radius The radius of the sphere. Default is 1.
     * @param widthSegments The number of horizontal segments. Default is 16.
     * @param heightSegments The number of vertical segments. Default is 12.
     * @param mat The material used by the mesh.
     * @returns A new sphere Model instance.
     */
    public static sphere(radius: number = 1, widthSegments: number = 16, heightSegments: number = 12, mat: THREE.Material = null): Model {
        let geom = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

        if (mat == null) {
            mat = new THREE.MeshStandardMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        const model = new Model();
        model.material = mat;
        model.data.add(mesh);

        return model;
    }

    /**
     * Generates a cone model with a single mesh and no animations.
     * If no material is specified, the mesh will use a MeshStandardMaterial with default values.
     * @param radius The radius of the cone base. Default is 1.
     * @param height The height of the cone. Default is 2.
     * @param radialSegments The number of radial segments. Default is 16.
     * @param mat The material used by the mesh.
     * @returns A new cone Model instance.
     */
    public static cone(radius: number = 1, height: number = 2, radialSegments: number = 16, mat: THREE.Material = null): Model {
        let geom = new THREE.ConeGeometry(radius, height, radialSegments);

        if (mat == null) {
            mat = new THREE.MeshStandardMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        const model = new Model();
        model.material = mat;
        model.data.add(mesh);

        return model;
    }

    /**
     * Generates a box model with a single mesh and no animations.
     * If no material is specified, the mesh will use a MeshStandardMaterial with default values.
     * @param width The width of the box. Default is 1.
     * @param height The height of the box. Default is 1.
     * @param depth The depth of the box. Default is 1.
     * @param mat The material used by the mesh.
     * @returns A new box Model instance.
     */
    public static box(width: number = 1, height: number = 1, depth: number = 1, mat: THREE.Material = null): Model {
        let geom = new THREE.BoxGeometry(width, height, depth);

        if (mat == null) {
            mat = new THREE.MeshStandardMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        const model = new Model();
        model.material = mat;
        model.data.add(mesh);

        return model;
    }

    /**
     * Generates a cylinder model with a single mesh and no animations.
     * If no material is specified, the mesh will use a MeshStandardMaterial with default values.
     * @param radiusTop The radius of the cylinder at the top. Default is 1.
     * @param radiusBottom The radius of the cylinder at the bottom. Default is 1.
     * @param height The height of the cylinder. Default is 2.
     * @param radialSegments The number of radial segments. Default is 16.
     * @param mat The material used by the mesh.
     * @returns A new cylinder Model instance.
     */
    public static cylinder(radiusTop: number = 1, radiusBottom: number = 1, height: number = 2, radialSegments: number = 16, mat: THREE.Material = null): Model {
        let geom = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);

        if (mat == null) {
            mat = new THREE.MeshStandardMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        const model = new Model();
        model.material = mat;
        model.data.add(mesh);

        return model;
    }

    /**
     * Generates a torus model with a single mesh and no animations.
     * If no material is specified, the mesh will use a MeshStandardMaterial with default values.
     * @param radius The radius from the center of the torus to the center of the tube. Default is 1.
     * @param tube The radius of the tube. Default is 0.4.
     * @param radialSegments The number of radial segments. Default is 16.
     * @param tubularSegments The number of tubular segments. Default is 100.
     * @param mat The material used by the mesh.
     * @returns A new torus Model instance.
     */
    public static torus(radius: number = 1, tube: number = 0.4, radialSegments: number = 16, tubularSegments: number = 100, mat: THREE.Material = null): Model {
        let geom = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);

        if (mat == null) {
            mat = new THREE.MeshStandardMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        const model = new Model();
        model.material = mat;
        model.data.add(mesh);

        return model;
    }

    /**
     * Generates a torus knot model with a single mesh and no animations.
     * If no material is specified, the mesh will use a MeshStandardMaterial with default values.
     * @param radius The radius from the center of the torus knot to the center of the tube. Default is 1.
     * @param tube The radius of the tube. Default is 0.4.
     * @param tubularSegment The number of tubular segments. Default is 100.
     * @param radialSegments The number of radial segments. Default is 16.
     * @param p The number of times the geometry winds around its axis of rotational symmetry. Default is 2.
     * @param q The number of times the geometry winds around a circle in the interior of the torus. Default is 3.
     * @param mat The material used by the mesh.
     * @returns A new torus knot Model instance.
     */
    public static torusKnot(radius: number = 1, tube: number = 0.4, tubularSegments: number = 100, radialSegments: number = 16, p: number = 2, q: number = 3, mat: THREE.Material = null): Model {
        let geom = new THREE.TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q);

        if (mat == null) {
            mat = new THREE.MeshStandardMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        const model = new Model();
        model.material = mat;
        model.data.add(mesh);

        return model;
    }

    /**
     * Generates a plane model with a single mesh and no animations.
     * If no material is specified, the mesh will use a MeshStandardMaterial with default values.
     * @param width The width of the plane. Default is 1.
     * @param height The height of the plane. Default is 1.
     * @param widthSegments The number of width segments. Default is 1.
     * @param heightSegments The number of height segments. Default is 1.
     * @param mat The material used by the mesh.
     * @returns A new plane Model instance.
     */
    public static plane(width: number = 1, height: number = 1, widthSegments: number = 1, heightSegments: number = 1, mat: THREE.Material = null): Model {
        let geom = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);

        if (mat == null) {
            mat = new THREE.MeshStandardMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        const model = new Model();
        model.material = mat;
        model.data.add(mesh);

        return model;
    }
}