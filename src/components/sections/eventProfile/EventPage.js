import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import localImg from "../../../assets/cover-art-4.jpg";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/Events/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="event-page">
      
      <div className="event-image-wrapper">
        {/* TODO: Update image source when fetching from backend */}
        {/* <img className="event-image" src={event.eventPhotoUrl} alt={event.name} /> */}
        <img className="event-image" src={localImg} alt={event.name} />
      </div>
    <section className="event-info">
    <header className="event-header">
        <h1 className="event-title">{event.name}</h1>
      </header>
      
      <section className="event-description">
        <p className="description-text">{event.description}</p>
      </section>

      <section className="event-dates">
        <p className="start-date">
          <span className="date-label">Start Date:</span> {new Date(event.startDate).toLocaleDateString()}{" "}
          {new Date(event.startDate).toLocaleTimeString()}
        </p>
        <p className="end-date">
          <span className="date-label">End Date:</span> {new Date(event.endDate).toLocaleDateString()}{" "}
          {new Date(event.endDate).toLocaleTimeString()}
        </p>
      </section>

      <section className="event-lineups">
        <h2 className="lineups-heading">Lineups</h2>
        <ul className="lineups-list">
          {event.lineUps.map((lineUp) => (
            <li key={lineUp.id} className="lineup-item">
              <span className="lineup-artist">{lineUp.artistName}</span>
              {" - "}
              <span className="lineup-time">
                {new Date(lineUp.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </li>
          ))}
        </ul>
      </section>
      </section>
    </div>
  );
}