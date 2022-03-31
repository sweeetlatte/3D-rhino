import React from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { usePlane } from "@react-three/cannon";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { useLoader } from "@react-three/fiber";

export default function Floor(props) {
    const name = (type) => `Marble016_1K_${type}.jpg`;

    const { active } = props;

    const [ref] = usePlane(() => ({ type: "Static", ...props }));

    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] =
        useLoader(TextureLoader, [
            name("Color"),
            name("Displacement"),
            name("Normal"),
            name("Roughness"),
            name("AmbientOcclusion"),
        ]);

    const { spring } = useSpring({
        spring: active,
        config: {
            mass: 5,
            tension: 145, //spring energetic load: the bigger, the faster
            friction: 50,
            precision: 0.0025,
        },
    });

    const scale = spring.to([0, 1], [0, 3]);
    const rotation = spring.to([0, 1], [0, 1]);

    return (
        <a.group>
            <a.mesh rotation-y={rotation} position-z={scale}>
                <mesh ref={ref} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial
                        displacementScale={0.2}
                        map={colorMap}
                        displacementMap={displacementMap}
                        normalMap={normalMap}
                        roughnessMap={roughnessMap}
                        aoMap={aoMap}
                    />
                </mesh>
            </a.mesh>
        </a.group>
    );
}
