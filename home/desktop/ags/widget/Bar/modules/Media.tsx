import Mpris from "gi://AstalMpris";
import { bind, Variable } from "astal";
import { Widget, Gtk, App } from "astal/gtk3";
import Pango from "gi://Pango";
import { toggleWindow } from "../../../utils";
import Cava from "gi://AstalCava";

const media = Mpris.get_default();
const cava = Cava.get_default();


function PlayerIcon(player: Mpris.Player, { symbolic = true, ...props } = {}) {
    
    const iconName = bind(player, "entry").as((entry) => {
        let name = `${entry}${symbolic ? "-symbolic" : ""}`;
        name = Widget.Icon.lookup_icon(name) ? name : "emblem-music-symbolic";
        return name;
    })
    
    return (
        <icon className="player-icon" icon={iconName}/>
    )
}

function NowPlaying(player: Mpris.Player) {

    const currentTrack = Variable("");

    const setup = (revealer: Widget.Revealer) => {
        bind(player, "title").subscribe((title) => {
            currentTrack.set(title);
            revealer.revealChild = true;
            const timeoutTrack = currentTrack.get();
            setTimeout(() => {
                if (timeoutTrack === currentTrack.get())
                    if (revealer)
                        revealer.revealChild = false;
            }, 3000)
        })
    }

    const titleBind = Variable.derive([bind(player, "title"), bind(player, "artist")], (title, artist) =>
        `${artist} - ${title}`
    )

    return (
        <revealer
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        setup={setup}
        >
            <label className="now-playing"
            ellipsize={Pango.EllipsizeMode.END}
            maxWidthChars={25}
            label={titleBind()}
            />
        </revealer>
    )
}

export default function MediaIndicator() {

    return (
        <eventbox
        onHover={() => toggleWindow("media")}
        onHoverLost={(widget, event) => {
            const x = event.x;
            const y = event.y;
            const w = widget.get_allocation().width;
            const h = widget.get_allocation().height;
            if ((x < 0 && y < h/2)|| (x > w && y < h/2) || y < 5) {
                toggleWindow("media")
            }
        }}
        >
            <box>
                {bind(media, "players").as((players) => {
                    const player = players.find((p) => p.get_entry() === "spotify") ?? players[0];
        
                    if (!player) {
                        cava?.set_active(false);
                        return "";
                    }

                    cava?.set_active(true);

                    return [
                        PlayerIcon(player),
                        NowPlaying(player)
                    ]
                })}
            </box>
         </eventbox>
    )
}