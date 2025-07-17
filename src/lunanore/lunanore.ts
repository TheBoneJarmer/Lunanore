import { Clock, WebGLRenderer } from "three";
import { LunaScene } from "./luna-scene";
import { LunaKeyboard } from "./luna-keyboard";
import { LunaMouse } from "./luna-mouse";

export class Lunanore {
    private static _handle: number = -1;
    private static _sceneNext: LunaScene = null;
    private static _scene: LunaScene = null;
    private static _renderer: WebGLRenderer = null;
    private static _clock: Clock = new Clock();

    public static get canvas(): HTMLCanvasElement {
        return Lunanore._renderer?.domElement;
    }

    public static get scene(): LunaScene {
        return Lunanore._scene;
    }

    public static set scene(value: LunaScene) {
        Lunanore._sceneNext = value;
    }

    public static async init() {
        Lunanore._clock = new Clock();
        Lunanore._renderer = new WebGLRenderer();
        Lunanore._renderer.setSize(innerWidth, innerHeight);
        document.body.appendChild(Lunanore._renderer.domElement);

        window.addEventListener("resize", Lunanore.resize);

        LunaKeyboard.init();
        LunaMouse.init();
    }

    public static async run() {
        try {
            if (Lunanore._sceneNext != null) {
                Lunanore._scene = Lunanore._sceneNext;
                Lunanore._sceneNext = null;

                await Lunanore._scene.clear();
                await Lunanore._scene.init();
            }

            if (Lunanore._scene != null) {
                const dt = Lunanore._clock.getDelta();

                for (let obj of Lunanore._scene.objects) {
                    await obj.model.update(dt);
                    await obj.update(dt);
                }

                await Lunanore._scene.update(dt);
                
                Lunanore._renderer.render(Lunanore._scene.scene, Lunanore._scene.camera);
            }

            LunaKeyboard.update();
            LunaMouse.update();
        } catch (error) {
            console.error("An error occurred during the game loop");
            console.error(error);

            cancelAnimationFrame(Lunanore._handle);
            Lunanore._handle = -1;
            return;
        }

        Lunanore._handle = requestAnimationFrame(Lunanore.run);
    }

    public static resize() {
        if (Lunanore._scene != null) {
            Lunanore._scene.camera.aspect = innerWidth / innerHeight;
            Lunanore._scene.camera.updateProjectionMatrix();
        }

        if (Lunanore._renderer != null) {
            Lunanore._renderer.setSize(innerWidth, innerHeight);
        }
    };
}
