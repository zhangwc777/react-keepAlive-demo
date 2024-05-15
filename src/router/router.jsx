import Input1 from "../pages/input1"
import Checkbox from "../pages/checkbox"
import withKeepAlive from "../hoc/withKeepAlive"
const WInput = withKeepAlive(Input1);
const WCheckbox = withKeepAlive(Checkbox);
export default [
    {
        path: "/input",
        element: <WInput />,
        openMore: true,
        label: "输入框",
        tag: true,
        keepAlive:true
        // layout:false
    },
    {
        path: "/checkbox",
        element: <WCheckbox />,
        label: "复选框",
        tag: true,
        keepAlive:true

        // layout:false
    },
]