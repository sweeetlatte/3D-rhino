import React from "react";
import { useLoader } from "@react-three/fiber";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useFrame } from "@react-three/fiber";


export default function Scene({ active }) {
    const materials = useLoader(MTLLoader, "rhino.mtl");
    const obj = useLoader(OBJLoader, "rhino.obj", (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });

    useFrame(() => {
        if (active === 2) {
            if (obj.position.y > -0.5) {
                obj.position.y += -0.5 / 10;
            }
            if (obj.position.z < 1.1) {
                obj.position.z += 1.1 / 10;
            }
            if (obj.rotation.z > -1.5) {
                obj.rotation.z -= 0.02;
            }
            setTimeout(() => {
                if (obj.position.x > -1) {
                    obj.position.x -= 1 / 45;
                }
            }, 1200);
            // obj.position.y = -0.5;
            // obj.position.z = 3.2;
            // obj.rotation.z = -1.5;
            // obj.position.x = -0.75; change after 3 above
        } else if (active === 3) {
            if (obj.position.x < 0.05) {
                obj.position.x += 0.025;
            }

            if (obj.position.z > 0.9) {
                obj.position.z -= 0.06;
            }

            if (obj.rotation.z < -0.5) {
                obj.rotation.z -= -0.022;
            }

            if (obj.position.y < 0) {
                obj.position.y += 0.05;
            }
            // obj.position.x = 0.05;
            // obj.position.z = 3;
            // obj.rotation.z = -0.5;
        } else if (active === 1 && obj.position.y !== 0) {
            if (obj.position.x < 0.05) {
                obj.position.x += 0.001;
            }

            if (obj.position.z < 0.9) {
                obj.position.z += 0.06;
            }

            if (obj.rotation.z < -0.5) {
                obj.rotation.z -= -0.022;
            }

            if (obj.position.y > -0.2) {
                obj.position.y -= 0.05;
            }
        } else if (active === 1 && obj.position.y === 0) {
            if (obj.position.x < 0.05) {
                obj.position.x += 0.05 / 30;
            }

            if (obj.position.z < 0.9) {
                obj.position.z += 0.9 / 30;
            }

            if (obj.rotation.z < -0.5) {
                obj.rotation.z -= -0.5 / 15;
            }

            if (obj.position.y < -0.2) {
                obj.position.y += 0.2 / 30;
            }
            // obj.position.x = 0.05;
            // obj.position.z = 0.9;
            // obj.rotation.z = -0.5;
        }
    });

    return (
        <primitive
            object={obj}
            scale={3.5}
            rotation={[
                (-Math.PI / 180) * (90 - 1.333),
                (-Math.PI / 180) * -0.1,
                (-Math.PI / 180) * 90,
            ]}
        />
    );
}
