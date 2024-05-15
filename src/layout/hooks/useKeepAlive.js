import { useMemo } from "react";
import { useAliveController } from "react-activation";
import { random as _random } from "radash"
export default (options) => {
    const { current } = options;

    const { clear,refresh } = useAliveController();

    const handleRefreshCurrent = () => {
        refresh(current.key)
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