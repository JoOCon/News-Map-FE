import * as moment from 'moment';

export const eventsCleaner = events => {
  if (!events._embedded) return;
  const parsedEvent = events._embedded.events.map(event => {
    const { name, id, url, images, dates } = event;
    const { venues } = event._embedded;

    return {
      name: name,
      e_id: id,
      url: url,
      img: images[0].url,
      date: moment(dates.start.dateTime).format('llll'),
      venue_name: venues[0].name,
      address: `${venues[0].address.line1} ${venues[0].city.name}, ${
        venues[0].state.stateCode
      } ${venues[0].postalCode}`,
      lat: venues[0].location.latitude,
      lng: venues[0].location.longitude,
      distance: venues[0].distance,
      favorite: false
    };
  });

  const uniqueEvents = removeDuplicates(parsedEvent, 'venue_name');
  console.log(uniqueEvents);
  return uniqueEvents;
};

const removeDuplicates = (arr, prop) => {
  let obj = {};
  return Object.keys(
    arr.reduce((prev, next) => {
      if (!obj[next[prop]]) obj[next[prop]] = next;
      return obj;
    }, obj)
  ).map(i => obj[i]);
};

export const cleanedUser = userInfo => {
  const { email, familyName, givenName, googleId, imageUrl } = userInfo;
  return {
    user: {
      google_id: googleId,
      given_name: givenName,
      family_name: familyName,
      email,
      imageUrl
    }
  };
};

export const eventServerCleaner = (user, event) => {
  const { first_name, last_name, gid, email, id } = user;
  const userObj = {
    given_name: first_name,
    family_name: last_name,
    google_id: gid,
    email
  };

  const eventObj = { ...event };
  delete eventObj.favorite;

  return { userObj, eventObj };
};
