export class Actor {
    static #count = 0;

    #id = 0;
    #tag = "";
    #model = null;

    get id() {
        return this.#id;
    }

    get tag() {
        return this.#tag;
    }

    get model() {
        return this.#model;
    }

    get position() {
        return this.#model.position;
    }

    get rotation() {
        return this.#model.rotation;
    }

    get scale() {
        return this.#model.scale;
    }

    constructor(tag, model) {
        this.#tag = tag;
        this.#model = model;
        this.#id = Actor.#count;
        Actor.#count++;
    }

    /* OVERRIDES */
    async update(dt) {
        
    }
}