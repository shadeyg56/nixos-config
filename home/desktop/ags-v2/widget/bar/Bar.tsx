import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import Clock from "./modules/Clock"
import Workspaces from "./modules/Workspaces"
import FocusedWindow from "./modules/focusedWindow"

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
            <Clock/>
            <box></box>
        </centerbox>
    </window>
}
