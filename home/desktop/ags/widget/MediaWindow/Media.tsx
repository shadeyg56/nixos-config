import Mpris from "gi://AstalMpris";
import { App, Astal, Gdk, Gtk, Widget } from "astal/gtk3";
import { bind } from "astal";
import Pango from "gi://Pango";
import MediaControls from "./MediaControls";
import { toggleWindow } from "../../utils";

export interface MediaWidgetProps {
    player: Mpris.Player
    children?: Gtk.Widget[]
}

const media = Mpris.get_default();

function TrackInfo({player}: MediaWidgetProps) {
    return (
        <box className="track-info"
        vertical={true}
        >
            <label className="track-name"
            justify={Gtk.Justification.LEFT}
            xalign={0}
            ellipsize={Pango.EllipsizeMode.END}
            label={bind(player, "title")}
            />
            <label className="artist-name"
            justify={Gtk.Justification.LEFT}
            xalign={0}
            label={bind(player, "artist")}
            />
        </box>
    )
}

function CoverArt({player}: MediaWidgetProps) {
    return (
        <box className="cover-art"
        hexpand={false}
        css={bind(player, "coverArt").as(path => `background-image: url("${path}");`)}
        />
    )
}

function PositionSlider({player}: MediaWidgetProps) {

    const updatePosition = bind(player, "position").as(p => player.length > 0 ? p / player.length : 0)

    const lengthStr = (length: number) => {
        const min = Math.floor(length / 60);
        const sec = Math.floor(length % 60);
        const sec0 = sec < 10 ? '0' : '';
        return `${min}:${sec0}${sec}`;
    }

    return (
        <box vertical={true}>
            <slider className="position-slider"
            drawValue={false}
            hexpand={true}
            onDragged={({value}) => {player.position = player.length*value}}
            value={(bind(updatePosition))}
            />
            <box className="position-label"
            hexpand={true}
            >
                <label
                label={bind(player, "position").as((position) => lengthStr(position))}
                halign={Gtk.Align.START}
                hexpand={true}
                />
                <label
                label={bind(player, "length").as((length => lengthStr(length)))}
                halign={Gtk.Align.END}
                hexpand={true}
               />
            </box>
            
        </box>
    )
}

function MediaContainer() {
    const update = bind(media, "players").as((players) => {
        const player = players.find((p) => p.get_entry() === "spotify") ?? players[0];
        
        if (!player) {
            return null;
        }

        return (
            <box className="media-box" vertical={true}>
                <CoverArt player={player}/>
                <TrackInfo player={player}/>
                <PositionSlider player={player}/>
                <MediaControls player={player}/>
            </box>
        )
    })

    return update;
}

export default function MediaWindow(gdkmonitor: Gdk.Monitor) {

    const handleHoverLost = (widget: Widget.EventBox, event: Astal.HoverEvent) => {
        const x = Math.round(event.x)
        const y = Math.round(event.y)
        const w = widget.get_allocation().width - 15;
        const h = widget.get_allocation().height - 15;
        if (x <= 15 || x >= w || y <= 0 || y >= h) {
            toggleWindow("media")
        }
    }

    return (
        <window
        name="media"
        anchor={Astal.WindowAnchor.TOP}
        visible={false}
        gdkmonitor={gdkmonitor}
        application={App}
        namespace="media"
        >
            <revealer
            revealChild={false}
            transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
            >
                <eventbox
                onHoverLost={handleHoverLost}
                >
                    {MediaContainer()}
                </eventbox>
            </revealer>
        </window>
    )
}