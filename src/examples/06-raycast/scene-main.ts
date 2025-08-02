import * as THREE from "three";
import { Assets, Model, Mouse, Scene } from "../../lunanore";
import { Cube } from "./cube";

export class SceneMain extends Scene {
    private _raycaster: THREE.Raycaster;

    public async init() {
        Assets.addModel("cube", Model.cube());

        for (let i = 0; i < 10; i++) {
            const cube = new Cube();
            cube.position.x = -8 + Math.random() * 16;
            cube.position.y = -5 + Math.random() * 10;

            this.add(cube);
        }

        this.camera.position.z = 10;

        this._raycaster = new THREE.Raycaster();
    }

    public async update(dt: number) {
        const pointer = new THREE.Vector2();
        pointer.x = (Mouse.x / innerWidth) * 2 - 1;
        pointer.y = (Mouse.y / innerHeight) * 2 - 1;

        this._raycaster.setFromCamera(pointer, this.camera);

        if (Mouse.isButtonPressed(0)) {
            const groups = this.scene.children.filter(x => x instanceof THREE.Group);
            const meshes = groups.map(x => x.children.filter(y => y instanceof THREE.Mesh)).map(x => x[0]);

            for (let mesh of meshes) {
                const mat = mesh.material as THREE.MeshBasicMaterial;
                mat.color.set(1, 1, 1);
            }

            const intersects = this._raycaster.intersectObjects(this.scene.children);

            console.log(intersects);

            for (let intersect of intersects) {
                const obj = intersect.object as THREE.Mesh;
                const mat = obj.material as THREE.MeshBasicMaterial;

                mat.color.set(0, 1, 0);
            }
        }
    }
}