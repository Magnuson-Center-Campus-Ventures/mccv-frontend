/* eslint-disable react/button-has-type */
import React from 'react';
import $ from 'jquery';
import '../../../styles/instructions.scss';
import add from '../../../assets/add.png';

export default class StartupInstructions extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        let close = $("#close");
        let done = $("#done")

        close.on("click", (e) => {
            this.props.handler()
            localStorage.removeItem("new_startup")
        })

        done.on("click", (e) => {
            this.props.handler()
            localStorage.removeItem("new_startup")
        })
    }

    render() {
        return (
            <div id = "ModalHolder">
                <div id = "modal" className = "container rounded-lg" >
                    <button id = "close" >X </button>
                    <br/>
                    <div id = "welcome" >
                        <h2 style = {{ color: "rgb(123, 199, 123)" } }> Welcome!</h2>
                        <p className = "p-text" > Now that you have successfully created your account please follow the instructions below to get started. </p>
                    </div>
                    <ul id = "instructions" >
                        <li className = "p-text l-item">Thanks for creating your startup’ s profile!</li>
                        <li className = "p-text l-item">Click the <span> <img src = { add } alt = { "+" } id = "add"/></span> button to add a volunteer position. Approve any positions you want to be visible to students, and archive any positions you want to hide from students. </li>
                        <li className = "p-text l-item">A Magnuson Center Campus Ventures program administrator will review your profile soon.Once they approve your startup, your profile and any positions you’ ve approved will go live.Students will then be able to view and apply to your volunteer positions!</li>
                    </ul>
                    <button id = "done" className = "btn-success rounded">Done</button>
                </div>
            </div>
        );
    }
}