// src/components/ProfileCard.jsx
function ProfileCard({ name, age, role }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
}

export default ProfileCard;
