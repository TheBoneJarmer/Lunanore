import { Keys, ShadowQuality, ShadowType } from "./enums";

export class KeyState {
    code = "";
    key = 0;
    value = 0;

    constructor(code, key) {
        this.code = code;
        this.key = key;
    }
}

export class ShadowOptions {
    enabled = true;
    type = ShadowType.Soft;
    quality = ShadowQuality.Medium;
}

export class GraphicsOptions {
    antialias = true;
    shadows = new ShadowOptions();
}

export class LunanoreOptions {
    graphics = new GraphicsOptions();
}