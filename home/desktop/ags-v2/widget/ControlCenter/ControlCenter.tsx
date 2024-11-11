import { Astal, Gtk, Widget, App, Gdk} from "astal/gtk3";
import Header from "./modules/Header";

function Row(toggles: Gtk.Widget[]=[], menus: Gtk.Widget[]=[]) {
    return (
        <box vertical={true}>
            <box className="row horizontal">
                {toggles}
            </box>
            {menus}
        </box>
    )
}

function Homogeneous(toggles: Gtk.Widget[], horizontal=false) {
    return (
        <box
        homogeneous={true}
        vertical={!horizontal}
        >
            {toggles}
        </box>
    )
}

function MainContainer() {
    return (
        <box className="controlcenter"
        vertical={true}
        >
            <Header></Header>
        </box>
    )
}

export default function ControlCenter(monitor: Gdk.Monitor) {

    const revealerSetup = (revealer: Widget.Revealer) => {
        App.connect("window-toggled", (_, window) => {
            if (window.name === "controlcenter")
                revealer.revealChild = window.get_visible();
        })
    }

    return (
        <window
        name="controlcenter"
        gdkmonitor={monitor}
        anchor={ Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        visible={false}
        application={App}
        >
            <box css={"padding: 1px;"}>
                <revealer
                transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
                setup={revealerSetup}
                >
                    <MainContainer></MainContainer>
                </revealer>
            </box>
        </window>
    )
}