import { Lunanore, Scene } from "../../lunanore";
import { Scenes } from "../../lunanore/scenes";

class SceneMain extends Scene {
    public async init() {

    }

    public async update(dt: number) {
        
    }
}

const cnv = document.querySelector("canvas")!;

Lunanore.init(cnv);

Scenes.add("main", new SceneMain());
Scenes.navigate("main");

Lunanore.run();