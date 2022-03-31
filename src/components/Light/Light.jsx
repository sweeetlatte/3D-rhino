import React from "react";
import { SpotLight } from "@react-three/drei";

export default function Light({ active }) {
    return (
        <>
            {/* light from the bottom left corner */}
            {active === 2 ? (
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
            ) : (
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
            )}

            {active === 2 ? (
                <SpotLight
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
            ) : (
                <SpotLight
                    position={[-2.5, -0.1, 4]}
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
            )}

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
        </>
    );
}
