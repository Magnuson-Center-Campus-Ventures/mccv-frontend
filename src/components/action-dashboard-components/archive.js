/*eslint-disable*/
import React, { Component } from 'react'

export default class ArchiveComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            target_rows: []
        }
        this.filtersUpdated = this.filtersUpdated.bind(this)
    }

    componentDidMount() {
        this.filtersUpdated()
    }
    
    filtersUpdated = () => {
        this.props.getTargetUsers()
            .then(res => {
            const data = [['Sn', 'Name', 'Role', 'Email']]
            let count = 1
            res.forEach(obj => {
                data.push([
                    count,
                    (obj.name || obj.first_name + " " + obj.last_name || '').trim().split(",").join(" "),
                    obj.user_data.role,
                    (obj.contact_email || obj.user_data.email).split(",").join(" "),
                ])
                count++
            })
            this.setState({target_rows: data})
        })
    }
    
    render() {
        const makeRows = () => {
            const light_dark = ['file-item-light', 'file-item-dark']
            let pos = 1;
            const seen = {}
            return this.state.target_rows.map(row => {
                if (!seen.hasOwnProperty(row[3])) {
                    seen[row[3]] = 0
                    return (
                        <div key={row[0]} className={"row filtered-display " + light_dark[(pos++) % 2]}>
                            <div className={"col-1"}>{row[0]}</div>
                            <div className={"col-4"}>{row[1]}</div>
                            <div className={"col-3"}>{row[2]}</div>
                            <div className={"col-4"}>{row[3] }</div>
                        </div>
                    )
                }
                return null
            })
        }
        return(
            <div id="ArchiveComponent">
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ConfirmationModalHolder">Archive Students</button>
                {makeRows()}
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