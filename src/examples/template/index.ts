import { Lunanore } from "../../lunanore";
import { Scenes } from "../../lunanore/scenes";
import { SceneMain } from "./scene-main";

window.addEventListener("load", () => {
    const cnv = document.querySelector("canvas")!;

    Lunanore.init(cnv);
    Lunanore.run();

    Scenes.add("main", new SceneMain());
    Scenes.navigate("main");
});

window.addEventListener("resize", () => {
    Lunanore.resize(innerWidth, innerHeight);
});