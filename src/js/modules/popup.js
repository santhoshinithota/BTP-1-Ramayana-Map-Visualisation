import { toggleArrows } from "./circleArrow.js";
import { zoomSetter } from "./map.js";

// Popup with buttons module for list content
export const openPopupWithList = (
  idx,
  arrows,
  map,
  pointsData,
  locations_data
) => {
  const point = pointsData[idx];
  const location_name = point.location;
  const location_coordinates = locations_data[location_name];
  const latitude = location_coordinates[0];
  const longitude = location_coordinates[1];

  const container = createPopupContainerWithList(
    idx,
    arrows,
    map,
    pointsData,
    locations_data
  );

  const popup = L.popup()
    .setLatLng([latitude, longitude])
    .setContent(container)
    .openOn(map);
};

const getIncidentPointIndexes = (point, pointsData) => {
  let list_incidents = [];
  const location = point.location;
  pointsData.forEach((item, i) => {
    if (item.location == location) {
      list_incidents.push(i);
    }
  });
  return list_incidents;
};

// Popup container creation module for list content
const createPopupContainerWithList = (
  idx,
  arrows,
  map,
  pointsData,
  locations_data
) => {
  const point = pointsData[idx]; // This is the point which is clicked
  const buttonsContainer = L.DomUtil.create("div", "popup-buttons-container");

  const list_incident_indexes = getIncidentPointIndexes(point, pointsData);
  list_incident_indexes.forEach((pointIndex, i) => {
    const button_name = pointsData[pointIndex].no;
    const button = buttonCreator(
      button_name,
      pointIndex,
      pointsData,
      arrows,
      map,
      locations_data
    );
    buttonsContainer.appendChild(button);
  });

  // Create heading element for no. topic
  const heading = L.DomUtil.create("h3", "popup-heading");
  heading.textContent = `${point.no}. ${point.topic}`;
  buttonsContainer.appendChild(heading);

  // Create content element
  const contentDiv = L.DomUtil.create("div", "popup-content");
  contentDiv.innerHTML = point.content;
  buttonsContainer.appendChild(contentDiv);

  // Add navigation buttons
  if (idx - 1 >= 0) {
    const prevButton = buttonCreator(
      "Prev",
      idx - 1,
      pointsData,
      arrows,
      map,
      locations_data
    );
    buttonsContainer.appendChild(prevButton);
  }

  if (idx + 1 < pointsData.length) {
    const nextButton = buttonCreator(
      "Next",
      idx + 1,
      pointsData,
      arrows,
      map,
      locations_data
    );
    buttonsContainer.appendChild(nextButton);
  }

  return buttonsContainer;
};

const buttonCreator = (
  button_name,
  idx,
  pointsData,
  arrows,
  map,
  locations_data
) => {
  const Button = createPopupButton(button_name, () => {
    toggleArrows(idx, arrows);
    openPopupWithList(idx, arrows, map, pointsData, locations_data);
    zoomSetter(arrows, idx, map);
  });
  return Button;
};

// Popup button creation module
const createPopupButton = (label, onClick) => {
  const button = L.DomUtil.create("button", "popup-button");
  button.innerHTML = label;
  button.addEventListener("click", onClick);
  return button;
};