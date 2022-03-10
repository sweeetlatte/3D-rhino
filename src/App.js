import "./styles.css";
import "./input.css";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import * as THREE from "three";
import { DDSLoader } from "three-stdlib";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { render, events } from "@react-three/fiber";
import { Physics, usePlane } from "@react-three/cannon";
import {
    Environment,
    OrbitControls,
    MeshReflectorMaterial,
    Html,
    useTexture,
    SpotLight,
} from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

import "./cursor.svg";

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

    //animation 1
    const scale = spring.to([0, 1], [0, 3]);
    const rotation = spring.to([0, 1], [0, 1]);

    //animation 2
    const scale2 = spring.to([8, 1], [-1, 0]);
    const rotation2 = spring.to([3, -19], [0, -1]);

    return (
        <a.group
            position-y={(active === 2 && -0.5)}
        >
            <a.mesh
                rotation-y={(active === 1 && rotation)
                    || (active === 2 && rotation2)
                }
                position-x={(active === 2 && -1)}
                position-z={(active === 1 && scale)
                    || (active === 2 && 3)
                }
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
    const [display, setDisplay] = useState("hidden");

    function delayAnimate() {
        setTimeout(function () {
            setActive(1);
        }, 2400);
        setTimeout(function () {
            setDisplay("block");
        }, 3200);
    }

    function updateDisplay() {
        if (active === 2) {
            setDisplay("hidden");
        }
    }
    useEffect(() => updateDisplay(), [active]);

    return (
        <div className="App" style={{ backgroundColor: "black", cursor: "url('./cursor.png'),auto" }}>
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
                                width: "86vw",
                                lineHeight: 1,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
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
                                    delayAnimate();
                                }}
                            >
                                EXPLORE
                            </button>
                        </div>
                    </Html>
                </mesh>
                <mesh>
                    <Html>
                        <div className={`${display} tetx-white`}>
                            <div
                                className="text-white text-[17px] w-max absolute left-[-3vw] top-[-47vh]"
                                style={{
                                    fontFamily: "sans-serif",
                                }}
                            >Select a Point</div>
                            <div className="dot-hover"
                            // onClick={() => { setActive(1) }}
                            >
                                <div className="dot cursor-none bg-white rounded-full absolute w-[20px] hover:w-[54px] h-[20px] hover:h-[54px] flex justify-center items-center text-5xl top-5 hover:top-0 left-[-33.75rem] hover:left-[-34.75rem]">
                                    <div>+</div>
                                </div>
                                <div
                                    className="text-white text-[17px] w-max absolute left-[-3vw] top-[43vh]"
                                    style={{
                                        fontFamily: "sans-serif",
                                    }}
                                >Poor Vision</div>
                            </div>
                            <div className="dot-hover"
                            // onClick={() => { setActive(1) }}
                            >
                                <div className="dot cursor-none bg-white rounded-full absolute w-[20px] hover:w-[54px] h-[20px] hover:h-[54px] flex justify-center items-center text-5xl top-[-14.75rem] hover:top-[-16rem] left-[-16.75rem] hover:left-[-17.75rem]">
                                    <div>+</div>
                                </div>
                                <div
                                    className="text-white text-[17px] w-max absolute left-[-3vw] top-[43vh]"
                                    style={{
                                        fontFamily: "sans-serif",
                                    }}
                                >Average Weight</div>
                            </div>
                            <div className="dot-hover"
                            // onClick={() => { setActive(2) }}
                            >
                                <div className="dot cursor-none bg-white rounded-full absolute w-[20px] hover:w-[54px] h-[20px] hover:h-[54px] flex justify-center items-center text-5xl top-[-7.75rem] hover:top-[-9rem] left-[-0.75rem] hover:left-[-1.75rem]">
                                    <div>+</div>
                                </div>
                                <div
                                    className="text-white text-[17px] w-max absolute left-[-3vw] top-[43vh]"
                                    style={{
                                        fontFamily: "sans-serif",
                                    }}
                                >Color</div>
                            </div>
                            <div className="dot-hover"
                                onClick={() => { setActive(2) }}
                            >
                                <div className="dot cursor-none bg-white rounded-full absolute w-[20px] hover:w-[54px] h-[20px] hover:h-[54px] flex justify-center items-center text-5xl top-[-24.75rem] hover:top-[-26rem] left-[32.25rem] hover:left-[31.5rem]">
                                    <div>+</div>
                                </div>
                                <div
                                    className="text-white text-[17px] w-max absolute left-[-3vw] top-[43vh]"
                                    style={{
                                        fontFamily: "sans-serif",
                                    }}
                                >Rhino Horn</div>
                            </div>
                        </div>
                    </Html>
                </mesh>
                <mesh>
                    <Html>
                        <div
                            className={` bg-[#A9B2A0] w-[43.9vw] h-screen absolute left-[6.1vw] top-[-50vh] p-9 flex flex-col justify-between`}
                            style={{ display: active === 2 ? "flex" : "none", animation: "slideLeft-2 2000ms", animationFillMode: "both" }}
                        >
                            <div className="flex justify-between text-xl font-sans pb-9" style={{ borderBottom: "1px solid black" }}>
                                <div>01. Rhino Horn</div>
                                <div>Close</div>
                            </div>
                            <div className="px-24 text-left">
                                <div className="font-title text-[100px]  leading-[6.75rem]">
                                    THERE ARE 5 SPECIES OF RHINO...
                                </div>
                                <div className="font-sans text-xl pt-16">
                                    ...Two African – black and white rhinos – and three Asian – greater one-horned, Sumatran and Javan rhinos. Three of these (black, Sumatran and Javan) are listed as ‘critically endangered’ by IUCN – there are thought to be fewer than 70 Javan and 100 Sumatran rhinos left in the wild, meaning their populations are truly under threat of extinction.
                                </div>
                            </div>
                            <div className="flex items-end justify-between font-sans">
                                <div>02</div>
                                <div className="border border-black rounded-[50px] py-3 px-11 text-[27px]">NEXT FACT</div>
                            </div>
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
                        castShadow={true}
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
                        castShadow={true}
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
                        castShadow={true}
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
                </Suspense>
            </Canvas>
        </div>
    );
}
