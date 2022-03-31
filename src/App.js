import "./styles.css";
import "./input.css";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import {
    Html,
    useProgress
} from "@react-three/drei";

import "./cursor.svg";
import Loader from "./Loader/Loader";
import Floor from "./Floor/Floor";
import Scene from "./Model/Scene";
import Light from "./Light/Light"

export default function App() {
    const { active: abc, progress } = useProgress();
    const [i, seti] = useState(0);
    function count() {
        if (progress === 100 && i < 2) return seti(i + 1) && false;
        else if (i >= 2) return true;
    }

    const [z, setZ] = useState(1);
    const [active, setActive] = useState(0);
    const [display, setDisplay] = useState("hidden");
    const [reverse, setReverse] = useState(null);
    const [close, setClose] = useState(null);

    function delayAnimate() {
        setTimeout(function () {
            setActive(1);
        }, 1182);
        setTimeout(function () {
            setDisplay("block");
        }, 1734);
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
        <>
            <div className="App" style={{ backgroundColor: "black" }}>
                <div
                    className="text-xs 2xl:text-[17px]"
                    style={{
                        fontFamily: "sans-serif",
                        color: "white",
                        position: "absolute",
                        left: "48.15vw",
                        top: "3vh",
                        animation: z === 3 && "reverse-transformReverse 466ms both 334ms",
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
                    {count() &&
                        <mesh>
                            <Html scale={1} position={[-7, 1.7, 0]}>
                                <div className="text-[160px] 2xl:text-[216px] w-[85.1vw] 1xl:w-[80.1vw] 2xl:w-[86vw] text-white leading-[0.87] 2xl:leading-[0.9] tracking-[-4px] 2xl:tracking-normal">
                                    <div className="flex justify-between">
                                        {/* 1.166 -> 1.400: xong dash
                                        -> 1500: close xong
                                        1600: start wavy
                                        2333: i letter disapear */}
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
                                        <div className={z === 3 ? "wavy close" : ""} style={{ letterSpacing: "-8px" }}>
                                            <span style={{ "--i": 5 }}>C</span>
                                            <span style={{ "--i": 2 }}>L</span>
                                            <span style={{ "--i": 1 }}>O</span>
                                            <span style={{ "--i": 2 }}>S</span>
                                            <span style={{ "--i": 5 }}>E</span>
                                        </div>
                                    </div>
                                    <div className={z === 3 ? "wavy w-[86vw] 1xl:w-[81vw]" : "w-[86vw] 1xl:w-[81vw]"}>
                                        <span style={{ "--i": 10 }}>T</span>
                                        <span style={{ "--i": 8 }}>O</span>
                                        <span style={{ "--i": 8 }}>&nbsp;</span>
                                        <span style={{ "--i": 7 }}>E</span>
                                        <span style={{ "--i": 6 }}>X</span>
                                        <span style={{ "--i": 5 }}>T</span>
                                        <span style={{ "--i": 3 }}>I</span>
                                        <span style={{ "--i": 5 }}>N</span>
                                        <span style={{ "--i": 6 }}>C</span>
                                        <span style={{ "--i": 7 }}>T</span>
                                        <span style={{ "--i": 5 }}>I</span>
                                        <span style={{ "--i": 8 }}>O</span>
                                        <span style={{ "--i": 10 }}>N</span>
                                    </div>
                                </div>
                                <div
                                    className={z === 3 ? "wavy 2xl:mt-[12.7vh] mt-[12.1vh] 2xl:ml-[2vw] ml-[3vw] 1xl:ml-0" : "2xl:mt-[12.7vh] mt-[12.1vh] 2xl:ml-[2vw] ml-[3vw] 1xl:ml-0"}
                                >
                                    <div
                                        className="btn text-[22px] 2xl:text-[27px] w-max mx-auto py-[5px] px-[33px] 2xl:py-[8px] 2xl:px-[56px]"
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
                    }
                    <mesh>
                        <Html>
                            <div className={`${display} tetx-white`}>
                                <div
                                    className="text-white text-[17px] w-max absolute 2xl:left-[-5vw] left-[-5.5vw] top-[-47vh]"
                                    style={{
                                        fontFamily: "sans-serif",
                                        animation: "transform 566ms ease-out both",
                                    }}
                                >Select a Point</div>
                                <div className="dot-hover"
                                    onMouseLeave={() => {
                                        setReverse("transform-reverse");
                                    }}
                                >
                                    <div
                                        className="dot cursor-none bg-white rounded-full absolute w-[15px] hover:w-[36px] h-[15px] hover:h-[36px] flex justify-center items-center text-4xl font-bold 2xl:top-[5.25rem] top-[3.4rem] hover:top-[2.75rem] 2xl:left-[-26.5rem] left-[-18.9rem] 2xl:hover:left-[-27.75rem] hover:left-[-19.75rem]"
                                        style={{
                                            animation: "transform 167ms ease-out both 900ms",
                                        }}
                                    >
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
                                    <div
                                        className="dot cursor-none bg-white rounded-full absolute w-[15px] hover:w-[36px] h-[15px] hover:h-[36px] flex justify-center items-center text-4xl font-bold 2xl:top-[-10.75rem] top-[-7.75rem] 2xl:hover:top-[-12rem] hover:top-[-8.5rem] 2xl:left-[-12.5rem] left-[-9rem] 2xl:hover:left-[-13.75rem] hover:left-[-9.75rem]"
                                        style={{
                                            animation: "transform 167ms ease-out both 1066ms",
                                        }}
                                    >
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
                                    <div
                                        className="dot cursor-none bg-white rounded-full absolute w-[15px] hover:w-[36px] h-[15px] hover:h-[36px] flex justify-center items-center text-4xl font-bold 2xl:top-[-2.25rem] top-[-1.75rem] 2xl:hover:top-[-3rem] hover:top-[-2.5rem] 2xl:left-[5.25rem] left-[3.75rem] hover:left-[3.25rem]"
                                        style={{
                                            animation: "transform 167ms ease-out both 1232ms",
                                        }}
                                    >
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
                                    <div
                                        className="dot cursor-none bg-white rounded-full absolute w-[15px] hover:w-[36px] h-[15px] hover:h-[36px] flex justify-center items-center text-4xl font-bold 2xl:top-[-19.75rem] top-[-14.5rem] 2xl:hover:top-[-21rem] hover:top-[-15rem] 2xl:left-[36.25rem] left-[25.5rem] 2xl:hover:left-[35.5rem] hover:left-[25rem]"
                                        style={{
                                            animation: "transform 167ms ease-out both 1398ms",
                                        }}
                                    >
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
                                className={`bg-[#A9B2A0] w-[43.9vw] h-screen absolute left-[50vw] top-[-50vh] 2xl:px-9 p-6 2xl:py-8`}
                                style={{
                                    animation: (active === 2 && "slideLeft 966ms both 1500ms"),
                                }}
                            >
                                {/* 9.800 -> 11.300: animation xong chính diện = 1500
                                -> 12.266: animation info bg xong
                                -> 12.133: 01. rhino hiện ra -> 12.666 xong
                                11.866 -> 12.866: title xong
                                11.966 -> 13.700: text xong */}
                                <div
                                    className="flex justify-between 2xl:text-xl text-sm font-sans 2xl:pb-9 pb-7"
                                    style={{
                                        borderBottom: "1px solid black",
                                    }}
                                >
                                    <div style={{
                                        animation: (active === 2 && "transform 533ms both 2333ms"),
                                        letterSpacing: "-1px",
                                    }}>01. Rhino Horn</div>
                                    <div
                                        onClick={() => {
                                            setClose("close");
                                            setActive(3);
                                        }}
                                        style={{
                                            animation: (active === 2 && "transform 533ms both 2599ms")
                                        }}
                                    >Close</div>
                                </div>
                                <div className="2xl:px-[5.5rem] pr-[3rem] pl-[4.2rem] 2xl:pt-[15.5vh] pt-[15vh] text-left">
                                    <div
                                        className={active === 2 ? "font-title 2xl:text-[100px] text-[70px] 2xl:leading-[5.75rem] leading-[4.1rem] text-slide-left 2xl:tracking-[-3px] tracking-[-1px]" : "font-title 2xl:text-[100px] text-[70px] 2xl:leading-[6.75rem] leading-[4.1rem] 2xl:tracking-[-3px] tracking-[-1px]"}
                                        style={{ letterSpacing: "-3px" }}
                                    >
                                        <span style={{ "--i": 0 }}>THERE ARE 5&nbsp;</span>
                                        <span style={{ "--i": 1 }}>SPECIES OF&nbsp;</span>
                                        <span style={{ "--i": 2 }}>RHINO...</span>
                                    </div>
                                    <div
                                        className={active === 2 ? "font-sans 2xl:text-xl text-sm 2xl:pt-[4.2rem] pt-12 text-slide-left" : "font-sans 2xl:text-xl text-sm 2xl:pt-[4.2rem] pt-12"}
                                        style={{ lineHeight: 1.8, letterSpacing: "-0.4px" }}
                                    >
                                        <span style={{ "--i": 3 }}>...Two African – black and white rhinos – and three Asian – greater&nbsp;</span>
                                        <span style={{ "--i": 3.5 }}>one-horned, Sumatran and Javan rhinos. Three of these (black,&nbsp;</span>
                                        <span style={{ "--i": 4 }}>Sumatran and Javan) are listed as ‘critically endangered’ by IUCN&nbsp;</span>
                                        <span style={{ "--i": 4.5 }}>– there are thought to be fewer than 70 Javan and 100 Sumatran&nbsp;</span>
                                        <span style={{ "--i": 5 }}>rhinos left in the wild, meaning their populations are truly&nbsp;</span>
                                        <span style={{ "--i": 5.5 }}>under threat of extinction.&nbsp;</span>
                                    </div>
                                </div>
                                <div className="flex items-end justify-between font-sans pt-[15vh]">
                                    <div>02</div>
                                    <div className="border border-black rounded-[50px] 2xl:py-3 py-2 px-7 2xl:px-11 2xl:text-[27px] text-xl">NEXT FACT</div>
                                </div>
                            </div>

                        </Html>
                    </mesh>
                    <Suspense fallback={null}>
                        <mesh position={[0.2, -1.5, 3]}>
                            <Scene active={active} />
                        </mesh>
                        <Light active={active} />
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
            </div >
            <Loader active={abc} progress={progress} />
        </>
    );
}
