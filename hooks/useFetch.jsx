import { useState, useEffect } from "react";
import axios from "axios";

const UseFetch = (url) => {
    const [todos, setTodos] = useState([]);

  useEffect(() => {
      axios
        .get("http://localhost:3002/user")
        .then(
          (response) => {
            if (response.status == 404) {
              throw new Error("Not found");
            }
            if (response.status !== 200) {
              throw new Error("something wen't wrong");
            }
            setTodos(response.data)
          },
        )
        .catch((error) => console.log(error.message));
  }, []);

return {todos,setTodos}

};

export default UseFetch;
