import { Luna, GameScene } from "../../lunanore/";

class SceneMain extends GameScene {
    public async init() {

    }

    public async update(dt: number) {
        super.update(dt);
    }
}

Luna.init().then(async () => {
    Luna.scene = new SceneMain();
    await Luna.run();
});