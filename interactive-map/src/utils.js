import icons from './icons';

export const orderLookup = order => {
  switch (order) {
    case 'Augustinian Canons':
      return { color: '#969CA1' };

    case 'Basilians':
      return { color: '#6f93ad' };

    case 'Basilians then Cistericans':
      return { color: '#38e3df' };

    case 'Benedictines':
      return { color: '#c683ea' };

    case 'Cistercians':
      return { color: '#d688aa' };

    case 'Cluniacs':
      return { color: '#e77a68' };

    case 'Knights of the Hospital of Saint Lazarus at Jerusalem':
      return { color: '#eda268' };

    case 'Knights of the Hospital of Saint John of Jerusalem':
      return { color: '#6795fe' };

    case 'Knights Templar':
      return { color: '#ffff00' };

    case 'Premonstratensian Canons':
      return { color: '#ff76b8' };

    default:
      return { color: '#fff' };
  }
};

export const placeTypeLookup = placeType => {
  switch (placeType) {
    case 'monastery':
      return { icon: icons.MONASTERY, scale: '1,-1', translate: '-6,-41' };
    default: {
      return {};
    }
  }
};

export const getListOfOrders = sites => {
  const ordersSet = sites.reduce((accumulator, currentValue) => {
    if (
      currentValue.properties.order &&
      currentValue.properties.order.length > 0
    ) {
      const m = currentValue.properties.order;
      if (!m.endsWith('?') && !accumulator.has(m)) {
        accumulator.add(m);
      }
    }

    return accumulator;
  }, new Set(['Unknown']));
  return [...ordersSet].sort((a, b) => a.localeCompare(b));
};

// source: http://en.marnoto.com/2014/04/converter-coordenadas-gps.html
const getDms = val => {
  const result = [];
  const v = Math.abs(val);

  const deg = Math.floor(v);
  result.push(`${deg}º`);

  const min = Math.floor((v - deg) * 60);
  result.push(`${min}'`);

  const sec = Math.round((v - deg - min / 60) * 3600 * 1000) / 1000;
  result.push(`${sec}"`);

  return result;
};

// source: http://en.marnoto.com/2014/04/converter-coordenadas-gps.html
export const ddToDms = ({ lat, lng }) => {
  const latResult = [];
  latResult.push(lat >= 0 ? 'N' : 'S');

  const lngResult = [];
  lngResult.push(lng >= 0 ? 'E' : 'W');

  return `${lngResult.concat(getDms(lng)).join(' ')} ${latResult
    .concat(getDms(lat))
    .join(' ')}`;
};

export const startCaseTerm = t => {
  return (
    t
      .trim()
      .charAt(0)
      .toUpperCase() + t.slice(1)
  );
};

export const startCaseList = (l, d) => {
  const words = l.split(d);
  return words
    .map(word => {
      return startCaseTerm(word);
    })
    .join(', ');
};
