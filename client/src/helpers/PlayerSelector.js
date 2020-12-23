import React from 'react';
import SelectSearch from 'react-select-search';

const options = [
  { name: 'Swedish', value: 'sv' },
  { name: 'English', value: 'en' },
  {
    type: 'group',
    name: 'Group name',
    items: [{ name: 'Spanish', value: 'es' }],
  },
];

export const friends = [
  { name: 'Annie Cruz', value: 'annie.cruz', photo: 'https://randomuser.me/api/portraits/women/60.jpg' },
  { name: 'Eli Shelton', disabled: true, value: 'eli.shelton', photo: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { name: 'Loretta Rogers', value: 'loretta.rogers', photo: 'https://randomuser.me/api/portraits/women/51.jpg' },
  { name: 'Lloyd Fisher', value: 'lloyd.fisher', photo: 'https://randomuser.me/api/portraits/men/34.jpg' },
  { name: 'Tiffany Gonzales', value: 'tiffany.gonzales', photo: 'https://randomuser.me/api/portraits/women/71.jpg' },
  { name: 'Charles Hardy', value: 'charles.hardy', photo: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { name: 'Rudolf Wilson', value: 'rudolf.wilson', photo: 'https://randomuser.me/api/portraits/men/40.jpg' },
  { name: 'Emerald Hensley', value: 'emerald.hensley', photo: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { name: 'Lorena McCoy', value: 'lorena.mccoy', photo: 'https://randomuser.me/api/portraits/women/70.jpg' },
  { name: 'Alicia Lamb', value: 'alicia.lamb', photo: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { name: 'Maria Waters', value: 'maria.waters', photo: 'https://randomuser.me/api/portraits/women/82.jpg' },
];

function renderFriend(props, option, snapshot, className) {
  const imgStyle = {
    borderRadius: '50%',
    verticalAlign: 'middle',
    marginRight: 10,
  };

  return (
    <button {...props} className={className} type="button">
      <span>
        <img alt="" style={imgStyle} width="32" height="32" src={option.photo} />
        <span>{option.name}</span>
      </span>
    </button>
  );
}

const PlayerSelector = () => (
  <SelectSearch
    className="select-search select-search--multiple"
    options={friends}
    renderOption={renderFriend}
    closeOnSelect
    search
    placeholder="Search friends"
  />
);

export default PlayerSelector;
