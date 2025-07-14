import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Model } from "./model";

export class AssetLoader {
    private static _gltfLoader = new GLTFLoader();

    public static async loadModel(path: string): Promise<Model> {
        if (path.endsWith(".glb") || path.endsWith(".gltf")) {
            return await this.loadModel_GLTF(path);
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
