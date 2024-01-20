const create1 = await User.create(
    {
        id: uuid(),
        fullName: 'duong ba xinh',
        email: 'xinh@gmail.com',
        password: '1234567'
    }
);
const create2 = await Product.create(
    {
        id: '7ebb801c-5542-454e-a5s2-4f1ffe3e8b1f',
        product_name: 'product_01',
        product_des: 'description product_01',
        product_price: 200000,
        product_thumbnail: 'https://res.cloudinary.com/dwu92ycra/image/upload/v1702707953/Gym-app/t%E1%BA%A3i_xu%E1%BB%91ng_dzgzcn.jpg',
        product_categoryId: '7ebb801c-5542-434e-a5f2-4f1ffe3e8b1e',
        images: [{
            id: '7ebb801c-5542-434e-a5f6-4f1ffe3e8b1f',
            url: "https://res.cloudinary.com/dwu92ycra/image/upload/v1702707953/Gym-app/t%E1%BA%A3i_xu%E1%BB%91ng_dzgzcn.jpg"
        },
        {
            id: '7ebb841c-5542-414e-a5f6-4f1ffe3e8b1f',
            url: "https://res.cloudinary.com/dwu92ycra/image/upload/v1702707953/Gym-app/t%E1%BA%A3i_xu%E1%BB%91ng_dzgzcn.jpg"
        }
        ],
    },
    {
        include: [{ model: Image, as: 'images' }]
    }
);
const create = await Category.create(
    {
        id: uuid(),
        category_name: 'category_01',
        category_des: 'description category_01'
    }
)
const getcreate = await Image.findAll({

    include: [{
        model: Product,
        attributes: ['product_name', 'product_price', 'product_categoryId'],
        as: 'products'
    }]
})

// await Promise.all(
//     categories.map(async (category) => {
//         await Category.create({
//             id: uuid(),
//             category_name: category.category_name,
//             category_des: category.category_des
//         })
//     })
// )
// await Promise.all(
//     products.map(async (
//         { product_name,
//             product_des,
//             product_price,
//             product_thumbnail,
//             product_type,
//             product_measure,
//             product_material,
//             categoryId,
//             product_state,
//             product_image }) => {
//         await await Product.create(
//             {
//                 id: uuid(),
//                 product_name,
//                 product_des,
//                 product_price,
//                 product_thumbnail,
//                 product_type,
//                 product_measure,
//                 product_material,
//                 categoryId,
//                 product_state,
//                 images: handleFileUpload(product_image)
//             },
//             { include: [{ model: Image, as: 'images' }] }
//         )
//     })
// )