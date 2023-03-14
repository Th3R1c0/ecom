
import {useRouter } from 'next/router'
import SingleProduct from '../../components/Product'
const Product = () => {
    const router = useRouter()
    const { id } = router.query
    return (
         <SingleProduct />
    )
}

export default Product;