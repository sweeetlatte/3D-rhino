import "./styles.css";
// import "./App.css";
import { useState } from "react";
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
} from "@react-three/drei";

// window.addEventListener("resize", () =>
//     render(<mesh />, document.querySelector("canvas"), {
//         events,
//         size: { width: window.innerWidth / 2, height: window.innerHeight / 2 },
//     })
// );

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = () => {
    const materials = useLoader(MTLLoader, "rhino.mtl");
    const obj = useLoader(OBJLoader, "rhino.obj", (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });

    console.log(obj);
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

function Floor(props) {
    const [ref] = usePlane(() => ({ type: "Static", ...props }));
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
                color="#878790"
                blur={[400, 400]}
                resolution={1024}
                mixBlur={1}
                mixStrength={3}
                depthScale={1}
                minDepthThreshold={0.85}
                metalness={0.5}
                roughness={0.5}
            />
        </mesh>
    );
}

export default function App() {
    const [z, setZ] = useState(1);

    return (
        <div
            className="App"
            style={{ backgroundColor: "black" }}
            onClick={() => {
                setZ(3);
            }}
        >
            <div
                style={{
                    fontFamily: "sans-serif",
                    color: "white",
                    position: "absolute",
                    left: "48.15vw",
                    top: "3vh",
                    fontSize: "17px",
                }}
            >
                Endangered
            </div>
            <Canvas
            // camera={{ position: [0, 0, 7],
            // // near: 5, far: 15
            //  }}
            >
                <ambientLight intensity={0.3} />
                <spotLight position={[0, 0, 0]} angle={0.3} />
                <mesh>
                    <Html scale={1} position={[-5.9, 1.55, 0]}>
                        <div
                            style={{
                                color: "white",
                                fontSize: "216px",
                                // fontSize: "20px",
                                width: "86vw",
                                lineHeight: 1,
                            }}
                        >
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div>RHINO</div>
                                <div>—</div>
                                <div>CLOSE</div>
                            </div>
                            <div>TO EXTINCTION</div>
                        </div>
                        <div style={{ marginTop: "13.9vh" }}>
                            <button className="btn">EXPLORE</button>
                        </div>
                    </Html>
                </mesh>
                <Suspense fallback={null}>
                    <mesh position={[0, -1.5, z]}>
                        <Scene />
                    </mesh>
                    {/* <OrbitControls /> */}
                    <Physics>
                        <Floor
                            position={[0, -1.5, 0]}
                            rotation={[
                                (-Math.PI / 180) * (90 - 1.333),
                                (-Math.PI / 180) * -0.5,
                                (-Math.PI / 180) * 30,
                            ]}
                        />
                    </Physics>
                </Suspense>
            </Canvas>
        </div>
    );
}
