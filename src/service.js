import {
  fromPairs,
  groupBy, sortBy, toPairs
} from 'lodash';
import moment from 'moment';
import data from './res.json';

const sorted = data.sort((d, d2) => d.adns < d2.adns);
export const getVoivodeshipsFallenBoars = () => {
  const reversed = sorted.reverse();
  const grouped = groupBy(reversed, (data) => data.voivodeship.toLowerCase());

  const voi = [];
  const results = [];
  console.log(grouped);
  Object.entries(grouped).forEach(([key, value]) => {
    voi.push(key);
    results.push(
      sortBy(value, 'voivodeship_case_number').reverse()[0]
        .voivodeship_case_number
    );
  });
  return {
    labels: voi,
    data: results
  };
};
export const getByVoivodeships = () => {
  const reversed = sorted.reverse();
  const grouped = groupBy(reversed, (data) => data.voivodeship.toLowerCase());

  return Object.entries(grouped).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: sortBy(value, 'voivodeship_case_number').reverse()
    };
  }, {});
};
export const lastMothCases = () => sorted
  .map((data) => {
    if (moment().diff(moment(data.date_of_confirmation), 'days') <= 30) return data;
    return false;
  })
  .filter(Boolean).length;

export const totalCases = () => getVoivodeshipsFallenBoars().data.reduce(
  (acc, val) => acc + val,
  0
);
export const getLastMonthIncrease = () => {
  console.log(totalCases());
  return Math.round(lastMothCases() / (totalCases() / 100));
};
console.log(getLastMonthIncrease(), 'inc');
const normalizeCOD = (cause) => {
  switch (cause.toLowerCase()) {
    case 'padły/padłe':
    case 'padły':
      return 'fallen';
    case 'odstrzelony z objawami':
    case 'odstrzelony':
      return 'shot';
    case 'zabity w wypadku':
      return 'accident';
    default:
      return 'fallen';
  }
};
const normalizeForView = (cause) => {
  switch (cause.toLowerCase()) {
    case 'fallen':
      return 'padły';
    case 'shot':
      return 'odstrzelony';
    case 'accident':
      return 'zabity w wypadku';
    default:
      return 'padły';
  }
};

export const causeOfDeath = () => {
  const reversed = sorted.reverse().map((d) => {
    return {
      ...d,
      cause_of_suspicion: normalizeCOD(d.cause_of_suspicion)
    };
  });
  const grouped = groupBy(reversed, (data) => data.cause_of_suspicion.toLowerCase());

  const voi = [];
  const results = [];
  Object.entries(grouped).forEach(([key, value]) => {
    voi.push(normalizeForView(key));
    results.push(value.length);
  });
  return {
    labels: voi,
    data: results
  };
};

export const groupedItemsByDate = () => {
  const d = groupBy(data, (b) => {
    return moment(b.date_of_confirmation, 'DD/MM/YYYY').startOf('month').format('YYYY/MM');
  });
  const paired = toPairs(d);
  console.log(paired, 'paired');
  const sorted = sortBy(paired, (kvArray) => kvArray[0]);
  console.log(sorted, 'sorted');
  // const mapped = map(sorted, (kvArray) => kvArray[1]);
  return fromPairs(sorted);
};

console.log(groupedItemsByDate(), 'fdsfsd');
