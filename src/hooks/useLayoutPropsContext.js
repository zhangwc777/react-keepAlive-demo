
import { createContext, useContext } from "react";
export  const LayoutPropsContext = createContext  (null);

export function useLayoutPropsContext() {
    // context：路由源数据
    const context = useContext(LayoutPropsContext);
    if (!context) {
        throw new Error('useLayoutPropsContext must be used within a RouterProvider');
    }

    return context;
}
