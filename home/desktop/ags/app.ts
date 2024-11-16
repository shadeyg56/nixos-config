import { App } from "astal/gtk3"
import style from "./style/main.css"
import Bar from "./widget/Bar/Bar"
import ControlCenter from "./widget/ControlCenter/ControlCenter"
import MediaWindow from "./widget/MediaWindow/Media"
import CalendarWindow from "./widget/Calendar"
import OSDWindow from "./widget/OSD"

App.start({
    css: style,
    main() {
        const mainMonitor = App.get_monitors()[0]

        App.get_monitors().map(Bar)
        ControlCenter(mainMonitor)
        MediaWindow(mainMonitor)
        CalendarWindow(mainMonitor)
        OSDWindow(mainMonitor)
    }
})
