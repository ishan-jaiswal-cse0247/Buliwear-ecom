import bcrypt from 'bcryptjs';
const prodata = {
  users: [
    {
      name: 'Ishan',
      email: 'ishanjaiswal047@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'Abhishek',
      email: 'abhi@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
  ],
  product: [
    {
      name: 'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
      id: 'itm107',
      size: '0 - 6 Months',
      image: '/assets/media/Product/7.png',
      price: 499,
      countInStock: 10,
      link: 'https://www.flipkart.com/clothing-and-accessories/kids-combos-and-costumes/kids-apparel-combos/buliwear~brand/pr?sid=clo,eof,1bp&marketplace=FLIPKART&otracker=product_breadCrumbs_BuliWear+Kids%27+Apparel+Combos',
      labelsize: 'M',
      idealfor: 'Baby Boys and Baby Girls',
      brand: 'Buli-Wear',
      description:
        'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
    },
    {
      name: 'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
      id: 'itm106',
      size: '0 - 6 Months',
      image: '/assets/media/Product/6.png',
      price: 399,
      link: 'https://www.flipkart.com/clothing-and-accessories/kids-combos-and-costumes/kids-apparel-combos/buliwear~brand/pr?sid=clo,eof,1bp&marketplace=FLIPKART&otracker=product_breadCrumbs_BuliWear+Kids%27+Apparel+Combos',
      labelsize: 'M',
      idealfor: 'Baby Boys and Baby Girls',
      countInStock: 10,
      brand: 'Buli-Wear',
      description:
        'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
    },
    {
      name: 'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
      id: 'itm105',
      size: '0 - 6 Months',
      image: '/assets/media/Product/5.png',
      price: 899,
      link: 'https://www.flipkart.com/clothing-and-accessories/kids-combos-and-costumes/kids-apparel-combos/buliwear~brand/pr?sid=clo,eof,1bp&marketplace=FLIPKART&otracker=product_breadCrumbs_BuliWear+Kids%27+Apparel+Combos',
      labelsize: 'M',
      idealfor: 'Baby Boys and Baby Girls',
      countInStock: 10,
      brand: 'Buli-Wear',
      description:
        'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
    },
    {
      name: 'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
      id: 'itm104',
      size: '0 - 6 Months',
      image: '/assets/media/Product/4.png',
      price: 299,
      link: 'https://www.flipkart.com/clothing-and-accessories/kids-combos-and-costumes/kids-apparel-combos/buliwear~brand/pr?sid=clo,eof,1bp&marketplace=FLIPKART&otracker=product_breadCrumbs_BuliWear+Kids%27+Apparel+Combos',
      labelsize: 'M',
      idealfor: 'Baby Boys and Baby Girls',
      countInStock: 10,
      brand: 'Buli-Wear',
      description:
        'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
    },
    {
      name: 'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
      id: 'itm103',
      size: '0 - 6 Months',
      image: '/assets/media/Product/3.png',
      price: 499,
      link: 'https://www.flipkart.com/clothing-and-accessories/kids-combos-and-costumes/kids-apparel-combos/buliwear~brand/pr?sid=clo,eof,1bp&marketplace=FLIPKART&otracker=product_breadCrumbs_BuliWear+Kids%27+Apparel+Combos',
      labelsize: 'M',
      idealfor: 'Baby Boys and Baby Girls',
      countInStock: 10,
      brand: 'Buli-Wear',
      description:
        'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
    },
    {
      name: 'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
      id: 'itm102',
      size: '0 - 6 Months',
      image: '/assets/media/Product/2.png',
      price: 599,
      link: 'https://www.flipkart.com/clothing-and-accessories/kids-combos-and-costumes/kids-apparel-combos/buliwear~brand/pr?sid=clo,eof,1bp&marketplace=FLIPKART&otracker=product_breadCrumbs_BuliWear+Kids%27+Apparel+Combos',
      labelsize: 'M',
      idealfor: 'Baby Boys and Baby Girls',
      countInStock: 10,
      brand: 'Buli-Wear',
      description:
        'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
    },
    {
      name: 'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
      id: 'itm101',
      size: '0 - 6 Months',
      image: '/assets/media/Product/1.png',
      price: 999,
      link: 'https://www.flipkart.com/clothing-and-accessories/kids-combos-and-costumes/kids-apparel-combos/buliwear~brand/pr?sid=clo,eof,1bp&marketplace=FLIPKART&otracker=product_breadCrumbs_BuliWear+Kids%27+Apparel+Combos',
      labelsize: 'M',
      idealfor: 'Baby Boys and Baby Girls',
      countInStock: 10,
      brand: 'Buli-Wear',
      description:
        'Baby Boys & Baby Girls Casual T-shirt Cap, Mitten, Bootie  (Multicolor)',
    },
  ],
};
export default prodata;
