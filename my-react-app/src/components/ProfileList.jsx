// src/components/ProfileList.jsx
import ProfileCard from "./ProfileCard";

function ProfileList() {
  return (
    <div>
      <ProfileCard name="Alice" age={25} role="Developer" />
      <ProfileCard name="Bob" age={30} role="Designer" />
      <ProfileCard name="Charlie" age={35} role="Manager" />
    </div>
  );
}

export default ProfileList;
