import Battery from "gi://AstalBattery"
import { bind, execAsync, Variable } from "astal";
import { Gtk } from "astal/gtk3"
import { uptime } from "../../../utils";

function BatteryProgress() {

    const battery = Battery.get_default();

    const labelOverlay = <label
        label={bind(battery, "percentage").as(p => `${p*100}%`)}
    />

    return (
        <box className="battery-progress"
        vexpand={true}
        hexpand={true}
        visible={bind(battery, "isPresent")}
        >
         <overlay
         vexpand={true}
         overlays={[labelOverlay]}
         >
            <levelbar
            hexpand={true}
            vexpand={true}
            value={bind(battery, "percentage")}
            />
         </overlay>
        </box>
    )
}


export default function Header() {
    return (
        <box className="header horizontal">
            <box className="system-box"
            vertical={true}
            hexpand={true}
            >
                <box>
                    <label className="uptime"
                    hexpand={false}
                    valign={Gtk.Align.CENTER}
                    label={uptime().as((uptime) => `uptime: ${uptime}`)}
                    />
                    <button
                    valign={Gtk.Align.CENTER}
                    >
                        <icon icon="system-lock-screen-symbolic"/>
                    </button>
                    <button
                    valign={Gtk.Align.CENTER}
                    onClick={() => execAsync(["adios", "--systemd"])}
                    >
                        <icon icon="system-shutdown-symbolic"/>
                    </button>
                </box>
                <BatteryProgress/>
            </box>
        </box>
    )
}