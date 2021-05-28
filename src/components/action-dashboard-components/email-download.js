/*eslint-disable*/
import React, { Component } from 'react'
import Select from 'react-select'

export default class EmailDownloadComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            format: {value:'csv', label: 'csv'},
            download: props.download,
            target_rows: []
        }
        
        this.selectChange = this.selectChange.bind(this)
        this.downloadEmails = this.downloadEmails.bind(this)
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
    
    selectChange = (e) => {
        this.setState({ format: e })
    }
    
    downloadEmails = (_) => {
        this.state.download(this.state.format.value)
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
        return (
            <div id="DownloadEmailsComponent">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <label htmlFor="FileFormat"> File Format&nbsp;
                            <small className="light-grey-text">
                                <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="What format do you want to save the file in"></i>
                            </small>
                        </label>
                        <Select
                            id="FileFormat" value={this.state.format} onChange={this.selectChange}
                            options={[{value:'csv', label: 'csv'}, {value:'txt', label: 'txt'}]}
                        />
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        <button className="btn btn-success" onClick={this.downloadEmails}>Download Emails</button>
                    </div>
                </div>
                {makeRows()}
            </div>
        )
    }
}
