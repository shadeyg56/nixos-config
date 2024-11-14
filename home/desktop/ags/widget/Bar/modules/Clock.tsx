import { Variable } from "astal";
import { toggleWindow } from "../../../utils";

const time = Variable("").poll(1000, "date +%H:%M")

export default function Clock() {
    return (
        <button onClick={() => toggleWindow("calendar")}>
            <label className="clock" label={time()}></label>
        </button>
    )
}