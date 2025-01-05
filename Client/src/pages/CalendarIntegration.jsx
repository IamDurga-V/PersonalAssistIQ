import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CalendarIntegration = () => {
  const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
  const API_KEY = 'YOUR_API_KEY';
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  // Sign in the user upon button click
  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  // Sign out the user upon button click
  const handleSignoutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  // Add an event to the user's calendar
  const addEvent = () => {
    const event = {
      summary: 'New Event',
      location: '123 Event St, City, Country',
      description: 'A chance to meet and discuss.',
      start: {
        dateTime: '2024-11-10T09:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: '2024-11-10T17:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
      attendees: [{ email: 'attendee@example.com' }],
    };

    gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    })
    .then(response => {
      console.log('Event created:', response);
      alert('Event created successfully!');
    })
    .catch(error => {
      console.error('Error creating event:', error);
    });
  };

  return (
    <div>
      <button onClick={handleAuthClick}>Sign in with Google</button>
      <button onClick={handleSignoutClick}>Sign out</button>
      <button onClick={addEvent}>Add Event</button>
    </div>
  );
};

export default CalendarIntegration;
