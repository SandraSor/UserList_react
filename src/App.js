import React from "react";
import "./index.css";
import { Success } from "./components/Success";
import { Users } from "./components/Users/Users";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setinvites] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [sucsess, setSucsess] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Ошибка при получении пользоватеей");
      })
      .finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setinvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setinvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSucsess(true);
  };

  return (
    <div className="App">
      {sucsess ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
