import "./styles.css";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { Suspense } from "react";
import { render, events } from "@react-three/fiber";

// THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

// window.addEventListener("resize", () =>
//     render(<mesh />, document.querySelector("canvas"), {
//         events,
//         size: { width: window.innerWidth / 2, height: window.innerHeight / 2 },
//     })
// );

// const Scene = () => {
//     const obj = useLoader(OBJLoader, "rhino.obj", (loader) => {});
//     //   console.log(obj);
//     return <primitive object={obj} scale={0.1} />;
// };

// export default function App() {
//     return (
//         <div className="App">
//             <Canvas>
//                 <Suspense fallback={null}>
//                     <mesh>
//                         <Scene />
//                         <meshStandardMaterial />
//                     </mesh>
//                     <OrbitControls />
//                     <ambientLight intensity={0.5} />
//                     <spotLight position={[10, 15, 10]} angle={0.3} />
//                     {/* <Environment preset="sunset" background /> */}
//                 </Suspense>
//             </Canvas>
//         </div>
//     );
// }

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = () => {
    const materials = useLoader(MTLLoader, "rhino.mtl");
    const obj = useLoader(OBJLoader, "rhino.obj", (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });

    console.log(obj);
    return <primitive object={obj} scale={1.4} />;
};

export default function App() {
    return (
        <div className="App">
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[0, 0, 0]} angle={0.3} />
                <Suspense fallback={null}>
                    <Scene />
                    {/* <OrbitControls /> */}
                    {/* <Environment preset="sunset" background /> */}
                </Suspense>
            </Canvas>
        </div>
    );
}
