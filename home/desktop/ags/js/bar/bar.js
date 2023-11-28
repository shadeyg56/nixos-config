import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Clock from './modules/clock.js';
import Workspaces from './modules/workspaces.js';

const Left = () => Widget.Box({
    children: [
        Workspaces(),
    ]
})

const Center = () => Widget.Box({
    children: [
        Clock(),
    ]
})

const Right = () => Widget.Box({

})

const Bar = (monitor = 0) => Widget.Window({
    monitor,
    name: `bar${monitor}`,
    class_name: 'bar',
    anchor: ['top', 'left', 'right'],
    margins: [6, 6, 0, 6],
    exclusivity: 'exclusive',
    layer: "top",
    child: Widget.CenterBox({
        startWidget: Left(),
        centerWidget: Center(),
        endWidget: Right(),
    }),
})

export default Bar;