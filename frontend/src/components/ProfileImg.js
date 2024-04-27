const ProfileImg = ({picColor, className}) => {
    return (
         <div className="profile" style={{backgroundColor: (picColor)}}>{className && className[0].toUpperCase()}</div>
     );
}
 
export default ProfileImg;