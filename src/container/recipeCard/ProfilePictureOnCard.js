import React, {Component} from 'react';
import '../../css/App.css';

class ProfilePictureOnCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const styles = {
      container: {
        background: this.props.src,
        backgroundSize: "cover",
        borderRadius: "50% 50% 50% 50%",
        width: "100px",
        height: "100px",
        position: "absolute",
        marginLeft: "calc(100% - 107px)",
        marginTop: "6px"
      }
    };
    return (
        <div className="ProfilePictureOnCard"
             style={styles.container}>
        </div>
    );
  }
}

export default ProfilePictureOnCard;