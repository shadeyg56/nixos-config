import { Gdk, App, Astal, Gtk }  from "astal/gtk3";
import Calendar from "../objects/Calendar";
import { Variable } from "astal";


function DateAndTime() {

    const date = Variable("").poll(100, ['date', '+%A, %B %d, %Y'])
    const time = Variable("").poll(100, ['date', '+%k:%M:%S'])


    return (
        <box className="date-and-time"
        vertical={true}
        >
            <label className="date"
            label={date()}
            />
            <label className="big-clock"
            label={(time())}
            />
        </box>
    )
}

function CalendarContainer() {
    return (
        <box className="calendar-container" vertical={true}>
            <DateAndTime/>
            <Calendar className="calendar"
            showDayNames={true}
            showDetails={true}
            showHeading={true}
            />
        </box>
    )
}

export default function CalendarWindow(gdkmonitor: Gdk.Monitor) {
    return (
        <window
        name="calendar"
        namespace="calendar"
        gdkmonitor={gdkmonitor}
        anchor={ Astal.WindowAnchor.TOP }
        visible={false}
        application={App}
        >
            <revealer
            transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
            >
                <CalendarContainer/>
            </revealer>
        </window>
    )
}