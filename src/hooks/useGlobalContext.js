
import { createContext, useContext } from "react";
export  const GlobalContext = createContext  ([]);

export function useGlobalContext() {
    // context：路由源数据
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a RouterProvider');
    }

    return context;
}
