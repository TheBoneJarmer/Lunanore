import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Model } from "./model";
import { Sound } from "./sound";
import { Lunanore } from "./lunanore";

export class Assets {
    private static _gltfLoader: GLTFLoader = new GLTFLoader();
    private static _texLoader: THREE.TextureLoader = new THREE.TextureLoader();
    private static _models: Map<string, Model> = new Map();
    private static _sounds: Map<string, Sound> = new Map();
    private static _textures: Map<string, THREE.Texture> = new Map();

    public static getModel(key: string): Model {
        const model = this._models.get(key);

        if (!model) {
            throw new Error(`No model was found with key '${key}'`);
        }

        return model;
    }

    public static getSound(key: string): Sound {
        const sound = this._sounds.get(key);

        if (!sound) {
            throw new Error(`No sound was found with key '${key}'`);
        }

        return sound;
    }

    public static getTexture(key: string): THREE.Texture {
        const sound = this._textures.get(key);

        if (!sound) {
            throw new Error(`No texture was found with key '${key}'`);
        }

        return sound;
    }

    public static async addModel(key: string, model: Model) {
        if (this._models.has(key)) {
            throw new Error("A model with this key already exists");
        }

        this._models.set(key, model);
    }

    public static async importSound(key: string, path: string): Promise<Sound> {
        const sound = new Sound(path);
        this._sounds.set(key, sound);

        return sound;
    }

    public static async importTexture(key: string, path: string): Promise<THREE.Texture> {
        const tex = await this._texLoader.loadAsync(path);
        tex.colorSpace = THREE.SRGBColorSpace;

        this._textures.set(key, tex);
        return tex;
    }

    public static async importModel(key: string, path: string) {
        let model: Model | null = null;

        if (path.endsWith(".glb") || path.endsWith(".gltf")) {
            model = await this.importModel_GLTF(path);
        }

        if (model != null) {
            if (Lunanore.options.graphics.shadows.enabled) {
                await this.importModel_EnableShadows(model.data.children);
            }

            await this.addModel(key, model);
            return;
        }

        throw new Error("Unsupported model format");
    }

    private static async importModel_EnableShadows(children: THREE.Object3D[]) {
        for (let child of children) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }

            if (child instanceof THREE.SkinnedMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }

            await this.importModel_EnableShadows(child.children);
        }
    }

    private static async importModel_GLTF(path: string): Promise<Model> {
        const gltf = await this._gltfLoader.loadAsync(path, undefined);

        const model = new Model();
        model.data = gltf.scene;
        model.animations = gltf.animations;

        return model;
    }
}
