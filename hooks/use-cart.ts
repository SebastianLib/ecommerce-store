import { create } from "zustand";
import {Product} from '@/types'
import {persist, createJSONStorage} from "zustand/middleware"
import toast from "react-hot-toast";

interface CardStore{
    items: Product[];
    addItem: (item:Product) => void;
    removeItem: (id:string) => void;
    removeAll: () => void;
}

const useCard = create(
    persist<CardStore>((set,get)=>({
        items: [],
        addItem: (data:Product)=>{
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if(existingItem){
                return toast("Item already in cart.")
            }
            set({items: [...get().items, data]});
            toast.success("Item added to cart.")
        },
        removeItem: (id:string) =>{
            set({items:[...get().items.filter(item => item.id !== id)]});
            toast.success("ITem removed from the cart.")
        },
        removeAll: () =>set({items: []})
    }),
    {
      name: 'cart-storage', 
      storage: createJSONStorage(() => localStorage),
    },)
)

export default useCard;