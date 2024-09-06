// main.js
import { initializeMap, getData } from '../modules/map.js';
import { createCirclesAndArrowsWithList } from '../modules/circleArrow.js';
import { setupSidebar, setupNavbarLinks, setupModals } from '../modules/setup.js';
const data_path = "../../../json/kandas/ayodhya.json";
const location_file_path = "../../../json/location.json";
const marker_color = "green";
// console.log("Ayodhya")

// Main execution
const map = initializeMap();

// getData(data_path).then((pointsData) => {
//   getData(location_file_path).then((location_data) => {
//     const creationPromise = new Promise((resolve, reject) => {
//       const [arrows, circles] = createCirclesAndArrowsWithList(map, pointsData.points, location_data, marker_color);
//       resolve([arrows, circles]);
//     });

//     creationPromise.then(([arrows, circles]) => {
//     }).catch(error => {
//       console.error('Error creating circles and arrows:', error);
//     });
//   });
// });

getData(data_path).then((pointsData) => {
  getData(location_file_path).then((location_data) => {
    const arrows = createCirclesAndArrowsWithList(map, pointsData.points, location_data, marker_color,1);
  });
});

setupSidebar(map);
setupNavbarLinks();
setupModals();
