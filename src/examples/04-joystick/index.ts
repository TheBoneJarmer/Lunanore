import { Lunanore } from "../../lunanore";
import { Scenes } from "../../lunanore/scenes";
import { SceneMain } from "./scene-main";

const cnv = document.querySelector("canvas")!;

Lunanore.init(cnv);

Scenes.add("main", new SceneMain());
Scenes.navigate("main");

Lunanore.run();