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
import { render, events, useFrame } from "@react-three/fiber";
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
import { cart } from "./Cart.png";

// window.addEventListener("resize", () =>
//     render(<mesh />, document.querySelector("canvas"), {
//         events,
//         size: { width: window.innerWidth / 2, height: window.innerHeight / 2 },
//     })
// );

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = ({ active, close }) => {
    const materials = useLoader(MTLLoader, "rhino.mtl");
    const obj = useLoader(OBJLoader, "rhino.obj", (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });

    console.log("close", close);
    console.log("active", active);
    console.log("pos x", obj.position.x, "pos y", obj.position.y, "pos z", obj.position.z, "rot z", obj.rotation.z);

    useFrame((state) => {
        const a = state.clock.getElapsedTime();

        if (active === 2) {
            if (obj.position.y > -0.5) {
                obj.position.y += -0.5 / 10;
                // obj.position.y = -0.5;
                // console.log("y of active 2", obj.position.y);
            }
            if (obj.position.z < 3.2) {
                obj.position.z += 0.012;
                // obj.position.z = 3.2;
                // console.log("z of active 2");
            }
            if (obj.rotation.z > -1.5) {
                obj.rotation.z -= 0.02;
                // obj.rotation.z = -1.5;
                // console.log("rot z of active 2");

            }
            setTimeout(() => {
                if (obj.position.x > -0.75) {
                    obj.position.x -= 0.0095;
                    // obj.position.x = -0.75;
                    // console.log("x of active 2");

                }
            }, 1000);
            // obj.position.y = -0.5;
            // obj.position.z = 3.2;
            // obj.rotation.z = -1.5;
            // obj.position.x = -0.75; change after 3 above
        }
        else if (active === 3) {
            if (obj.position.x < 0.05) {
                obj.position.x += 0.025;
                // console.log("x of close", obj.position.x);
            }

            if (obj.position.z > 3) {
                obj.position.z -= 0.06;
                // console.log("z of close", obj.position.z);
            }

            if (obj.rotation.z < -0.5) {
                obj.rotation.z -= -0.022;
                // console.log("rot z of close", obj.rotation.z);
            }

            if (obj.position.y < 0) {
                obj.position.y += 0.05;
                // console.log("y of close", obj.position.y);
            }

            // obj.position.x = 0.05;
            // obj.position.z = 3;
            // obj.rotation.z = -0.5;
        }
        else if (active === 1 && obj.position.y !== 0) {
            if (obj.position.x < 0.05) {
                obj.position.x += 0.001;
            }

            if (obj.position.z < 3) {
                obj.position.z += 0.06;
            }

            if (obj.rotation.z < -0.5) {
                obj.rotation.z -= -0.022;
            }

            if (obj.position.y > -0.2) {
                obj.position.y -= 0.05;
            }
        }

        else if (active === 1 && obj.position.y === 0) {
            if (obj.position.x < 0.05) {
                obj.position.x += 0.001;
            }

            if (obj.position.z < 3) {
                obj.position.z += 0.06;
            }

            if (obj.rotation.z < -0.5) {
                obj.rotation.z -= -0.022;
            }

            if (obj.position.y < -0.2) {
                obj.position.y += 0.05;
            }
            // obj.position.x = 0.05;
            // obj.position.z = 3;
            // obj.rotation.z = -0.5;
        }
    })

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
    const [reverse, setReverse] = useState(null);
    const [close, setClose] = useState(null);

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
        } else if (active === 1 || active === 3) {
            setTimeout(function () {
                setDisplay("block");
            }, 800);
        }
    }
    useEffect(() => updateDisplay(), [active]);

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
                className="custom"
                camera={{
                    position: [0, 0, 6],
                    left: 0,
                    right: 0,
                    far: 10,
                }}
                shadows
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
                        <div className="text-[151px] 2xl:text-[216px] w-[80vw] 2xl:w-[86vw] text-white leading-none">
                            <div className="flex justify-between">
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
                                <span style={{ "--i": 5.5 }}>O</span>
                                <span style={{ "--i": 5.5 }}>&nbsp;</span>
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
                            <div
                                className="btn text-[22px] 2xl:text-[27px] w-max mx-auto"
                                style={{ "--i": 2 }}
                                onClick={() => {
                                    setZ(3);
                                    delayAnimate();
                                }}
                            >
                                EXPLORE
                            </div>
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
                                onMouseLeave={() => {
                                    setReverse("transform-reverse");
                                }}
                            >
                                <div className="dot cursor-none bg-white rounded-full absolute w-[20px] hover:w-[54px] h-[20px] hover:h-[54px] flex justify-center items-center text-5xl 2xl:top-5 top-3 hover:top-0 2xl:left-[-33.75rem] left-[-25.75rem] 2xl:hover:left-[-34.75rem] hover:left-[-26.75rem]">
                                    <div>+</div>
                                </div>
                                <div
                                    className={`text-white text-[17px] w-max absolute left-[-3vw] top-[43vh] ${reverse}`}
                                    style={{
                                        fontFamily: "sans-serif",
                                    }}
                                >Poor Vision</div>
                            </div>
                            <div className="dot-hover"
                            >
                                <div className="dot cursor-none bg-white rounded-full absolute w-[20px] hover:w-[54px] h-[20px] hover:h-[54px] flex justify-center items-center text-5xl 2xl:top-[-14.75rem] top-[-11.75rem] 2xl:hover:top-[-16rem] hover:top-[-13rem] 2xl:left-[-16.75rem] left-[-11.75rem] 2xl:hover:left-[-17.75rem] hover:left-[-12.75rem]">
                                    <div>+</div>
                                </div>
                                <div
                                    className={`text-white text-[17px] w-max absolute left-[-3vw] top-[43vh] ${reverse}`}

                                    style={{
                                        fontFamily: "sans-serif",
                                    }}
                                >
                                    Average Weight
                                </div>
                            </div>
                            <div className="dot-hover"
                            >
                                <div className="dot cursor-none bg-white rounded-full absolute w-[20px] hover:w-[54px] h-[20px] hover:h-[54px] flex justify-center items-center text-5xl 2xl:top-[-7.75rem] top-[-5.75rem] 2xl:hover:top-[-9rem] hover:top-[-6.75rem] left-[-0.75rem] 2xl:hover:left-[-1.75rem] hover:left-[-1.75rem]">
                                    <div>+</div>
                                </div>
                                <div
                                    className={`text-white text-[17px] w-max absolute left-[-3vw] top-[43vh] ${reverse}`}

                                    style={{
                                        fontFamily: "sans-serif",
                                    }}
                                >
                                    Color
                                </div>
                            </div>
                            <div className="dot-hover"
                                onClick={() => { setActive(2) }}
                            >
                                <div className="dot cursor-none bg-white rounded-full absolute w-[20px] hover:w-[54px] h-[20px] hover:h-[54px] flex justify-center items-center text-5xl 2xl:top-[-24.75rem] top-[-18.5rem] 2xl:hover:top-[-26rem] hover:top-[-20rem] 2xl:left-[32.25rem] left-[24rem] 2xl:hover:left-[31.5rem] hover:left-[23rem]">
                                    <div>+</div>
                                </div>
                                <div
                                    className={`text-white text-[17px] w-max absolute left-[-3vw] top-[43vh] ${reverse}`}
                                    style={{
                                        fontFamily: "sans-serif",
                                    }}
                                >
                                    Rhino Horn
                                </div>
                            </div>
                        </div>
                    </Html>
                </mesh>
                <mesh>
                    <Html>
                        <div
                            className={`bg-[#A9B2A0] w-[43.9vw] h-screen absolute left-[50vw] top-[-50vh] p-9 flex flex-col justify-between`}
                            style={{
                                animation:
                                    // active === 2 ? "slideLeft 2000ms both 1000ms" :
                                    //     "slideRight 2000ms both"
                                    (active === 2 && "slideLeft 966ms both 1500ms")
                                // "slideLeft 2000ms"
                                ,
                            }}
                        >
                            {/* 9.800 -> 11.300: animation xong chính diện = 1500
                                -> 12.266: animation info bg xong
                                -> 12.133: 01. rhino hiện ra -> 12.666 xong
                                11.866 -> 12.866: title xong
                                11.966 -> 13.700: text xong */}
                            <div
                                className="flex justify-between text-xl font-sans pb-9"
                                style={{
                                    borderBottom: "1px solid black",
                                    animation: (active === 2 && "transform 533ms both 2333ms")
                                }}
                            >
                                <div>01. Rhino Horn</div>
                                <div
                                    onClick={() => {
                                        setClose("close");
                                        setActive(3);
                                        // setTimeout(function () {
                                        // }, 3200);
                                    }}
                                >Close</div>
                            </div>
                            <div className="px-24 text-left">
                                <div
                                    className={active === 2 ? "font-title 2xl:text-[100px] text-[70px] 2xl:leading-[6.75rem] leading-[4.75rem] text-slide-left" : "font-title 2xl:text-[100px] text-[70px] 2xl:leading-[6.75rem] leading-[4.75rem]"}
                                >
                                    <span style={{ "--i": 0 }}>THERE ARE&nbsp;</span>
                                    <span style={{ "--i": 1 }}>5 SPECIES OF&nbsp;</span>
                                    <span style={{ "--i": 2 }}>RHINO...</span>
                                </div>
                                <div
                                    className={active === 2 ? "font-sans 2xl:text-xl text-sm 2xl:pt-16 pt-12 text-slide-left" : "font-sans 2xl:text-xl text-sm 2xl:pt-16 pt-12"}
                                >
                                    <span style={{ "--i": 3 }}>...Two African – black and white rhinos – and three Asian –&nbsp;</span>
                                    <span style={{ "--i": 3.5 }}>greater one-horned, Sumatran and Javan rhinos. Three of these&nbsp;</span>
                                    <span style={{ "--i": 4 }}>(black, Sumatran and Javan) are listed as ‘critically endangered’&nbsp;</span>
                                    <span style={{ "--i": 4.5 }}>by IUCN – there are thought to be fewer than 70 Javan and 100&nbsp;</span>
                                    <span style={{ "--i": 5 }}>Sumatran rhinos left in the wild, meaning their populations are&nbsp;</span>
                                    <span style={{ "--i": 5.5 }}>truly under threat of extinction.&nbsp;</span>
                                </div>
                            </div>
                            <div className="flex items-end justify-between font-sans">
                                <div>02</div>
                                <div className="border border-black rounded-[50px] py-3 px-11 2xl:text-[27px] text-xl">NEXT FACT</div>
                            </div>
                        </div>

                    </Html>
                </mesh>
                <Suspense fallback={null}>
                    {/* change 1 to z when everything is done */}
                    <mesh position={[0, -1.5, 1]}>
                        <Scene active={active} close={close} />
                    </mesh>
                    <OrbitControls />
                    {/* light from the bottom left corner */}
                    {active === 2 ?
                        <SpotLight
                            // color={0xfff4e5}
                            position={[-0.1, -0.5, 9]}
                            castShadow
                            penumbra={1}
                            radiusTop={5}
                            radiusBottom={30}
                            angle={0.55}
                            attenuation={20}
                            anglePower={5}
                            intensity={3}
                            opacity={0.2}
                        />
                        :
                        <SpotLight
                            position={[-8, -0.5, 9]}
                            castShadow
                            penumbra={1}
                            radiusTop={5}
                            radiusBottom={30}
                            distance={13.5}
                            angle={0.55}
                            attenuation={20}
                            anglePower={5}
                            intensity={2}
                            opacity={0.2}
                            focus={1}
                        />
                    }

                    {active === 2 ?
                        <SpotLight
                            // position={[-2.5, -0.1, 4]}
                            position={[0, 0, 0]}
                            castShadow
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
                        :
                        <SpotLight
                            position={[-2.5, -0.1, 4]}
                            // position={[0, 0, 0]}
                            castShadow
                            penumbra={1}
                            radiusTop={5}
                            radiusBottom={5}
                            distance={5}
                            angle={0.55}
                            attenuation={30}
                            anglePower={5}
                            intensity={2}
                            opacity={0.2}
                            focus={1}
                        />
                    }

                    <SpotLight
                        position={[3, 3, 3]}
                        castShadow
                        penumbra={1}
                        radiusTop={5}
                        radiusBottom={5}
                        distance={5}
                        angle={0.15}
                        attenuation={30}
                        anglePower={5}
                        intensity={2}
                        opacity={0.2}
                        focus={1}
                    />
                    {/* {active === 2 ?
                        :
                        <SpotLight
                            position={[3, 3, 3]}
                            castShadow
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
                    } */}
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
