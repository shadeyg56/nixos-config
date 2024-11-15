import { Astal, Gtk, Widget, App, Gdk} from "astal/gtk3";
import { bind, Variable } from "astal";
import Header from "./modules/Header";
import Volume from "./modules/Volume";
import BrightnessWidget from "./modules/Brightness";
import { NetworkToggle, WifiMenu } from "./modules/Network";
import BluetoothToggle from "./modules/Bluetooth";
import Governors from "./modules/Governors";

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
        name="controlcenter"
        >
            <Header></Header>
            <box className="sliders-box"
            vertical={true}
            >
                <Volume/>
                <BrightnessWidget/>
            </box>
            {
                Row([Homogeneous([Row([Homogeneous([NetworkToggle(), BluetoothToggle()], true)]), Governors()])])
            }
        </box>
    )
}

export const controlCenterStackWidget = Variable("");

export default function ControlCenter(monitor: Gdk.Monitor) {

    return (
        <window
        name="controlcenter"
        namespace="controlcenter"
        gdkmonitor={monitor}
        anchor={ Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        visible={false}
        application={App}
        >
            <revealer
            transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
            >

                <stack shown={controlCenterStackWidget()}
                transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
                >
                    <MainContainer></MainContainer>
                    <WifiMenu/>

                </stack>
            </revealer>
        </window>
    )
}