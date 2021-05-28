/*eslint-disable*/
import React, { Component } from 'react'
import MassEmailComponent from './mass-emails'
import ArchiveComponent from './archive'
import EmailDownloadComponent from './email-download'
import BannerMaker from './banner-maker'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import $ from 'jquery'
import FilterRow from './filter-row'
import Tooltip from 'bootstrap/js/dist/tooltip'
import { fetchStartups, fetchStudents, fetchUsers, fetchAllIndustries} from '../../actions/index';
import { getFieldName } from './filters'
import { saveAs } from 'file-saver';
import Select from 'react-select'
import '../../styles/admin-dashboard.scss'
import 'bootstrap/dist/css/bootstrap.css';


class ActionDashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Action: { value: '', label:'Action Type' },
            Recepient: {value: "All Users", label: "All Users"},
            filters: {},
            filter_light_dark: 0,
            aref: null,
        }
        $(window).scrollTop(0)
        this.targetChange = this.targetChange.bind(this)
        this.actionChange = this.actionChange.bind(this)
        this.cascadeFilterColors = this.cascadeFilterColors.bind(this)
        this.removeFilter = this.removeFilter.bind(this)
        this.addFilter = this.addFilter.bind(this)
        this.sendEmail = this.sendEmail.bind(this)
        this.createBanner = this.createBanner.bind(this)
        this.archiveUsers = this.archiveUsers.bind(this)
        this.downloadEmails = this.downloadEmails.bind(this)
        this.getTargetUsers = this.getTargetUsers.bind(this)
        this.applyFilters = this.applyFilters.bind(this)
        this.makeActionElement = this.makeActionElement.bind(this)
        this.updateChildWithFilters = this.updateChildWithFilters.bind(this)
    }
    
    componentDidMount() {
        this.props.fetchStudents();
        this.props.fetchStartups();
        this.props.fetchUsers();
        this.props.fetchAllIndustries()
        const tooltipTriggerList = $('[data-bs-toggle="tooltip"]')
        tooltipTriggerList.map((_, tooltipTriggerEl) => {
            return new Tooltip(tooltipTriggerEl, {
                'tooltip-max-width': '500px'
            })
        })
    }
      
    componentDidUpdate() {
        const tooltipTriggerList = $('[data-bs-toggle="tooltip"]')
        tooltipTriggerList.map((_, tooltipTriggerEl) => {
            return new Tooltip(tooltipTriggerEl, {
                'tooltip-max-width': '500px'
            })
        })
    }
    
    sendEmail = (email_heading, email_body, file_attachments) => {
        this.getTargetUsers()
        .then(res => {
            
        })
    }
    
    createBanner = (banner_body) => {
        this.getTargetUsers()
        .then(res => {
            
        })
    }
    
    archiveUsers = () => {
        this.getTargetUsers()
        .then(res => {
            
        })
    }
    
    downloadEmails = (extension) => {
        this.getTargetUsers()
        .then(res => {
            const data = ["Name, Role, Email"]
            res.forEach(obj => {
                data.push([
                    (obj.name || obj.first_name + " " + obj.last_name || '').trim().split(",").join(" "),
                    obj.user_data.role,
                    (obj.contact_email || obj.user_data.email).split(",").join(" "),
                    ].join(','))
            })
            const fileName = this.state.Recepient.value === "Students" ? "student_emails" : this.state.Recepient.value === "Startups" ? "startup_emails" : "user_emails"
            saveAs(new Blob([data.join('\r\n')]), `${fileName}.${extension}`)
        })
    }
    
    getTargetUsers = () => {
        this.props.fetchStudents()
        this.props.fetchStartups()
        this.props.fetchUsers();
        this.props.fetchAllIndustries()
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.applyFilters())
            }, 2000)
        })
    }
    
    applyFilters = () => {
        const targets = []
        if (this.state.Recepient.value === "All Users") {
            Object.entries(this.props.students).forEach(student => {
                const id = student[1].user_id
                targets.push({ ...student[1], user_data: this.props.users[id] })
            })
            Object.entries(this.props.startups).forEach(startup => {
                const id = startup[1].user_id
                targets.push({...startup[1], user_data: this.props.users[id]})
            })
        } else if (this.state.Recepient.value === "Startups") {
            Object.entries(this.props.startups).forEach(startup => {
                const id = startup[1].user_id
                targets.push({...startup[1], user_data: this.props.users[id]})
            })
        } else {
            Object.entries(this.props.students).forEach(student => {
                const id = student[1].user_id
                targets.push({...student[1], user_data: this.props.users[id]})
            })
        }
        return targets.filter(target => {
            let check = true;
            Object.entries(this.state.filters).forEach(filter => {
                const from_target = target[getFieldName(filter[1][0].current.state.field.value)]
                const from_target_user = target.user_data[getFieldName(filter[1][0].current.state.field.value)]
                const from_filter = filter[1][0].current.state.value
                if (from_target === undefined && from_target_user === undefined) {
                    check = false
                }
                else if (filter[1][0].current.state.field === null
                    ||
                    filter[1][0].current.state.field.value === "Add Field"
                    ||
                    filter[1][0].current.state.value === null
                ) {
                    check = true
                } else {
                    if (typeof from_filter === "string") {
                        check &= (from_target|| "").toLowerCase() === from_filter.toLowerCase() || (from_target_user|| "").toLowerCase() === from_filter.toLowerCase()
                    } else if (typeof from_filter.value === "string") {
                        check &= (from_target|| "").toLowerCase() === from_filter.value.toLowerCase() || (from_target_user|| "").toLowerCase() === from_filter.value.toLowerCase()
                    } else {
                        let in_check = false
                        const ff_map = from_filter.map(f => f[0].value)
                        from_target.forEach(val => {
                            const filtered = ff_map.filter(f => val.name.toLowerCase() === f.toLowerCase())
                            in_check |= filtered.length > 0
                        })
                        from_target_user.forEach(val => {
                            const filtered = ff_map.filter(f => val.name.toLowerCase() === f.toLowerCase())
                            in_check |= filtered.length > 0
                        })
                        check &= in_check
                    }
                }
                
                if (filter[1][0].current.state.exclude) {
                    check = !check
                }
            })
            return check;
        })
    }
    
    targetChange = (e) => {
        this.setState({
            filters: {},
            filter_light_dark: 0,
            Recepient: e
        })
        this.updateChildWithFilters()
    }
    
    actionChange = (e) => {
        const aref = React.createRef()
        this.setState({ Action: e, aref: aref })
        
    }
    
    cascadeFilterColors = (number) => {
        for(let i = number+1; i < this.state.filter_light_dark; i++) {
            try {
                let target = $(`#Filter${i}`)
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
    
    removeFilter = (filter_num) => {
        const new_filters = this.state.filters
        delete new_filters[filter_num]
        this.setState((prevState) => {
            return {
                ...prevState,
                filters: new_filters,
                filter_light_dark: prevState.filters.length > 0 ? prevState.filter_light_dark : 0
            }
        })
        this.cascadeFilterColors(filter_num)
        
        this.updateChildWithFilters()
    }
    
    addFilter = (e) => {
        this.setState((prevState) => {
            const cref = React.createRef()
            const child = <FilterRow
                ref={cref}
                props={this.props}
                key = {prevState.filter_light_dark}
                recepient = {prevState.Recepient.value}
                row_num = {prevState.filter_light_dark}
                color_code = {prevState.filter_light_dark%2===0 ? 'file-item-light' : 'file-item-dark'}
                remove_filter={this.removeFilter}
                updateChildWithFilters={this.updateChildWithFilters}
            />
            return {
                ...prevState,
                ...{
                    filter_light_dark: prevState.filter_light_dark + 1,
                    filters: {
                        ...prevState.filters,
                        [prevState.filter_light_dark]: [cref, child]
                    }
                }
            }
        })
    }
    
    updateChildWithFilters = () => {
        setTimeout(() => {
            try {
                this.state.aref.current.filtersUpdated()
            } catch (err) {}
        }, 1000)
    }
    
    makeActionElement = () => {
        const comp =  this.state.Action.value === "Send Email"
                ?
                <MassEmailComponent ref={this.state.aref} sendEmail={this.sendEmail} />
                :
                this.state.Action.value === "Archive Users"
                ?
                <ArchiveComponent ref={this.state.aref} getTargetUsers={this.getTargetUsers}/>
                :
                this.state.Action.value === "Download Emails"
                ?
                <EmailDownloadComponent ref={this.state.aref} download={this.downloadEmails} getTargetUsers={this.getTargetUsers}/>
                :
                this.state.Action.value === "Make Banner"
                ?
                <BannerMaker ref={this.state.aref} />
                :
                null
        return comp
    }
    
    render() {
        return (
            <div>
                <div id="PageTop" className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <label htmlFor="Action_Select">Select Action&nbsp;
                            <small className="light-grey-text">
                                <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="What do you want to do">
                                </i>
                            </small>
                        </label>
                        <Select
                            options={[
                                { value: '', label:'Action Type' },
                                { value: 'Send Email', label: 'Send Email' },
                                { value: 'Archive Users', label: 'Archive Users' },
                                { value: 'Make Banner', label: 'Make Banner' },
                                { value: 'Download Emails', label: 'Download Emails'}
                            ]}
                            id="Action" className="select" value={this.state.Action} onChange={this.actionChange}
                            />
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <label htmlFor="UserType">Select Recipients&nbsp;
                            <small className="light-grey-text">
                                <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Which users do you want to interqact with">
                                </i>
                            </small>
                        </label><br />
                        <Select
                            options={[
                                { value: 'All Users', label: 'All Users' },
                                { value: 'Students', label: 'Students' },
                                { value: 'Startups', label: 'Startups' },
                            ]}
                            id="Recepient" className="select" value={this.state.Recepient} onChange={this.targetChange}
                            />
                    </div>
                    <div id="FilterBox" className="col-sm-12">
                        <label htmlFor="FilterBox">Manage Filters&nbsp;
                            <small className="light-grey-text">
                                <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Use filters to precisely target specific users">
                                </i>
                            </small>
                        </label><br />
                        <div className="filter-item-dark row">
                            <b className="col-4">Fields</b>
                            <b className="col-4">Values</b>
                            <b className="col-2">Exclude&nbsp;
                                <small className="light-grey-text expand">
                                    <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Exclude targets with this value">
                                    </i>
                                </small>
                            </b>
                            <b className="col-2">Delete</b>
                        </div>
                        {Object.entries(this.state.filters).map(filter => filter[1][1])}
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <button id="AddFilterBtn" className="btn btn-success rounded" onClick={this.addFilter}>Add Filter</button>
                    </div>
                </div>
                <div id="ActionComponentHolder" className="container-fluid">
                    {this.makeActionElement()}
                </div>
            </div>
        )
    }
}

const makeUsersMap = (users) => {
    const map = {}
    Object.entries(users).forEach(entry => map[entry[1]._id] = entry[1])
    return map
}

const mapStateToProps = (reduxState) => ({
    startups: reduxState.startups.all,
    students: reduxState.students.all_students,
    users: makeUsersMap(reduxState.user.current),
    industries: reduxState.industries.all.map(industry => industry.name)
  });

export default withRouter(connect(mapStateToProps, {fetchStudents, fetchStartups, fetchUsers, fetchAllIndustries})(ActionDashBoard));