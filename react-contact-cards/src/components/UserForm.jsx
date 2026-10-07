import { useState } from "react";

// UserForm collects input and sends a new user object to the parent via onAddUser
function UserForm({ onAddUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    onAddUser(newUser);

    // clear the form
    setName("");
    setEmail("");
    setPhone("");
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Add a Contact</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone (optional)"
        />
      </div>
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default UserForm;
