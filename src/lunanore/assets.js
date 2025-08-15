import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Model } from "./model";
import { Sound } from "./sound";
import { Lunanore } from "./lunanore";

export class Assets {
    static #gltfLoader = new GLTFLoader();
    static #texLoader = new THREE.TextureLoader();

    static #models = new Map();
    static #sounds = new Map();
    static #textures = new Map();

    static getModel(key) {
        const model = this.#models.get(key);

        if (!model) {
            throw new Error(`No model was found with key '${key}'`);
        }

        return model;
    }

    static getSound(key) {
        const sound = this.#sounds.get(key);

        if (!sound) {
            throw new Error(`No sound was found with key '${key}'`);
        }

        return sound;
    }

    static getTexture(key) {
        const sound = this.#textures.get(key);

        if (!sound) {
            throw new Error(`No texture was found with key '${key}'`);
        }

        return sound;
    }

    static async addModel(key, model) {
        if (this.#models.has(key)) {
            throw new Error("A model with this key already exists");
        }

        this.#models.set(key, model);
    }

    static async importSound(key, path) {
        const sound = new Sound(path);
        this.#sounds.set(key, sound);

        return sound;
    }

    static async importTexture(key, path) {
        const tex = await this.#texLoader.loadAsync(path);
        tex.colorSpace = THREE.SRGBColorSpace;

        this.#textures.set(key, tex);
        return tex;
    }

    static async importModel(key, path) {
        let model = null;

        if (path.endsWith(".glb") || path.endsWith(".gltf")) {
            model = await this.#importModel_GLTF(path);
        }

        if (model != null) {
            if (Lunanore.options.graphics.shadows.enabled) {
                await this.#importModel_EnableShadows(model.data.children);
            }

            await this.addModel(key, model);
            return;
        }

        throw new Error("Unsupported model format");
    }

    static async #importModel_EnableShadows(children) {
        for (let child of children) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }

            if (child instanceof THREE.SkinnedMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }

            await this.#importModel_EnableShadows(child.children);
        }
    }

    static async #importModel_GLTF(path) {
        const gltf = await this.#gltfLoader.loadAsync(path, undefined);

        const model = new Model();
        model.data = gltf.scene;
        model.animations = gltf.animations;

        return model;
    }
}
