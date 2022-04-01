import React from "react";
import { Html } from "@react-three/drei";

import "./scene2.css";

export default function Scene2({ display, setReverse, reverse, setActive }) {
    return (
        <Html>
            <div className={`${display} tetx-white`}>
                <div
                    className="text-white text-[17px] w-max absolute 2xl:left-[-5vw] left-[-5.5vw] top-[-47vh]"
                    style={{
                        fontFamily: "sans-serif",
                        animation: "transform 566ms ease-out both",
                    }}
                >
                    Select a Point
                </div>
                <div
                    className="dot-hover"
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
                    >
                        Poor Vision
                    </div>
                </div>
                <div className="dot-hover">
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
                <div className="dot-hover">
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
                <div
                    className="dot-hover"
                    onClick={() => {
                        setActive(2);
                    }}
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
    );
}
