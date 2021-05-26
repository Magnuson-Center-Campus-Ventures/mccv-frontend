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
import { fetchStartups, fetchStudents, fetchUsers } from '../../actions/index';
import {UserFields, StudentFields, StartUpFields} from './filters'
import '../../styles/admin-dashboard.scss'
import 'bootstrap/dist/css/bootstrap.css';


class ActionDashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Action: "",
            Recepient: "All Users",
            filters: {},
            filter_light_dark: 0,
        }
        
        this.selectChange = this.selectChange.bind(this)
        this.cascadeFilterColors = this.cascadeFilterColors.bind(this)
        this.removeFilter = this.removeFilter.bind(this)
        this.addFilter = this.addFilter.bind(this)
        this.sendEmail = this.sendEmail.bind(this)
        this.createBanner = this.createBanner.bind(this)
        this.archiveUsers = this.archiveUsers.bind(this)
        this.downloadEmails = this.downloadEmails.bind(this)
        this.getTargetUsers = this.getTargetUsers.bind(this)
        this.applyFilters = this.applyFilters.bind(this)
    }
    
    componentDidMount() {
        this.props.fetchStudents();
        this.props.fetchStartups();
        this.props.fetchUsers();
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
        .then(res => console.log(res))
    }
    
    createBanner = (banner_body) => {
        this.getTargetUsers()
    }
    
    archiveUsers = () => {
        this.getTargetUsers()
    }
    
    downloadEmails = () => {
        this.getTargetUsers()
        
    }
    
    getTargetUsers = () => {
        this.props.fetchStudents()
        this.props.fetchStartups()
        this.props.fetchUsers();
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.applyFilters())
            }, 2000)
        })
    }
    
    applyFilters = () => {
        const targets = []
        if (this.state.Recepient === "All Users") {
            Object.entries(this.props.students).forEach(student => {
                const id = student[1].user_id
                targets.push({...student[1], user_data: this.props.users[id]})
            })
            Object.entries(this.props.startups).forEach(startup => {
                const id = startup[1].user_id
                targets.push({...startup[1], user_data: this.props.users[id]})
            })
        } else if (this.state.Recepient === "Startups") {
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
        return targets
    }
    
    selectChange = (e) => {
        const id = e.target.id
        if (id === "Recepient" && this.state.Recepient !== "All Users") {
            this.setState({
                filters: {},
                filter_light_dark: 0,
                [e.target.id]: e.target.value
            })
        } else {
            this.setState({[e.target.id]: e.target.value})
        }
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
                filters: new_filters
            }
        })
        this.cascadeFilterColors(filter_num)
    }
    
    addFilter = (e) => {
        this.setState((prevState) => {
            // console.log(prevState.Recepient)
            return {
                ...prevState,
                ...{
                    filter_light_dark: prevState.filter_light_dark + 1,
                    filters: {
                        ...prevState.filters,
                        [prevState.filter_light_dark]: <FilterRow
                                                        key = {prevState.filter_light_dark}
                                                        recepient = {prevState.Recepient}
                                                        row_num = {prevState.filter_light_dark}
                                                        color_code = {prevState.filter_light_dark%2===0 ? 'file-item-light' : 'file-item-dark'}
                                                        remove_filter = {this.removeFilter}
                                                    />
                    }
                }
            }
        })
    }
    
    render() {
        return (
            <div>
                <div id="PageTop" className="row">
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <label htmlFor="Action_Select">Select Action&nbsp;
                            <small className="light-grey-text">
                                <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="What do you want to do">
                                </i>
                            </small>
                        </label>
                        <select name="action" id="Action" className="select" value={this.state.Action} onChange={this.selectChange}>
                            <option disabled value="">Action Type</option>
                            <option value="Send Email">Send Email</option>
                            <option value="Archive Users">Archive Users</option>
                            <option value="Make Banner">Make Banner</option>
                            <option value="Download Emails">Download Emails</option>
                        </select>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <label htmlFor="UserType">Select Recipients&nbsp;
                            <small className="light-grey-text">
                                <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Which users do you want to interqact with">
                                </i>
                            </small>
                        </label><br />
                        <select name="select-user" id="Recepient" className="select" value={this.state.Recepient} onChange={this.selectChange}>
                            <option value="All Users">All Users</option>
                            <option value="Startups">Startups</option>
                            <option value="Students">Students</option>
                        </select>
                    </div>
                    <div id="FilterBox" className="col-lg-6 col-md-4 col-sm-12">
                        <label htmlFor="FilterBox">Manage Filters&nbsp;
                            <small className="light-grey-text">
                                <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Use filters to precisely target specific users">
                                </i>
                            </small>
                        </label><br />
                        <div className="filter-item-dark row">
                            <b className="col-4">Fields</b>
                            <b className="col-4">Values</b>
                            <b className="col-2">Delete</b>
                        </div>
                        {Object.entries(this.state.filters).map(filter => filter[1])}
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <button id="AddFilterBtn" className="btn btn-success rounded" onClick={this.addFilter}>Add Filter</button>
                    </div>
                </div>
                <div id="ActionComponentHolder" className="container-fluid">
                    {this.state.Action === "Send Email"
                        ?
                        <MassEmailComponent sendEmail={this.sendEmail} />
                        :
                        this.state.Action === "Archive Users"
                        ?
                        <ArchiveComponent />
                        :
                        this.state.Action === "Download Emails"
                        ?
                        <EmailDownloadComponent />
                        :
                        this.state.Action === "Make Banner"
                        ?
                        <BannerMaker />
                        :
                        null
                    }
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
  });

export default withRouter(connect(mapStateToProps, {fetchStudents, fetchStartups, fetchUsers})(ActionDashBoard));