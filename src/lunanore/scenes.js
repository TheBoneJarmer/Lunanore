export class Scenes {
    static #scenes = new Map();
    static #scene = null;
    static #sceneNext = null;

    static get scene() {
        return this.#scene != null ? this.#scenes.get(this.#scene) : null;
    }

    static get(key) {
        return this.#scenes.get(key);
    }

    static add(key, scene) {
        this.#scenes.set(key, scene);
    }

    static navigate(name) {
        const scene = this.#scenes.get(name);

        if (!scene) {
            throw new Error(`No scene found with name '${name}'`);
        }

        this.#sceneNext = name;
    }

    static clear() {
        this.#scenes.clear();
    }

    static async update(dt) {
        if (this.#sceneNext != null) {
            const scene = this.#scenes.get(this.#sceneNext);

            this.#scene = this.#sceneNext;
            this.#sceneNext = null;

            scene.clear();
            await scene.init();
        }

        if (this.#scene != null) {
            const scene = this.#scenes.get(this.#scene);

            for (let obj of scene.actors) {
                const model = obj.model;

                await model.update(dt);
                await obj.update(dt);
            }

            await scene.update(dt);
        }
    }

    static async render(renderer) {
        if (this.#scene != null) {
            const scene = this.#scenes.get(this.#scene);

            renderer.render(scene.scene, scene.camera);
        }
    }
}