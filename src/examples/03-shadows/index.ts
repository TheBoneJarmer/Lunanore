import { Lunanore, Scene } from "../../lunanore";

class SceneMain extends Scene {
    public async init() {
        
    }

    public async update(dt: number) {
        
    }
}

Lunanore.init();
Lunanore.register("main", new SceneMain());
Lunanore.run("main");