import ContactCard from "./ContactCard.jsx";

// UserList receives the users array via props and renders a ContactCard for each
function UserList({ users }) {
  if (users.length === 0) {
    return <p className="empty">No contacts added yet.</p>;
  }

  return (
    <div className="user-list">
      <h2>Contacts</h2>
      <div className="cards">
        {users.map((user) => (
          <ContactCard
            key={user.id}
            name={user.name}
            email={user.email}
            phone={user.phone}
          />
        ))}
      </div>
    </div>
  );
}

export default UserList;
