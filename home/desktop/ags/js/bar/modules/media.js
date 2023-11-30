import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

const PlayerIcon = (player, { symbolic = true, ...props } = {}) => Widget.Icon({
    ...props,
    class_name: 'player-icon',
    connections: [[player, icon => {
        const name = `${player.entry}${symbolic ? '-symbolic' : ''}`;
        Utils.lookUpIcon(name)
            ? icon.icon = name
            : icon.icon = 'emblem-music-symbolic'
    }]],
});

let current = null;

const update = box => {
    const player = Mpris.getPlayer('spotify') || Mpris.players[0] || null;
    box.visible = !!player;

    if (!player) {
        current = null;
        return;
    }

    if (current === player)
        return;

    current = player;
    box.child = Widget.Box({
        children: [
            PlayerIcon(player),
        ]
    })
};


const MediaBox = () => Widget.EventBox({
    connections: [[Mpris, update, 'notify::players']],
    onHover: () => App.openWindow('media'),
    onHoverLost: (widget, event) => {
        const [_, x, y] = event.get_coords()
        const w = widget.get_allocation().width;
        const h = widget.get_allocation().height;
        if ((x < 0 && y < h/2)|| x > w || y < 5) {
            App.closeWindow('media');
        }
    },
});

export default MediaBox;