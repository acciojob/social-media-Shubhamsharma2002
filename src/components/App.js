import React, { useState, useMemo } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/App.css';

// Initialize and capture the localizer instance
const localizer = Calendar.momentLocalizer(moment);

const App = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('ALL'); // 'ALL', 'PAST', 'UPCOMING'

  // Modal controls
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditDeleteOpen, setIsEditDeleteOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form & Selection State
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const today = moment().startOf('day');

  // Categorize events by date comparison
  const isPastEvent = (eventDate) => moment(eventDate).isBefore(today, 'day');

  // Handle Slot Click (Open Create Popup)
  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setTitle('');
    setLocation('');
    setIsCreateOpen(true);
  };

  // Handle Event Click (Open Options Popup)
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setLocation(event.location);
    setIsEditing(false);
    setIsEditDeleteOpen(true);
  };

  // Create Event Action
  const handleSaveNewEvent = () => {
    if (!title.trim()) return;

    const newEvent = {
      id: Date.now(),
      title: title.trim(),
      location: location.trim(),
      start: selectedDate,
      end: selectedDate,
      allDay: true,
    };

    setEvents((prev) => [...prev, newEvent]);
    setIsCreateOpen(false);
  };

  // Update Event Action
  const handleUpdateEvent = () => {
    if (!title.trim() || !selectedEvent) return;

    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === selectedEvent.id
          ? { ...ev, title: title.trim(), location: location.trim() }
          : ev
      )
    );
    setIsEditDeleteOpen(false);
    setIsEditing(false);
  };

  // Delete Event Action
  const handleDeleteEvent = () => {
    if (!selectedEvent) return;

    setEvents((prev) => prev.filter((ev) => ev.id !== selectedEvent.id));
    setIsEditDeleteOpen(false);
  };

  // Filter events based on active category button
  const filteredEvents = useMemo(() => {
    if (filter === 'PAST') {
      return events.filter((ev) => isPastEvent(ev.start));
    }
    if (filter === 'UPCOMING') {
      return events.filter((ev) => !isPastEvent(ev.start));
    }
    return events;
  }, [events, filter]);

  // Event Prop Getter for Cypress-required background colors
  const eventStyleGetter = (event) => {
    const isPast = isPastEvent(event.start);
    const backgroundColor = isPast
      ? 'rgb(222, 105, 135)' // Pink for Past
      : 'rgb(140, 189, 76)'; // Green for Upcoming

    return {
      style: {
        backgroundColor,
        color: '#ffffff',
        borderRadius: '4px',
        border: 'none',
        display: 'block',
      },
    };
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 id="heading">Event Tracker</h1>

      {/* Filter Buttons */}
      <div style={{ marginBottom: '15px' }}>
        <button className="btn" onClick={() => setFilter('ALL')}>
          All
        </button>
        <button className="btn" onClick={() => setFilter('PAST')} style={{ marginLeft: '8px' }}>
          Past
        </button>
        <button className="btn" onClick={() => setFilter('UPCOMING')} style={{ marginLeft: '8px' }}>
          Upcoming
        </button>
      </div>

      {/* Calendar Component with localizer prop */}
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        style={{ height: '500px' }}
      />

      {/* --- CREATE EVENT POPUP --- */}
      {isCreateOpen && (
        <div className="modal-overlay">
          <div className="mm-popup__box">
            <h3>Create Event</h3>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Event Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ marginTop: '8px' }}
              />
            </div>
            <div className="mm-popup__box__footer__right-space" style={{ marginTop: '15px' }}>
              <button className="mm-popup__btn" onClick={handleSaveNewEvent}>
                Save
              </button>
              <button
                className="mm-popup__btn"
                onClick={() => setIsCreateOpen(false)}
                style={{ marginLeft: '8px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT / DELETE EVENT POPUP --- */}
      {isEditDeleteOpen && (
        <div className="modal-overlay">
          <div className="mm-popup__box">
            <h3>Event Details</h3>
            {!isEditing ? (
              <div>
                <p><strong>Title:</strong> {selectedEvent?.title}</p>
                <p><strong>Location:</strong> {selectedEvent?.location}</p>
                <div style={{ marginTop: '15px' }}>
                  <button
                    className="mm-popup__btn mm-popup__btn--info"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="mm-popup__btn mm-popup__btn--danger"
                    onClick={handleDeleteEvent}
                    style={{ marginLeft: '8px' }}
                  >
                    Delete
                  </button>
                  <button
                    className="mm-popup__btn"
                    onClick={() => setIsEditDeleteOpen(false)}
                    style={{ marginLeft: '8px' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Event Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Event Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ marginTop: '8px' }}
                />
                <div className="mm-popup__box__footer__right-space" style={{ marginTop: '15px' }}>
                  <button className="mm-popup__btn" onClick={handleUpdateEvent}>
                    Save
                  </button>
                  <button
                    className="mm-popup__btn"
                    onClick={() => setIsEditing(false)}
                    style={{ marginLeft: '8px' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;