import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

const PlayerIcon = (player, { symbolic = true, ...props } = {}) => Widget.Icon({
    ...props,
    class_name: 'player-icon',
}).hook(player, self => {
    const name = `${player.entry}${symbolic ? '-symbolic' : ''}`;
    Utils.lookUpIcon(name)
        ? self.icon = name
        : self.icon = 'emblem-music-symbolic'
});

let current_track = null;

const NowPlaying = (player) => Widget.Revealer({
    transition: 'slide_right',
    revealChild: false,
    child: Widget.Label({
        class_name: 'now-playing',
    }).hook(player, label => label.label = `${player.track_artists.join(', ')} - ${player.track_title}`),
}).hook(player, revealer => {
    if (current_track === player.track_title)
            return;
        
    current_track = player.track_title;
    revealer.reveal_child = true;
    let timeout_track = current_track;
    Utils.timeout(3000, () => {
        if (timeout_track === current_track)
            revealer.reveal_child = false;
    });
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
            NowPlaying(player),
        ]
    })
};

const MediaBox = () => Widget.EventBox({
    onHover: () => App.openWindow('media'),
    onHoverLost: (widget, event) => {
        const [_, x, y] = event.get_coords()
        const w = widget.get_allocation().width;
        const h = widget.get_allocation().height;
        if ((x < 0 && y < h/2)|| (x > w && y < h/2) || y < 5) {
            App.closeWindow('media');
        }
    },
}).hook(Mpris, update, 'notify::players');

export default MediaBox;