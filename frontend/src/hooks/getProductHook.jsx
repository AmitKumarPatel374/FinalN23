import { useQuery } from '@tanstack/react-query'
import { getProductApiByCategory } from '../apis/getProductApiByCategory'

export const fetchProductDataHook=(data)=>{
    return useQuery({
        queryKey:["ladies products"],
        queryFn:()=>getProductApiByCategory(data),
        staleTime:Infinity
    })
}