import { Keys, ShadowQuality, ShadowType } from "./enums";

export class KeyState {
    public code: string;
    public key: Keys;
    public value: number;

    constructor(code: string, key: Keys) {
        this.code = code;
        this.key = key;
        this.value = 0;
    }
}

export class ShadowOptions {
    public enabled: boolean;
    public type: ShadowType;
    public quality: ShadowQuality;

    constructor() {
        this.enabled = true;
        this.type = ShadowType.SOFT;
        this.quality = ShadowQuality.MEDIUM;
    }
}

export class GraphicsOptions {
    public antialias: boolean;
    public shadows: ShadowOptions;

    constructor() {
        this.antialias = true;
        this.shadows = new ShadowOptions();
    }
}

export class LunanoreOptions {
    public graphics: GraphicsOptions;

    constructor() {
        this.graphics = new GraphicsOptions();
    }
}