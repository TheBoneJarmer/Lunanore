import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Model } from "./model";

export class Assets {
    private static _gltfLoader = new GLTFLoader();
    private static _models: Map<string, Model> = new Map();

    public static getModel(key: string): Model {
        const model = this._models.get(key);

        if (!model) {
            throw new Error(`No model was found with key '${key}'`);
        }

        return model;
    }

    public static async addModel(key: string, model: Model) {
        if (this._models.has(key)) {
            throw new Error("A model with this key already exists");
        }

        this._models.set(key, model);
    }

    public static async importModel(key: string, path: string) {
        let model: Model | null = null;

        if (path.endsWith(".glb") || path.endsWith(".gltf")) {
            model = await this.loadModel_GLTF(path);
        }

        if (model != null) {
            await this.addModel(key, model);
            return;
        }

        throw new Error("Unsupported model format");
    }

    private static async loadModel_GLTF(path: string): Promise<Model> {
        const gltf = await this._gltfLoader.loadAsync(path, undefined);

        const model = new Model();
        model.data = gltf.scene;
        model.animations = gltf.animations;

        return model;
    }
}
