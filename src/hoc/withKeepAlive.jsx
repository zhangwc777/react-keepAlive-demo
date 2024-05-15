import React, { useMemo } from 'react';
import KeepAlive from 'react-activation';
import { useLayoutPropsContext } from "../hooks/useLayoutPropsContext"
export default (WrappedComponent) => {
    const WithKeepAlive = () => {
        // 需要使用context来获取当前是否是keepAlive了
        const { isKeepAlive, current } = useLayoutPropsContext();
        const Wrapped = useMemo(() => {
            return isKeepAlive ? KeepAlive : React.Fragment;
        }, [isKeepAlive]);
        console.log(current,"componentKey");
        return (
            <Wrapped
                name={current?.key}
                // 添加
                // cacheKey={current?.key}
                id={current.key}
            >
                <WrappedComponent key={current.componentKey}/>
            </Wrapped>
        );
    };

    return WithKeepAlive;
};
