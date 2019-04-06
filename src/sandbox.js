import island1 from './data/island1';
import island2 from './data/island2';
import island3 from './data/island3';
import island4 from './data/island4';
import mainland1 from './data/mainland1';
import mainland2 from './data/mainland2';
import mainland3 from './data/mainland3';
import mainland4 from './data/mainland4';
import mainland5 from './data/mainland5';

const degreesToRadians = degrees => (degrees * Math.PI) / 180;

const computeDistance = (startCoords, destCoords) => {
  const startLatRads = degreesToRadians(startCoords.lat);
  const startLongRads = degreesToRadians(startCoords.lng);
  const destLatRads = degreesToRadians(destCoords.lat);
  const destLongRads = degreesToRadians(destCoords.lng);

  const Radius = 6371; // radius of the Earth in km
  const distance =
    Math.acos(
      Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads),
    ) * Radius;

  return distance;
};

const arrayMin = arr => arr.reduce((p, v) => (p[0] < v[0] ? p : v));

const determineRegion = data => {
  const distanceArray = [];
  const allLocation = island1.concat(
    island2,
    island3,
    island4,
    mainland1,
    mainland2,
    mainland3,
    mainland4,
    mainland5,
  );
  allLocation.map(e => {
    const newArr = [];
    newArr.push(computeDistance(data, e));
    newArr.push(e.region);
    newArr.push(e.name);
    distanceArray.push(newArr);
  });

  // console.log(arrayMin(distanceArray));
  return arrayMin(distanceArray)[1];
};

export default determineRegion;
