import { Lunanore, Scene } from "../../lunanore";

class SceneMain extends Scene {
    public async init() {

    }

    public async update(dt: number) {
        
    }
}

const cnv = document.querySelector("canvas")!;

Lunanore.init(cnv);
Lunanore.register("main", new SceneMain());

Lunanore.scene = "main";
Lunanore.run();