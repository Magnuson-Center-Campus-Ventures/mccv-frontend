import React from 'react';
import { Link } from 'react-router-dom';


const StartupListItem = (props) => {
  const route = `/startups/${props.post._id}`;
  return (
    <div className="startupListItem" key={props.startup.id}>
      <Link to={route} key={props.startup.id} className="link">
        <h1>{props.startup.name}</h1>
      </Link>
    </div>
  );
};

export default StartupListItem;
