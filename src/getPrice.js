import determineRegion from './sandbox';
import {
  island1,
  island2,
  island3,
  island4,
  mainland1,
  mainland2,
  mainland3,
  mainland4,
  mainland5,
} from './regionalBasePrice';

const getPrice = (srcData, destData) => {

  const destRegion = determineRegion(destData);
  const srcRegion = determineRegion(srcData);
  let price;
  // let weight = res.locals.weight;

  switch (srcRegion) {
    case 'island1':
      price = island1[destRegion];
      break;
    case 'island2':
      price = island2[destRegion];
      break;
    case 'island3':
      price = island3[destRegion];
      break;
    case 'island4':
      price = island4[destRegion];
      break;
    case 'mainland1':
      price = mainland1[destRegion];
      break;
    case 'mainland2':
      price = mainland2[destRegion];
      break;
    case 'mainland3':
      price = mainland3[destRegion];
      break;
    case 'mainland4':
      price = mainland4[destRegion];
      break;
    case 'mainland5':
      price = mainland5[destRegion];
      break;
    default:
      console.log('chill');
  }

  // if (weight > 2.0);
  return price;
};

export default getPrice;
