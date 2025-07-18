import { Lunanore, Scene } from "../../lunanore";

class SceneMain extends Scene {
    public async init() {
        
    }

    public async update(dt: number) {
        
    }
}

Lunanore.init().then(async () => {
    Lunanore.scene = new SceneMain();
    await Lunanore.run();
});