import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import Clock from "./modules/Clock"
import Workspaces from "./modules/Workspaces"
import FocusedWindow from "./modules/focusedWindow"
import Volume from "./modules/volume"
import BatteryWidget from "./modules/battery"
import NetworkIndicator from "./modules/Network"
import PowerButton from "./modules/PowerButton"

export default function Bar(gdkmonitor: Gdk.Monitor) {
    return <window
        className="bar"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP
            | Astal.WindowAnchor.LEFT
            | Astal.WindowAnchor.RIGHT}
        margin={6}
        marginBottom={0}
        application={App}>
        <centerbox>
            <box>
                <Workspaces/>
                <FocusedWindow/>
            </box>
            <box>
                <Clock/>
            </box>
            <box halign={Gtk.Align.END}>
                <box className="rightBox">
                    <Volume/>
                    <BatteryWidget/>
                    <NetworkIndicator/>
                    <PowerButton/>
                </box>
            </box>
        </centerbox>
    </window>
}
