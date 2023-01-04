export interface IProduct {
    id: number,
    title: string,
    description: string,
    price: number | string,
    discountPercentage: number | string,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[]
}