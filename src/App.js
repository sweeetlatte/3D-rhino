import "./styles.css";
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
    return <primitive object={obj} scale={1.4} rotation={[250, 0, 150]} />;
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
                metalness={0}
                roughness={1}
            />
        </mesh>
    );
}

export default function App() {
    return (
        <div className="App">
            <Canvas
            // camera={{ position: [0, 0, 7],
            // // near: 5, far: 15
            //  }}
            >
                <ambientLight intensity={0.5} />
                <spotLight position={[0, 0, 0]} angle={0.3} />
                <Suspense fallback={null}>
                    <Scene />
                    {/* <OrbitControls /> */}
                    {/* <Environment preset="sunset" background /> */}
                    {/* <Floor position={[0, -15, 0]} rotation={[-Math.PI / 2, 0, 0]} /> */}
                </Suspense>
            </Canvas>
        </div>
    );
}
