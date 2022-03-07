import "./styles.css";
import "./input.css";
import { useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { Suspense } from "react";
import { Physics, usePlane } from "@react-three/cannon";
import { render, events } from "@react-three/fiber";
import {
    Environment,
    OrbitControls,
    MeshReflectorMaterial,
    Html,
    useTexture,
    SpotLight,
} from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

// window.addEventListener("resize", () =>
//     render(<mesh />, document.querySelector("canvas"), {
//         events,
//         size: { width: window.innerWidth / 2, height: window.innerHeight / 2 },
//     })
// );

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = ({ active, setActive }) => {
    const materials = useLoader(MTLLoader, "rhino.mtl");
    const obj = useLoader(OBJLoader, "rhino.obj", (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });

    const { spring } = useSpring({
        spring: active,
        config: {
            mass: 5,
            tension: 200, //spring energetic load: the bigger, the faster
            friction: 50,
            precision: 0.0025,
        },
    });

    const scale = spring.to([0, 1], [0, 3]);
    const rotation = spring.to([0, 1], [0, 1]);

    return (
        <a.group
        // position-y={scale}
        >
            <a.mesh
                rotation-y={rotation}
                // position-x={scale}
                position-z={scale}
            // onClick={() => setActive(0)}
            >
                <primitive
                    object={obj}
                    scale={3.5}
                    rotation={[
                        (-Math.PI / 180) * (90 - 1.333),
                        (-Math.PI / 180) * -0.1,
                        (-Math.PI / 180) * 90,
                    ]}
                />
            </a.mesh>
        </a.group>
    );
};

const name = (type) => `Marble016_1K_${type}.jpg`;

function Floor(props) {
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
            tension: 200, //spring energetic load: the bigger, the faster
            friction: 50,
            precision: 0.0025,
        },
    });

    const scale = spring.to([0, 1], [0, 3]);
    const rotation = spring.to([0, 1], [0, 1]);

    return (
        <a.group
        // position-y={scale}
        >
            <a.mesh
                rotation-y={rotation}
                // position-x={scale}
                position-z={scale}
            >
                <mesh ref={ref} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    {/* <MeshReflectorMaterial
                color="#878790"
                blur={[400, 400]}
                resolution={1024}
                mixBlur={1}
                mixStrength={3}
                depthScale={1}
                minDepthThreshold={0.85}
                metalness={0.5}
                roughness={0.5}
            /> */}
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

export default function App() {
    const [z, setZ] = useState(1);
    const [active, setActive] = useState(0);

    return (
        <div className="App" style={{ backgroundColor: "black" }}>
            <div
                style={{
                    fontFamily: "sans-serif",
                    color: "white",
                    position: "absolute",
                    left: "48.15vw",
                    top: "3vh",
                    fontSize: "17px",
                    display: z === 3 ? "none" : "",
                }}
            >
                Endangered
            </div>
            <Canvas
                camera={{
                    position: [0, 0, 6],
                    left: 0,
                    right: 0,
                    far: 10,
                }}
            >
                {/* <directionalLight insensity={1} position={[-8, 3, 5]} /> */}
                {/* <ambientLight intensity={0.3} /> */}
                {/* <spotLight position={[0, 0, 0]} angle={0.3} /> */}
                {/* <directionalLight
                    castShadow
                    position={[0, 10, 0]}
                    insensity={1.5}
                    shadow-camera-near={0.1}
                    shadow-camera-far={20}
                /> */}
                <mesh>
                    <Html scale={1} position={[-7, 1.55, 0]}>
                        <div
                            className="text-[151px] 2xl:text-[216px]"
                            style={{
                                color: "white",
                                // fontSize: "20px",
                                width: "86vw",
                                lineHeight: 1,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    transition: "justifyContent 1s ease-in-out",
                                }}
                            >
                                <div
                                    className={
                                        z === 3 ? "wavy close-reverse" : ""
                                    }
                                >
                                    <span style={{ "--i": 5 }}>R</span>
                                    <span style={{ "--i": 1 }}>H</span>
                                    <span style={{ "--i": 0 }}>I</span>
                                    <span style={{ "--i": 1 }}>N</span>
                                    <span style={{ "--i": 5 }}>O</span>
                                </div>
                                <div
                                    className={
                                        z === 3 ? "dash shorten-dash" : "dash"
                                    }
                                >
                                    —
                                </div>
                                <div className={z === 3 ? "wavy close" : ""}>
                                    <span style={{ "--i": 5 }}>C</span>
                                    <span style={{ "--i": 2 }}>L</span>
                                    <span style={{ "--i": 1 }}>O</span>
                                    <span style={{ "--i": 2 }}>S</span>
                                    <span style={{ "--i": 5 }}>E</span>
                                </div>
                            </div>
                            <div className={z === 3 ? "wavy" : ""}>
                                <span style={{ "--i": 6 }}>T</span>
                                <span style={{ "--i": 5.5 }}>O </span>
                                <span style={{ "--i": 4.5 }}>E</span>
                                <span style={{ "--i": 4 }}>X</span>
                                <span style={{ "--i": 3.5 }}>T</span>
                                <span style={{ "--i": 3 }}>I</span>
                                <span style={{ "--i": 3.5 }}>N</span>
                                <span style={{ "--i": 4 }}>C</span>
                                <span style={{ "--i": 4.5 }}>T</span>
                                <span style={{ "--i": 5 }}>I</span>
                                <span style={{ "--i": 5.5 }}>O</span>
                                <span style={{ "--i": 6 }}>N</span>
                            </div>
                        </div>
                        <div
                            className={z === 3 ? "wavy" : ""}
                            style={{ marginTop: "13.9vh" }}
                        >
                            <button
                                className="btn text-[22px] 2xl:text-[27px]"
                                style={{ "--i": 2 }}
                                onClick={() => {
                                    setZ(3);
                                    setActive(Number(!active));
                                }}
                            >
                                EXPLORE
                            </button>
                        </div>
                    </Html>
                </mesh>
                <Suspense fallback={null}>
                    {/* change 1 to z when everything is done */}
                    <mesh position={[0, -1.5, 1]}>
                        <Scene setActive={setActive} active={active} />
                    </mesh>
                    {/* <OrbitControls /> */}
                    <SpotLight
                        position={[-8, -0.5, 9]}
                        castShadow
                        // target={target}
                        penumbra={1}
                        radiusTop={5}
                        radiusBottom={30}
                        distance={13.5}
                        angle={0.55}
                        attenuation={20}
                        anglePower={5}
                        intensity={2}
                        opacity={0.2}
                    />
                    <SpotLight
                        position={[-2.5, -0.1, 4]}
                        castShadow
                        // target={target}
                        penumbra={1}
                        radiusTop={5}
                        radiusBottom={5}
                        distance={5}
                        angle={0.55}
                        attenuation={30}
                        anglePower={5}
                        intensity={2}
                        opacity={0.2}
                    />
                    <SpotLight
                        position={[3, 3, 3]}
                        castShadow
                        // target={target}
                        penumbra={1}
                        radiusTop={5}
                        radiusBottom={5}
                        distance={5}
                        angle={0.15}
                        attenuation={30}
                        anglePower={5}
                        intensity={2}
                        opacity={0.2}
                    />
                    <Physics>
                        <Floor
                            position={[0, -1.5, 0]}
                            rotation={[
                                (-Math.PI / 180) * (90 - 1.333),
                                (-Math.PI / 180) * -0.5,
                                (-Math.PI / 180) * 30,
                            ]}
                            args={[10, 10]}
                            active={active}
                        />
                    </Physics>
                    {/* <fog attach="fog" args={['#202020', 5, 20]} /> */}
                </Suspense>
            </Canvas>
        </div>
    );
}
