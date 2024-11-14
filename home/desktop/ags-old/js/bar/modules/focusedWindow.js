import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';

const focusedTitle = () => Widget.Box({
    className: 'focusedTitle',
    visible: Hyprland.active.client.bind("title")
        .as(title => title ? true : false),
    children: [
        Widget.Label({
            maxWidthChars: 40,
            truncate: 'middle',
            label: Hyprland.active.client.bind("title"),
        }),
    ]
});

export default focusedTitle;