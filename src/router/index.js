import { useRoutes, Route, Routes, Router } from "react-router-dom"
import Input1 from "../pages/input1"
import Checkbox from "../pages/checkbox"
import KeepAlive from 'react-activation'
import Layout from "../layout"
import router from "./router"
import {GlobalContext} from "../hooks/useGlobalContext"
// 在 Layout 组件中渲染子路由

export default function Index() {
    let children = []
    const layoutChildren = router.filter(item => {
        if (item.layout === false) return children.push(item) && false;
        return true
    })
    const element = useRoutes(
        [
            {
                path: "/",
                element: <Layout></Layout>,
                children: layoutChildren
            },
        ].concat(children)
    )
    return <GlobalContext.Provider
            value={router}
    >
        {element}
    </GlobalContext.Provider>

}