import { App } from "astal/gtk3"
import style from "./style.css"
import Bar from "./widget/Bar/Bar"
import ControlCenter from "./widget/ControlCenter/ControlCenter"

App.start({
    css: style,
    main() {
        const mainMonitor = App.get_monitors()[0]

        App.get_monitors().map(Bar)
        ControlCenter(mainMonitor)
    }
})
