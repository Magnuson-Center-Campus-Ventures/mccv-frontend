/*eslint-disable*/
import React, { Component } from 'react'

export default class ArchiveComponent extends Component {    
    render() {
        return(
            <div id="ArchiveComponent">
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ConfirmationModalHolder">Archive Students</button>
                <div id="ConfirmationModalHolder" className="modal">
                    <div id="ConfirmationModal" className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Action</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>You are about to archive some users. Click ok to continue, click cancel to go back</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}