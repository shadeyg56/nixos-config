import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import { execAsync } from 'resource:///com/github/Aylur/ags/utils.js';

const DateAndTime = () => Widget.Box({ 
    className: 'date-and-time',
    vertical: true,
    children: [
        Widget.Label({
            className: 'date',
        }).poll(1000, self => execAsync(['date', '+%A, %B %d, %Y'])
        .then(date => self.label = date).catch(console.error)),
        Widget.Label({
           className: 'big-clock' 
        }).poll(1000, self => execAsync(['date', '+%k:%M:%S'])
        .then(date => self.label = date).catch(console.error)),
    ]
})

const Cat = () => Widget.EventBox({
    child: Widget.Box({
        className: 'cat',
        css: 'background-image: url("https://cataas.com/cat?height=125&width=250")',

    }),
    on_primary_click: (self) => self.child.css = 'background-image: url("https://cataas.com/cat?height=125&width=250")'

})

const CalendarContainer = () => Widget.Box({
    className: 'calendar-container',
    children: [
        Widget.Box({
            homogeneous: true,
            vertical: true,
            children: [
                DateAndTime(),
                Cat(),
            ],
        }),
        Widget.Calendar({
            className: "calendar",
            showDayNames: true,
            showDetails: true,
            showHeading: true,

        })
    ]
})

const revealer = () => Widget.Revealer({
    transition: 'slide_down',
    reveal_child: true,
    child: CalendarContainer(),
}).hook(App, (self, wname, visible) => {
    if (wname === 'calendar')
        self.revealChild = visible
}, 'window-toggled');

export default () => Widget.Window({
    name: 'calendar',
    anchor: ["top"],
    visible: false,
    child: Widget.Box({
        css: 'padding: 1px;',
        child: revealer(),
    }),
}).keybind("Escape", (self) => App.closeWindow(self.name))