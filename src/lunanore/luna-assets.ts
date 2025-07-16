import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { LunaModel } from "./luna-model";

export class LunaAssets {
    private static _gltfLoader = new GLTFLoader();

    public static async loadModel(path: string): Promise<LunaModel> {
        if (path.endsWith(".glb") || path.endsWith(".gltf")) {
            return await this.loadModel_GLTF(path);
        }

        throw new Error("Unsupported model format");
    }

    private static async loadModel_GLTF(path: string): Promise<LunaModel> {
        const gltf = await this._gltfLoader.loadAsync(path, undefined);

        const model = new LunaModel();
        model.data = gltf.scene;
        model.animations = gltf.animations;

        return model;
    }
}
