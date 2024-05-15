
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { useSetState, useDebounceEffect } from "ahooks"
import { useEffect, useMemo } from "react";
import createKey from "../utils/createKey";
export default (options) => {
    const { isTag, path, label ,id} = options;
    // 当有动态id时，说明有多开页。没有id时就取url(url在非动态页情况都是唯一的)
    const key = createKey(path,id)

    const [current, setCurrent] = useSetState(isTag ? {
        id,
        key,
        path,
        label,
    } : {});
    useEffect(() => {
        if (!isTag) return
        if (key === current.id) return
        setCurrent({
            id,
            key,
            path,
            label
        })
    }, [key, path])
    return useMemo(() => ([
        current, setCurrent
    ]), [id,key, current])
}