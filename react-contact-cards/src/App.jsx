import { useState } from "react";
import UserForm from "./components/UserForm.jsx";
import UserList from "./components/UserList.jsx";

function App() {
  // users state lives in the parent (App) and is shared with UserList via props
  const [users, setUsers] = useState([]);

  // called by UserForm when a new user is submitted
  function handleAddUser(newUser) {
    setUsers([...users, newUser]);
  }

  return (
    <div className="app">
      <h1>React Contact Cards</h1>
      <UserForm onAddUser={handleAddUser} />
      <UserList users={users} />
    </div>
  );
}

export default App;
