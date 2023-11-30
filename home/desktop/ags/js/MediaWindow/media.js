import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';

const TrackInfo = (player) => Widget.Box({
    class_name: 'track-info',
    vertical: true,
    children: [
        Widget.Label({
            class_name: 'track-name',
            label: player.trackTitle,
            justification: 'left',
            xalign: 0,
        }),
        Widget.Label({
            class_name: 'artist-name',
            label: player.trackArtists.join(', '),
            justification: 'left',
            xalign: 0,
        }),
    ]
});

const CoverArt = (player) => Widget.Box({
    className: 'cover-art',
    hexpand: false,
    css: `background-image: url("${player.coverPath}");`

});

let current = null;

const update = box => {
    const player = Mpris.getPlayer('spotify') || Mpris.players[0] || null;

    if (!player) {
        current = null;
        return;
    }

    current = player;
    box.children = [Widget.Box({
        vertical: true,
        children: [
            CoverArt(player),
            TrackInfo(player),
        ]
    })];
};

const MediaBox = () => Widget.Box({
    className: 'media-box',
    connections : [[Mpris, update]], 
});

const revealer = () => Widget.Revealer({
    transition: 'slide_down',
    connections: [[App, (self, wname, visible) => {
        if (wname === 'media')
            self.revealChild = visible
        }, 'window-toggled']
    ],
    child: Widget.EventBox({
        child: MediaBox(),
        onHoverLost: () => App.closeWindow('media'),
    }),
});

export default () => Widget.Window({
    name: 'media',
    popup: true,
    focusable: false,
    anchor: ["top"],
    visible: false,
    child: Widget.Box({
        css: 'padding: 1px;',
        child: revealer(),
    }),
})