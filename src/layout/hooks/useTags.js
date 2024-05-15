import { useLocalStorageState, useMemoizedFn } from "ahooks"
import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { max as _max } from "radash"
export default (options) => {
    const {
        current,
        isOpenMore,
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
        defaultValue: Object.keys(current).length ? [current] : []
    });
    useEffect(() => {
        // id=path+多开id
        const is = tags.some(item => item.id === current.id)
        if (is || !Object.keys(current).length ) return
        // 监听current
        // 因为current是监听了url路径
        // 所以这里每次都更新~
        // 但是要注意的是，不能将相同的tag 添加了
        setTags([
            ...tags,
            current
        ])
    }, [current]);
    console.log(tags,"tags");
    const getMaxId = () => Number(_max(tags, (item) => Number(item.id))?.id) || 0;

    const handleNavigate = (route) => {
        const maxId = getMaxId() + 1
        // 需要知道点击的是否是 多开页。
        // 点击的可能是当前，重复点击
        // 点击的可能是非当前
        // 所以在handlePush 手动find。path拿到的router信息🕐是最新的
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
            const route = getCurrentRoutes(path);
            // 优化避免重复点击同一按钮
            if (path === current?.path && !route?.openMore) return
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