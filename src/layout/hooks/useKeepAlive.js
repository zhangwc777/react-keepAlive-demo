import { useMemo } from "react";
import { useAliveController } from "react-activation";
import { random as _random } from "radash"
import createFloat from "../utils/createFloat"
export default (options) => {
    const { current, setCurrent } = options;

    const { clear } = useAliveController();

    const handleRefreshCurrent = () => {
        // 刷新当前只能使用key刷新，此key不能绑定在keepAlive上
        const componentKey = createFloat(0, 1, [0, 1]);
        setCurrent({
            componentKey
        })
    }
    const _clear = () => {
        clear();
        // // 当前激活的缓存无法清空，需要手动刷新key
        handleRefreshCurrent();
    };
    return useMemo(() => ([
        {
            refreshCurrent: handleRefreshCurrent,
            clear: _clear,
        }
    ]), [current])
}