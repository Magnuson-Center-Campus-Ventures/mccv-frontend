import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { startupByID } from '../../services/datastore';


import '../../styles/postings.scss';

class PostListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startup: null,
    };
  }

  componentDidMount() {
    startupByID(this.props.post.startup_id, (startup) => {
      this.setState({ startup });
    });
  }

  render() {
    const route = `/posts/${this.props.post._id}`;
    return (
      this.state.startup !== null ? (
        <Link to={route} key={this.props.post.id} className="listItem link">
          <div className="companyInfo">
            <img src={this.state.startup.logo} alt="no logo" />
            <div className="companyText">
              <h1 id="startupName"> { this.state.startup.name} </h1>
              <div className="location">
                <span className="locationIcon" />
                <h2> { this.state.startup.location} </h2>
              </div>
            </div>
          </div>
          <div className="postInfo">
            <h1 id="postTitle">{ this.props.post.title}</h1>
            <h2 id="matched">Matched on: </h2>
          </div>
        </Link>
      ) : (
        <div> Loading </div>
      )

    );
  }
}

export default PostListItem;
