import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import {useSelector} from "react-redux";

const Profile = (props) => {

  const [isFollow, setIsFollow] = useState(false);

  const authUser = null;

  const handleToggle = () => {
    setIsFollow((previousState) => ({
      isFollow: !previousState.isFollow
    }));
  };

  const {user, userInfo} = props;

  //const {followers, following, frinds} = userInfo;
    return (
      <>
        <div className="jr-profileon">
          <div className="jr-profileon-thumb jr-profileon-thumb-htctrcrop">
            <img src={user?.photoUrl} alt=''/>
          </div>
          <div className="jr-profileon-content">
            <p className="jr-profileon-title">{user?.fullName}</p>
            <span className="jr-fs-sm">{user?.address}</span>
          </div>
        </div>

        {/* <div className="jr-follower text-center">
          <ul className="jr-follower-list">
            <li>
              <span className="jr-follower-title">{followers}</span>
              <span>Followers</span>
            </li>
            <li>
              <span className="jr-follower-title">{following}</span>
              <span>Following</span>
            </li>
            <li>
              <span className="jr-follower-title">{frinds}</span>
              <span>project</span>
            </li>
          </ul>
        </div> */}
     
      </>
    )
};
export default Profile
