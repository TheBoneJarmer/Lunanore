import { Lunanore, LunaScene } from "../../lunanore";

class SceneMain extends LunaScene {
    public async init() {

    }

    public async update(dt: number) {
        super.update(dt);
    }
}

Lunanore.init().then(async () => {
    Lunanore.scene = new SceneMain();
    await Lunanore.run();
});