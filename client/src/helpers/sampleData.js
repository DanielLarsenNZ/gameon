const sample = [
  {
    id: 1,
    title: 'Table Tennis Championship',
    endDate: true,
    isOpenToJoin: true,
    description:
      "Every good tournament has an even better description to inform its potential players and tell them what's up for grabs. In this series, any player is welcome at any point in the competition.",
    location: 'The Hub, Auckland',
    timing: 'Anytime',
    owner: {
      first_name: 'Mark',
      last_name: 'Tester',
      imageUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
      email: 'example@example.com',
    },
    members: [
      {
        id: 1,
        first_name: 'Mark',
        last_name: 'Tester',
        imageUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
      },
      {
        id: 2,
        first_name: 'Emily',
        last_name: 'Example',
        imageUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
      },
      { id: 3, first_name: 'Tally', last_name: 'Tester', imageUrl: 'https://randomuser.me/api/portraits/women/34.jpg' },
      { id: 4, first_name: 'Ben', last_name: 'Bernard', imageUrl: 'https://randomuser.me/api/portraits/men/34.jpg' },
      { id: 5, first_name: 'Ben', last_name: 'Bernard', imageUrl: 'https://randomuser.me/api/portraits/men/28.jpg' },
      { id: 6, first_name: 'Ben', last_name: 'Bernard', imageUrl: 'https://randomuser.me/api/portraits/women/28.jpg' },
      { id: 7, first_name: 'Ben', last_name: 'Bernard', imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg' },
      { id: 8, first_name: 'Ben', last_name: 'Bernard', imageUrl: 'https://randomuser.me/api/portraits/women/33.jpg' },
    ],
  },
  {
    id: 2,
    title: 'Something Else Championship',
    endDate: true,
    isOpenToJoin: true,
    description:
      "Every good tournament has an even better description to inform its potential players and tell them what's up for grabs. In this series, any player is welcome at any point in the competition.",
    location: 'The Hub, Auckland',
    timing: 'Anytime',
    owner: {
      first_name: 'Mark',
      last_name: 'Tester',
      imageUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
      email: 'example@example.com',
    },
    members: [
      {
        id: 1,
        first_name: 'Emily',
        last_name: 'Example',
        imageUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
      },
      {
        id: 2,
        first_name: 'Mark',
        last_name: 'Tester',
        imageUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
      },
    ],
  },
  {
    id: 3,
    title: 'Another Tournament',
    endDate: false,
    isOpenToJoin: false,
    description:
      "Every good tournament has an even better description to inform its potential players and tell them what's up for grabs. In this series, any player is welcome at any point in the competition.",
    location: 'The Hub, Auckland',
    timing: 'Anytime',
    owner: {
      first_name: 'Mark',
      last_name: 'Tester',
      imageUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
      email: 'example@example.com',
    },
    members: [
      {
        id: 1,
        first_name: 'Ben',
        last_name: 'Bernard',
        imageUrl: 'https://randomuser.me/api/portraits/men/34.jpg',
      },
    ],
  },
];

export default sample;
