import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import Clock from '../bar/modules/clock.js';

const controlCenter = () => Widget.Revealer({
    transition: 'slide_down',
    revealChild: false,
    connections: [[App, (self, wname, visible) => {
        if (wname === 'controlcenter')
            self.revealChild = visible;
    }]],
    child: Widget.Box({
        children: [Clock()],
    })
});

export default () => Widget.Window({
    name: 'controlcenter',
    popup: true,
    focusable: true,
    anchor: ["top", "right"],
    child: controlCenter(),
})