import { useCallback, useMemo } from "react";
import { useState } from "react";
import { useAliveController } from "react-activation";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { useSetState } from "ahooks"
import queryString from "query-string"
import { random as _random } from "radash"
import createKey from "../utils/createKey"
import createFloat from "../utils/createFloat"
export default (options) => {
    const { current, setCurrent, getMaxId } = options;

    const { clear, getCachingNodes } = useAliveController();

    // 点击切换时用
    // key只是拿来刷新或者删除当前激活的组件。
    // const setCurrentId = useCallback((id) => {
    //     return (() => {
    //         setCurrent({
    //             id,
    //             key:_id
    //         })
    //     })
    // }, []);

    const handleRefreshCurrent = () => {
        // 刷新当前只能使用key刷新，并且此key需要绑定在Outlet 不能绑定在keepAlive上
        const componentKey= createFloat(0, 1, [0, 1]);
        console.log(componentKey,"componentKey");
        setCurrent({
            // id: maxId,
            componentKey
        })
    }
    const _clear = () => {
        clear();
        // // 当前激活的缓存无法清空，需要手动刷新key
        handleRefreshCurrent();
    };
    return useMemo(() => ([
        // 将这个暴露出去，作为keepAlive组件唯一id
        // current,
        {
            refreshCurrent: handleRefreshCurrent,
            clear: _clear,
        }
    ]), [current])
}