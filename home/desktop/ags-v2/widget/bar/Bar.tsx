import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable } from "astal"
import Clock from "./modules/Clock"

const time = Variable("").poll(1000, "date")

export default function Bar(gdkmonitor: Gdk.Monitor) {
    return <window
        className="Bar"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP
            | Astal.WindowAnchor.LEFT
            | Astal.WindowAnchor.RIGHT}
        application={App}>
        <centerbox>
            <box></box>
            <Clock/>
            <box></box>
        </centerbox>
    </window>
}
