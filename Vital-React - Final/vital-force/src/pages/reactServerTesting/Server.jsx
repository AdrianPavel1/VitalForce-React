import React, { useEffect, useState } from "react";

function Server() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8081/users")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div>
        <table>
          <thead>
            <th>Id</th>
            <th>Name</th>
            <th>email</th>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.username}</td>
                <td>{d.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Server;
