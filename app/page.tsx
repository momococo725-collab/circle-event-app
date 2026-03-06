"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [date, setDate] = useState(new Date());

  const addEvent = () => {
    if (!title || !genre || !date) return;

    const newEvent = { title, genre, date: date.toDateString() };
    setEvents([...events, newEvent]);

    setTitle("");
    setGenre("");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>大学サークルイベントカレンダー</h1>

      <h2>イベント追加</h2>

      <input
        placeholder="イベント名"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="ジャンル"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <Calendar onChange={setDate} value={date} />

      <button onClick={addEvent}>追加</button>

      <h2>イベント一覧</h2>

      {events.map((event, index) => (
        <div key={index} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <p>イベント: {event.title}</p>
          <p>ジャンル: {event.genre}</p>
          <p>日付: {event.date}</p>
        </div>
      ))}
    </div>
  );
}