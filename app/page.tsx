"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type EventItem = {
  id: number;
  title: string;
  date: string;
  place: string;
  joined: boolean;
};

export default function Home() {
  const [events, setEvents] = useState<EventItem[]>([
    { id: 1, title: "新歓ミーティング", date: "2026-04-10", place: "学生会館", joined: true },
    { id: 2, title: "交流会", date: "2026-04-18", place: "梅田カフェ", joined: false },
    { id: 3, title: "BBQイベント", date: "2026-05-03", place: "淀川河川敷", joined: true },
  ]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");

  const addEvent = () => {
    if (!title || !date || !place) return;

    const newEvent: EventItem = {
      id: Date.now(),
      title,
      date,
      place,
      joined: false,
    };

    setEvents([newEvent, ...events]);
    setTitle("");
    setDate("");
    setPlace("");
  };

  const toggleJoin = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, joined: !event.joined } : event
      )
    );
  };
const deleteEvent = (id: number) => {
  setEvents(events.filter((event) => event.id !== id));
};

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-blue-600 font-semibold mb-2">Portfolio Project</p>
          <h1 className="text-4xl font-bold mb-3">Campus Event Manager</h1>
          <p className="text-gray-600">
            大学サークルや学生団体向けに、イベント情報の管理と参加確認を簡単に行えるWebアプリを想定して制作しました。
          </p>
        </header>

<div className="mb-8">
  <Calendar />
</div>

        <section className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white rounded-2xl shadow-sm p-5 border">
            <h2 className="text-xl font-semibold mb-4">イベントを追加</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="イベント名"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="場所"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />

              <button
                onClick={addEvent}
                className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:opacity-90"
              >
                追加する
              </button>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-5 border">
            <h2 className="text-xl font-semibold mb-4">イベント一覧</h2>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-600">日付: {event.date}</p>
                    <p className="text-sm text-gray-600">場所: {event.place}</p>
                  </div>

                  <button

                    onClick={() => toggleJoin(event.id)}

                    className={`rounded-lg px-4 py-2 text-sm font-medium ${
                      event.joined
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {event.joined ? "参加予定" : "未参加"}
                  </button>
                </div>
              ))}
<button
  onClick={() => deleteEvent(event.id)}
  className="bg-red-100 text-red-700 rounded-lg px-4 py-2 text-sm"
>
  削除
</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}