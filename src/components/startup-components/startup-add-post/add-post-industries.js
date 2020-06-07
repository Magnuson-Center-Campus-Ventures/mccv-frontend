/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateableSelect from 'react-select/creatable';
// import CreateableSelect from 'react-select/creatable';
import '../../../styles/startup-add-post/add-post-industries.scss';
import {
  fetchPost, updatePost, fetchAllIndustries,
} from '../../../actions';

class AddPostIndustries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      post: {},
      industry: '',
      nameIndustries: [],
      allIndustryOptions: [],
    };
  }

  // Get profile info
  componentDidMount() {
    console.log('industries did mount');
    console.log(this.props.post.id);
    this.props.fetchPost(this.props.post.id);
    // this.props.fetchPost(localStorage.getItem('postID'));
    this.props.fetchAllIndustries();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.post !== {} && prevProps.post !== this.props.post) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ post: this.props.post });
    }
    if (prevProps.post.industries !== this.props.post.industries) {
      this.props.post.industries.forEach((industryID) => {
        const name = this.getIndustryName(industryID);
        if (!this.state.nameIndustries.includes(name)) {
          this.state.nameIndustries.push(name);
        }
      });
    }
    if (prevProps.post.industries !== this.props.post.industries) {
      // Set up options for dropdown
      const allIndustryOptions = this.props.industries.all.map((industry) => {
        return { value: industry.name, label: industry.name, industry };
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ allIndustryOptions });
    }
  }

  onIndustryChange(event) {
    this.setState({
      industry: event.target.value,
    });
  }

  getIndustryName(id) {
    const industryObject = this.props.industries.all.find((industry) => {
      return (industry.id === id);
    });
    return industryObject.name;
  }

  addIndustry = () => {
    if (!this.state.nameIndustries.includes(this.state.industry)) {
      this.state.nameIndustries.push(this.state.industry);
    }
    this.state.industry = '';
    this.forceUpdate();
  }

  deleteIndustry = (industry) => {
    const industries = this.state.nameIndustries.filter((value) => {
      return (value !== industry.industry);
    });
    this.state.nameIndustries = industries;
    this.forceUpdate();
  }

  renderAddIndustry() {
    const customStyles = {
      control: (base) => ({
        ...base,
        width: 200,
      }),
    };
    return (
      <div className="add-industries">
        <CreateableSelect
          className="select-dropdown"
          styles={customStyles}
          name="industries"
          options={this.state.allIndustryOptions}
          onChange={(selectedOption) => {
            this.state.industry = selectedOption.value;
            this.addIndustry();
          }}
          onCreateOption={(newOption) => {
            this.state.industry = newOption;
            this.addIndustry();
          }}
        />
      </div>
    );
  }

  renderIndustries() {
    return (
      this.state.nameIndustries.map((industry) => {
        return (
          <div className="industry" key={industry}>
            <div className="text">
              {industry}
            </div>
            <button type="submit" className="delete-btn-startup-industries" style={{ cursor: 'pointer' }} onClick={() => { this.deleteIndustry({ industry }); }}>
              <i className="far fa-trash-alt" id="icon" />
            </button>
          </div>
        );
      })
    );
  }

  render() {
    // still have occasioanl rendering issue for industries.all
    if (this.state.post.industries !== undefined && this.props.industries.all !== []) {
      return (
        <div className="AddPostIndustryContainer">
          <div className="AddPostIndustryHeaderContainer">
            <h1 className="AddPostIndustryHeader">
              Industries
            </h1>
          </div>
          <div className="AddPostIndustryDescContainer">
            <p className="AddPostIndustryDesc">
              What industries characterize your volunteer position?
            </p>
            <i className="fas fa-building" id="icon" />
          </div>
          <div id="industries">
            <div className="AddPostIndustryListHeader">Industries</div>
            {this.renderAddIndustry()}
            {this.renderIndustries()}
          </div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  userID: reduxState.auth.userID,
  post: reduxState.posts.current,
  industries: reduxState.industries,
});

export default withRouter(connect(mapStateToProps, {
  fetchPost, updatePost, fetchAllIndustries,
})(AddPostIndustries));
