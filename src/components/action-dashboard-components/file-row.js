/*eslint-disable*/
import React, { Component } from 'react'

export default class FileRow extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            row_id: props.row_id,
            file_num: props.file_num,
            color_code: props.color_code,
            file_name: props.file_name,
            file_size: props.file_size,
            extension: props.extension,
            removeFile: props.remove_file
        }
    }
    
    handleDelete = (e) => {
        e.preventDefault()
        this.state.removeFile(this.state.row_id, this.state.file_num)
    }
    
    render() {
        return (
            <div id={"File"+this.state.file_num} className={`row ${this.state.color_code}`}>
                <div className={"file_name col-4"}>
                    <b>{this.state.file_name }</b>
                </div>
                <div className={"file_extension col-3"}>
                    <b>{this.state.extension}</b>
                </div>
                <div className={"file_size col-3"}>
                    <b>{this.state.file_size}</b>
                </div>
                <a className="col-2 text-right text-center" href="#" onClick={this.handleDelete}><i className="fas fa-trash-alt" /></a>
            </div>
        )
    }
}