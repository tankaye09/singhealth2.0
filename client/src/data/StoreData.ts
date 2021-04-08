export interface Data {
  key: string,
  name: string,
  location: string,
  terms: string,
  expiry: string,
  image: string,
}

export const getData = (username: string): Data[] => {
  return [
    {
      key: '1',
      name: 'Kopitiam',
      location: '#01-04',
      terms: '[Enter Terms Here]',
      expiry: '31/03/22',
      image: 'https://www.kopitiam.biz/wp-content/uploads/2015/04/KPT@T3.jpg',
    },
    {
      key: '2',
      name: '1983',
      location: '#B1-01',
      terms: '[Enter Terms Here]',
      expiry: '04/08/21',
      image: 'https://shopsinsg.com/wp-content/uploads/2016/10/1983-coffee-toast.jpg',
    },
    {
      key: '3',
      name: 'Subway',
      location: '#B1-10',
      terms: '[Enter Terms Here]',
      expiry: '06/02/23',
      image: 'https://fastly.4sqi.net/img/general/600x600/13266900_q8UEwE5J335qrk6ELrj0anXCKJAinrN4yp71swgaGsQ.jpg',
    },
    {
      key: '4',
      name: '168 Florist',
      location: '#02-40',
      terms: '[Enter Terms Here]',
      expiry: '08/04/21',
      image: 'https://www.yellowpages.com.sg/idsnumber/00155377/00155377.jpg',
    },
  ];
};
