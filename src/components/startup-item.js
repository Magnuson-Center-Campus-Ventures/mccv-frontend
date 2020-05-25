import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/postings.scss';

const StartupListItem = (props) => {
  const route = `/startups/${props.startup._id}`;
  return (
    <div className="listItem" key={props.startup.id}>
      <Link to={route} key={props.startup.id} className="link">
        <h1 className="startupName">{props.startup.name}</h1>
      </Link>
    </div>
  );
};

export default StartupListItem;
