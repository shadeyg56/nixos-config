import Battery from "gi://AstalBattery"
import { bind, Binding, Variable } from "astal";
import { Gtk } from "astal/gtk3"

const battery = Battery.get_default();

function BatteryIcon() {

    const batteryBind = Variable.derive([bind(battery, "percentage"), bind(battery, "charging")
    ], (percent, isCharging) => {
        percent = Math.floor(percent * 10) * 10;
        return `battery-level-${percent}${isCharging && percent !== 100 ? "-charging" : ""}-symbolic`})

    return (
        <icon 
        className="batIcon"
        icon={batteryBind()}
        />
    )
}

interface RevealerProps {
    revealChild: boolean | Binding<boolean>
}

function PercentLabel({revealChild}: RevealerProps) {
    return (
        <revealer
            transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
            revealChild={revealChild}
        >
            <label
            className="batPercent"
            label={bind(battery, "percentage").as((p) => `${Math.round(p*100)}%`)}
            />
        </revealer>
    )
}

export default function BatteryWidget() {

    const revealChild = Variable(false);

    return (
        <button className="battery"
        onHover={() => {revealChild.set(true);}}
        onHoverLost={() => revealChild.set(false)}
        >
            <box>
                <BatteryIcon/>
                <PercentLabel revealChild={bind(revealChild)}/>
            </box>
        </button>
    )
}