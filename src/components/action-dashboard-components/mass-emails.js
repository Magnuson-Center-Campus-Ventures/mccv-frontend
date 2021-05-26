/*eslint-disable*/
import React, { Component } from 'react'
import FileRow from './file-row'
import $ from 'jquery'
import showdown from 'showdown'

export default class MassEmailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EmailHeading: "",
            EmailBody: "",
            EmailPreview: "",
            files: {},
            file_light_dark: 0,
            sendEmail: props.sendEmail,
        }
        
        this.handleUpload = this.handleUpload.bind(this)
        this.cascadeFileColors = this.cascadeFileColors.bind(this)
        this.removeFile = this.removeFile.bind(this)
        this.add_file = this.add_file.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.makeFileRows = this.makeFileRows.bind(this)
        this.send = this.send.bind(this)
    }
    
    cascadeFileColors = (number) => {
        for(let i = number+1; i < this.state.file_light_dark; i++) {
            try {
                let target = $(`#File${i}`)
                if (target.hasClass('file-item-dark')) {
                    target.removeClass('file-item-dark')
                    target.addClass('file-item-light')
                } else {
                    target.removeClass('file-item-light')
                    target.addClass('file-item-dark')
                }
            } catch (error) {}
        }
    }
    
    removeFile = (row_id, file_num) => {
        const new_files = this.state.files
        delete new_files[row_id]
        this.setState((prevState) => {
            return {
                ...prevState,
                files: new_files
            }
        })
        this.cascadeFileColors(file_num)
    }
    
    add_file = (file) => {
        const parts = file.name.split('.')
        let name = parts.slice(0, parts.length - 1).join(".")
        const file_ext = parts[parts.length - 1]
        if (this.state.files.hasOwnProperty(name)) {
            name = name + Math.floor(Math.random() * 1000000)
        }
        
        this.setState((prevState) => {
            return {
                ...prevState,
                ...{
                    file_light_dark: prevState.file_light_dark + 1,
                    files: {
                    ...prevState.files, 
                        [name]: [file, file.size, file_ext, prevState.file_light_dark]
                }}
            }
        })
    }
    
    makeFileRows = () => {
        let color_code = 0
        const rows = Object.entries(this.state.files).map(file_d => {
            const row = <FileRow
                key = {file_d[0]}
                row_id={file_d[0]}
                color_code = {color_code%2===0 ? 'file-item-light' : 'file-item-dark'}
                file_name = {file_d[0]}
                file_size = {file_d[1][1]}
                extension={file_d[1][2]}
                file_num={file_d[1][3]}
                remove_file = {this.removeFile}
            />
            
            color_code += 1
            return row
        })
        return rows
    }
    
    handleUpload = (e) => {
        const input_element = $('<input>').attr({
            type: 'file',
            multiple: "multiple"
        })
        input_element.on('change', (e) => {
            const file_list = e.target.files
            for(let file of file_list) {
                this.add_file(file)
            }
        })
        input_element.click()
    }
    
    handleChange = (e) => {
        const id = e.target.id
        this.setState({ [id]: e.target.value })
        
        if (id === 'EmailBody') {
            const converter = new showdown.Converter({underline: true, emoji: true})
            const preview = $("#EmailPreview")
            preview.empty()
            preview.append(converter.makeHtml(e.target.value))
        }
    }
    
    send = () => {
        this.state.sendEmail("", "", "")
    }

    
    render() {
        return (
            <div id="EmailComponent"> 
                <form > 
                    <label htmlFor="EmailHeading" className="form-label">Email Heading&nbsp; 
                        <small className="light-grey-text"> 
                            <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="What is the subject of the email"> 
                            </i> 
                        </small> 
                    </label><br/> 
                    <input type="text" id="EmailHeading" placeholder="Type Heading" className="form-input" value={this.state.EmailHeading} onChange={this.handleChange}/><br />
                    <div className="row">
                        <label htmlFor="EmailBody">Email Body&nbsp; 
                            <small className="light-grey-text"> 
                                <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="Type Email Content Here"> 
                                </i> 
                            </small> 
                        </label><br/> 
                        <textarea id="EmailBody" placeholder="Type Email Content" className="form-input col-8" rows="15" value={this.state.EmailBody} onChange={this.handleChange}/>
                        <div className="col-4"> 
                            <h4 className="">Formatting Guidelines</h4> 
                            <b>Click <a target="_blank" href="https://www.markdownguide.org/basic-syntax/">here</a> for a more extensive guide</b> 
                            <div className="row guideline"> 
                                <div className="col-sm-12 col-md-6"> 
                                    <h6>Embedding Links: </h6> 
                                    [text](link)
                                </div> 
                                <div className="col-sm-12 col-md-6"> 
                                    <h6>Italics: </h6> 
                                    *text* 
                                </div> 
                            </div> 
                            <div className="row guideline"> 
                                <div className="col-sm-12 col-md-6"> 
                                    <h6>Headers: </h6> 
                                    ####text <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="The more #s the smaller the text. At most 6 #s."> </i> 
                                </div> 
                                <div className="col-sm-12 col-md-6"> 
                                    <h6>Bold: </h6> 
                                    **text** 
                                </div> 
                            </div> 
                            <div className="row d-flex flex-row-reverse guideline"> 
                                <div className="col-sm-12 col-md-6"> 
                                    <h6>Tab: </h6> 
                                    &amp;emsp;
                                </div> 
                                <div className="col-sm-12 col-md-6"> 
                                    <h6>Bullet point: </h6> 
                                    * text 
                                </div> 
                            </div>
                            <div className="row d-flex guideline">
                                <div className="col-sm-12 col-md-6"> 
                                    <h6>Emojis: </h6> 
                                    Go <a target="_blank" href="https://github.com/showdownjs/showdown/wiki/Emojis">here</a>
                                </div> 
                            </div>
                        </div> 
                    </div> 
                </form> 
                <label htmlFor="EmailPreview">Email Preview&nbsp; 
                    <small className="light-grey-text"> 
                        <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="See A Preview of Email Content"> 
                        </i> 
                    </small> 
                </label><br /> 
                <div disabled id="EmailPreview">&nbsp; 
                </div>
                <div id="FileBox" className="col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="FileBox">Manage File Attachments&nbsp; 
                        <small className="light-grey-text"> 
                            <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add and delete attachments"> 
                            </i> 
                        </small> 
                    </label><br /> 
                    <div id="FileRowHolder"> 
                        <div className="file-item-dark row"> 
                            <b className="col-4">File Name</b> 
                            <b className="col-3"> 
                                File Ext&nbsp; 
                                <small className="light-grey-text"> 
                                    <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="File Extension"> 
                                    </i> 
                                </small> 
                            </b> 
                            <b className="col-3"> 
                                File Size&nbsp; 
                                <small className="light-grey-text"> 
                                    <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="File Size is in Bytes"> 
                                    </i> 
                                </small> 
                            </b> 
                            <b className="col-2">Delete</b> 
                        </div>
                        {this.makeFileRows()}
                    </div> 
                    <div className="d-flex flex-row-reverse"> 
                        <button id="AddFileBtn" className="btn btn-success rounded" onClick={this.handleUpload}>Add File</button> 
                    </div>                                 
                </div> 
                <div id="SendEmailBtnHolder" className="d-flex flex-row-reverse"> 
                    <button id="SendEmailBtn" className="btn btn-success" onClick={this.send}>Send Email</button> 
                </div> 
            </div>
        )
    }
}

