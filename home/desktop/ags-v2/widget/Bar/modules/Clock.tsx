import { Variable } from "astal";

const time = Variable("").poll(1000, "date +%H:%M")

export default function Clock() {
    return (
        <button>
            <label className="clock" label={time()}></label>
        </button>
    )
}