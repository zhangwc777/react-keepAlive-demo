import { useLocalStorageState, useMemoizedFn } from "ahooks"
import { useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { max as _max } from "radash"
export default (options) => {
    const {
        current,
        isTag,
        isOpenMore,
        id,
    } = options;
    const routes = useGlobalContext();
    const getCurrentRoutes = (path) => {
        // routes会是一个树形结构
        // 如果需要面包屑，还需要保存routes中的属性结构
        return routes.find(item => item.path === path)
    }
    const navigate = useNavigate();
    const [tags, setTags] = useLocalStorageState("tags", {
        // defaultValue 应该是当前current。或者空数组
        // 如果是已有tags，并且是直接输入url呢
        defaultValue: current ? [current] : []
    });

    useEffect(() => {
        // id=path+多开id
        const is = tags.some(item => item.id === current.id)
        if (is) return
        // 监听current
        // 因为current是监听了url路径
        // 所以这里每次都更新~
        // 但是要注意的是，不能将相同的tag 添加了
        setTags([
            ...tags,
            current
        ])
    }, [current])
    console.log(tags, "tags", isOpenMore);
    const getMaxId = () =>parseInt( _max(tags, (item) => item.id)?.id)||0;

    const handleNavigate = (route) => {
        // 需要知道点击的是否是 多开页。
        // 点击的可能是当前，重复点击
        // 点击的可能是非当前
        // console.log('%c ======>>>>>>>>', 'color:orange;', isOpenMore, path, 35, current)
        const maxId = getMaxId()+1
        console.log('%c ======>>>>>>>>','color:orange;',maxId,"maxId")
        const _path = route.path + (route.openMore ? `?id=${maxId}` : "")
        navigate(_path)
    }
    // 点击tag切换使用,需要用到setCurrent
    const handleSwitch = useMemoizedFn((item) => {
        navigate(current.path)
    });
    // 点击侧边栏调用，需要用到setCurrent。push tag
    // 点击时，还需知道当前路由是否是多开路由
    const handlePush = (path) => {
        return () => {
            // 优化避免重复点击同一按钮
            const route = getCurrentRoutes(path);
            if (path === current.path && !route.openMore) return
            if (!route) return
            handleNavigate(route)
        }
    }
    return useMemo(() => ([
        tags, {
            switchTag: handleSwitch,
            pushTag: handlePush,
            getMaxId
        }
    ]), [tags, current, isOpenMore, routes])
}