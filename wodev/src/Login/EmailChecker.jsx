import React, { useState } from "react";
import Lottie from "react-lottie";
import * as okAnim from "../Resources/Animations/ok.json";
import * as badAnim from "../Resources/Animations/bad.json";

export const EmailChecker = ({ email }) => {
    const [valid, setValid] = useState(null);
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: valid == true ? okAnim : badAnim,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    
    const checkValidity = () => {
        //TODO: dodac checkValid service
    }
    
    const [validated, setValidated] = useState(null,checkValidity);
    
    if (valid != null && validated != null)
        return (
            <div className="row">
                <Lottie options={defaultOptions} height={100} width={100} isStopped={validated} />
            </div>
        )
    else
            return <div/>
};
