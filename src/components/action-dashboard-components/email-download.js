/*eslint-disable*/
import React, { Component } from 'react'

export default class EmailDownloadComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            format: "csv"
        }
        
        this.selectChange = this.selectChange.bind(this)
    }
    
    selectChange = (e) => {
        this.setState({format: e.target.value})
    }
    
    render() {
        return (
            <div id="DownloadEmailsComponent">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <select name="file_format" id="FileFormat" value={this.state.format} onChange={this.selectChange}>
                            <option value="csv">.csv</option>
                            <option value="txt">.txt</option>
                        </select>
                        <label htmlFor="FileFormat"> File Format&nbsp;
                            <small className="light-grey-text">
                                <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="What format do you want to save the file in"></i>
                            </small>
                        </label>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ConfirmationModalHolder">Download Emails</button>
                    </div>
                </div>
            </div>
        )
    }
}
