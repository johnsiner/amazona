import bcrypt from 'bcryptjs'

const data = {
    users: [{
            name: "Johnson",
            email: "admin@example.com",
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: "Basir",
            email: "user@example.com",
            password: bcrypt.hashSync('123456'),
            isAdmin: false
        }
    ],

    products: [{
            // _id: '1',
            name: 'Nike Slim Shirt',
            slug: 'nike-slim-shirt',
            category: 'shirts',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality shirt'
        },
        {
            // _id: '2',
            name: 'Adidas Fit Shirt',
            slug: 'adidas-fit-shirt',
            category: 'shirts',
            image: '/images/p2.jpg',
            price: 250,
            countInStock: 0,
            brand: 'Adidas',
            rating: 4.0,
            numReviews: 10,
            description: 'high quality product'
        },
        {
            // _id: '3',
            name: 'Nike slim Pant',
            slug: 'nike-slim-pant',
            category: 'pants',
            image: '/images/p3.jpg',
            price: 35,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'high quality product'
        },
        {
            // _id: '4',
            name: 'Adidas slim Pant',
            slug: 'adidas-slim-pant',
            category: 'pants',
            image: '/images/p4.jpg',
            price: 65,
            countInStock: 5,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product'
        },
    ]
}

export default data;