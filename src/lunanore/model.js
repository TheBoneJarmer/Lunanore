import * as THREE from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

export class Model {
    #mixer = null;
    #data = null;
    #animations = [];
    #material = null;

    /**
     * Returns the model's data. This is allways a Group object because a model does not just contain meshes but also bones as well.
     */
    get data() {
        return this.#data;
    }

    /**
     * Set the model's data. This also creates a new animation mixer if there are animations.
     */
    set data(value) {
        if (value == null) {
            throw new Error("Value cannot be null");
        }

        this.#data = value;
        this.#mixer = new THREE.AnimationMixer(value);
    }

    /**
     * Returns all the model's animation clips
     */
    get animations() {
        return this.#animations;
    }

    /**
     * Sets the animationclip array for this model.
     */
    set animations(value) {
        if (value == null) {
            throw new Error("Value cannot be null");
        }

        this.#animations = value;
    }

    /**
     * Returns the data's position.
     */
    get position() {
        return this.#data.position;
    }

    /**
     * Returns the data's rotation in euler angles.
     */
    get rotation() {
        return this.#data.rotation;
    }

    /**
     * Returns the data's scale.
     */
    get scale() {
        return this.#data.scale;
    }

    /**
     * Returns the model material. By default it will return null because meshes have their own material.
     * But if you set the model material you replace all the meshes's materials with the one from their model.
     */
    get material() {
        return this.#material;
    }

    /**
     * Sets the model material. This will replace all materials from all the model's meshes with this one.
     */
    set material(value) {
        this.#material = value;

        for (let child of this.#data.children) {
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
    clone(cloneMaterials = false, cloneAnimations = false) {
        let model = new Model();

        if (cloneMaterials && this.material != null) {
            model.material = this.material.clone();
        }

        for (let obj of this.#data.children) {
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
                    const mat = obj.material;
                    clone.material = mat.clone();
                }

                if (obj instanceof THREE.SkinnedMesh && clone instanceof THREE.SkinnedMesh) {
                    const mat = obj.material;
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
        this.#data = new THREE.Group();
        this.#mixer = new THREE.AnimationMixer(this.#data);
        this.#animations = [];
    }

    /**
     * Is being used in the game loop from Lunanore. Do not call this manually unless you absolutely know what you are doing.
     * @param dt Delta time
     */
    async update(dt) {
        this.#mixer.update(dt);
    }

    /**
     * Plays an animation clip
     * @param source The animation clip or the name of the animation clip
     * @param loop If true, the animation will not stop unless stopped manually.
     * @returns The animation action created by the mixer.
     */
    async play(source, loop = false) {
        let clip = null;

        if (typeof (source) == "string") {
            clip = this.#animations.find(x => x.name == source) ?? null;
        } else if (source instanceof THREE.AnimationClip) {
            clip = source;
        } else {
            throw new Error("Unsupported source type");
        }

        if (clip != null) {
            const action = this.#mixer.clipAction(clip);
            action.loop = loop ? THREE.LoopRepeat : THREE.LoopOnce;
            action.play();

            return action;
        }

        return null;
    }

    /* STATIC FUNCTIONS */
    static cube(size = 1, mat = null) {
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

    static sphere(radius= 1, widthSegments = 16, heightSegments = 12, mat = null) {
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

    static cone(radius = 1, height = 2, radialSegments = 16, mat = null) {
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

    static box(width = 1, height = 1, depth = 1, mat = null) {
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

    static cylinder(radiusTop = 1, radiusBottom = 1, height = 2, radialSegments = 16, mat = null) {
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

    static torus(radius = 1, tube = 0.4, radialSegments = 16, tubularSegments = 100, mat = null) {
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

    static torusKnot(radius = 1, tube = 0.4, tubularSegments = 100, radialSegments = 16, p = 2, q = 3, mat = null) {
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

    static plane(width = 1, height = 1, widthSegments = 1, heightSegments = 1, mat = null) {
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