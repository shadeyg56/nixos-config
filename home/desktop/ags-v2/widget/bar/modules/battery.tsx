import Battery from "gi://AstalBattery"
import { bind, Binding, Variable } from "astal";
import { Gtk } from "astal/gtk3"

const battery = Battery.get_default();

function BatteryIcon() {

    return (
        <icon 
        className="batIcon"
        icon={bind(battery, "percentage").as((percent) =>
            `battery-level-${Math.floor(percent * 100 / 10) * 10}${battery.get_charging() == true ? "-charging" : ""}-symbolic`)}
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