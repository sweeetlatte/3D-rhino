import React from "react";
import { a as b, useTransition } from "@react-spring/web";

import "./loader.css";

export default function Loader({ active, progress }) {
    const transition = useTransition(active, {
        from: { opacity: 1, progress: 0 },
        leave: { opacity: 0 },
        update: { progress },
    });
    return transition(
        ({ progress, opacity }, active) =>
            active && (
                <b.div className="loading" style={{ opacity }}>
                    <div className="loading-bar-container">
                        <b.div
                            className="loading-bar"
                            style={{ width: progress }}
                        ></b.div>
                    </div>
                </b.div>
            )
    );
}
