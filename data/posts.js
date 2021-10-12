import {USERS} from './users';

export const POSTS = [
  {
    imageUrl:
      'https://scontent.fhrk1-1.fna.fbcdn.net/v/t1.6435-9/153728314_506208154117808_5583063625191435405_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=e3f864&_nc_ohc=139ZkbsccSoAX-ISs8R&_nc_ht=scontent.fhrk1-1.fna&oh=8ea196b60a60d4156d3ccf2e178c3ec0&oe=618B4C12',
    user: USERS[0].user,
    likes: 7543,
    caption: 'Train Ride to Hogwarts. 😂🤖',
    profile_picture: USERS[0].image,
    comments: [
      {user: 'shohnur', comment: 'OO bratan vapweekuu 🔥'},
      {
        user: 'diyor.aka',
        comment: 'vovo malades 👍',
      },
    ],
  },
  {
    imageUrl:
      'https://scontent.fhrk1-1.fna.fbcdn.net/v/t1.6435-9/169061684_299190291574974_7204516281958195341_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=3epqLCmjuWAAX8nl38A&_nc_ht=scontent.fhrk1-1.fna&oh=8d09a49a49b577e5a81c8c6611e9bc6c&oe=61892553',
    user: USERS[1].user,
    likes: 7543,
    caption: 'This is my nephew 👨‍🍼',
    profile_picture: USERS[1].image,
    comments: [
      {user: 'olim', comment: 'OO bratan vapweekuu 🔥, bzani jiyan'},
      {
        user: 'diyor.aka',
        comment: 'qachon qaytasila, tezro keliw kere',
      },
    ],
  },
];
