import React from "react";
import Modal from "./Modal";
import { useState } from "react";

function Seminar({
  children,
  id,
  photo,
  title,
  description,
  date,
  time,
  edit,
  update,
  remove,
}) {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <section>
        <img src={photo} alt="seminarImage"></img>
        <div>
          <h2>{title}</h2>
          <div>{description}</div>
          <div>{date}</div>
          <div>{time}</div>
        </div>
        <div>
          <button onClick={() => setModal(true)}>Редактировать</button>
          <button onClick={() => remove(id)}>Удалить</button>
        </div>
      </section>
      <Modal visible={modal} setVisible={setModal}>
        <form>
          <input
            value={title}
            onChange={(e) => edit(id, "title", e.target.value)}
            type="text"
            placeholder="Редактировать название семинара"
          />
          <textarea
            value={description}
            onChange={(e) => edit(id, "description", e.target.value)}
            type="text"
            placeholder="Редактировать описание семинара"
          />
          <input
            value={date}
            onChange={(e) => edit(id, "date", e.target.value)}
            type="text"
            placeholder="Редактировать дату семинара"
          />
          <input
            value={time}
            onChange={(e) => edit(id, "time", e.target.value)}
            type="text"
            placeholder="Редактировать время семинара"
          />
          <button onClick={() => update(id)}>Обновить</button>
        </form>
      </Modal>
    </div>
  );
}

export default Seminar;
