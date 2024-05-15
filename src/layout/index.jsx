import { Outlet, NavLink, useSearchParams, useParams, useNavigate, useOutlet } from "react-router-dom";
import { useState, useRef, cloneElement, useMemo } from "react"
import KeepAlive, { useAliveController } from "react-activation"
import useKeepAlive from "./hooks/useKeepAlive"
import useCurrent from "./hooks/useCurrent"
import useTags from "./hooks/useTags"
import { LayoutPropsContext } from "../hooks/useLayoutPropsContext"
const left = [
    {
        label: "input",
        path: "/input",
        isOpenMore: true
    },
    {
        label: "checkbox",
        path: "/checkbox"
    },
]
export default () => {
    const el = useOutlet();
    // 如果路由未命中则为null
    // 也不知道下面的结构是否稳定
    const route = el?.props?.children?.props?.match?.route;
    const [searchParams] = useSearchParams();

    const id = searchParams.get("id");
    const {
        tag,
        openMore,
        path,
        label,
        keepAlive
    } = route || {}
    const isTag = tag !== false;
    const isOpenMore = openMore === true;
    const isKeepAlive = keepAlive !== false
    console.log(openMore, isOpenMore, "isOpenMore");
    // current 是利用effect监听url 自动设置current
    const [current, setCurrent] = useCurrent({ isTag, path, label, id });
    const [tags, { pushTag, getMaxId }] = useTags({ current, isOpenMore, id })

    const [{
        refreshCurrent,
        clear
    }] = useKeepAlive({
        setCurrent,
        getMaxId,
        current
    })

    const tagsNode = tags?.map(item => <NavLink
        key={item.key}
        to={item.path + (item.id ? `?id=${item.id}` : "")}
        style={{
            color: current.key === item.key ? "red" : "#000"
        }}
    >
        {item.label}
    </NavLink>
    );
    const side = left.map(item => {
        return <div key={item.path}>
            <button onClick={pushTag(item.path)}>
                {item.label}
            </button>
        </div>
    });
    const layoutProps = useMemo(() => ({ current, isKeepAlive }), [current, isKeepAlive])
    return <div
        style={{ display: "flex" }}
    >
        <div className="left">
            {side}
        </div>
        <div className="right">
            <>
                <button
                    onClick={refreshCurrent}
                >
                    清空当前缓存
                </button>
                <button
                    onClick={clear}
                >
                    清空全部缓存
                </button>
            </>
            <header
                style={{ display: "flex", columnGap: 10 }}
            >
                {tagsNode}
            </header>
            <LayoutPropsContext.Provider
                value={layoutProps}
            >
                {el}
            </LayoutPropsContext.Provider>
        </div>
    </div>
}