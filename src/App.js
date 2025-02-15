import "./App.css";
import { useState, useEffect } from "react";
import Seminar from "./components/Seminar";

function App() {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Запрос данных с семинарами
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/seminars")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Something went wrong: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setSeminars(data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  // Редактирование семинара
  const updateSeminar = (id) => {
    const seminar = seminars.find((seminar) => seminar.id === id);

    fetch(`http://localhost:8000/seminars/${id}`, {
      method: "PUT",
      body: JSON.stringify(seminar),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Something went wrong: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Удаление семинара
  const deleteSeminar = (id) => {
    let userResponse = window.confirm("Вы уверены, что желаете это удалить?");
    if (userResponse) {
      fetch(`http://localhost:8000/seminars/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          setSeminars((values) => {
            return values.filter((item) => item.id !== id);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onChangeHandler = (id, key, value) => {
    setSeminars((values) => {
      return values.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      );
    });
  };

  return (
    <div className="App">
      <div>{loading && <>Loading...</>}</div>
      <h1>Семинары</h1>
      <main>
        {seminars.map((item) => (
          <Seminar
            key={item.id}
            id={item.id}
            photo={item.photo}
            title={item.title}
            description={item.description}
            date={item.date}
            time={item.time}
            edit={onChangeHandler}
            update={updateSeminar}
            remove={deleteSeminar}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
