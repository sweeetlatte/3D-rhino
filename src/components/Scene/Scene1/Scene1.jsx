import React from "react";
import { Html } from "@react-three/drei";

import "./scene1.css";

export default function Scene1({ z, setZ, delayAnimate }) {
    return (
        <Html scale={1} position={[-7, 1.7, 0]}>
            <div className="text-[160px] 2xl:text-[216px] w-[85.1vw] 1xl:w-[80.1vw] 2xl:w-[86vw] text-white leading-[0.87] 2xl:leading-[0.9] tracking-[-4px] 2xl:tracking-normal">
                <div className="flex justify-between">
                    {/* 1.166 -> 1.400: xong dash
                    -> 1500: close xong
                    1600: start wavy
                    2333: i letter disapear */}
                    <div className={z === 3 ? "wavy close-reverse" : ""}>
                        <span style={{ "--i": 5 }}>R</span>
                        <span style={{ "--i": 1 }}>H</span>
                        <span style={{ "--i": 0 }}>I</span>
                        <span style={{ "--i": 1 }}>N</span>
                        <span style={{ "--i": 5 }}>O</span>
                    </div>
                    <div className={z === 3 ? "dash shorten-dash" : "dash"}>
                        —
                    </div>
                    <div
                        className={z === 3 ? "wavy close" : ""}
                        style={{ letterSpacing: "-8px" }}
                    >
                        <span style={{ "--i": 5 }}>C</span>
                        <span style={{ "--i": 2 }}>L</span>
                        <span style={{ "--i": 1 }}>O</span>
                        <span style={{ "--i": 2 }}>S</span>
                        <span style={{ "--i": 5 }}>E</span>
                    </div>
                </div>
                <div
                    className={
                        z === 3
                            ? "wavy w-[86vw] 1xl:w-[81vw]"
                            : "w-[86vw] 1xl:w-[81vw]"
                    }
                >
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
                className={
                    z === 3
                        ? "wavy 2xl:mt-[12.7vh] mt-[12.1vh] 2xl:ml-[2vw] ml-[3vw] 1xl:ml-0"
                        : "2xl:mt-[12.7vh] mt-[12.1vh] 2xl:ml-[2vw] ml-[3vw] 1xl:ml-0"
                }
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
    );
}
