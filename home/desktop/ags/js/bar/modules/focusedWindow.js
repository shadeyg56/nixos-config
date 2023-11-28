import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';

const focusedTitle = () => Widget.Box({
    className: 'focusedTitle',
    binds: [
        ['visible', Hyprland.active.client, 'title', title => title ? true : false],
    ],
    children: [
        Widget.Label({
            binds: [
                ['label', Hyprland.active.client, 'title'],
            ],
        }),
    ]
});

export default focusedTitle;