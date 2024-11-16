import Wp from "gi://AstalWp";
import { bind } from "astal";
import { Widget } from "astal/gtk3";
import { controlCenterStackWidget } from "../ControlCenter";

const audio = Wp.get_default()!.audio;


function VolumeSlider() {
    return (
        <slider
        drawValue={false}
        hexpand={true}
        onDragged={(slider) => audio?.defaultSpeaker.set_volume(slider.get_value())}
        value={bind(audio.get_default_speaker()!, "volume")}
        />
    )
}

function VolumeIcon() {
    const volumeThresholds = [101, 67, 34, 1, 0];

    const setupStack = (stack: Widget.Stack) => {
        if (!audio)
            return
        audio.get_default_speaker()?.connect("notify", ((speaker) => {
            if (speaker.get_mute()) {
                stack.shown = "0";
                return;
            }

            stack.shown = volumeThresholds.find((threshold) => threshold <= speaker.volume * 100)!.toString();
        }))
    }


    return (
        <box>
            <stack setup={(setupStack)}>
                <icon name="101" icon="audio-volume-overamplified-symbolic"/>
                <icon name="67" icon="audio-volume-high-symbolic"/>
                <icon name="34" icon="audio-volume-medium-symbolic"/>
                <icon name="1" icon="audio-volume-low-symbolic"/>
                <icon name="0" icon="audio-volume-muted-symbolic"/>
            </stack>
        </box>
    )
}

export default function Volume() {
    return (
        <box>
            <button
            tooltipText={bind(audio.get_default_speaker()!, "volume").as(v => `Volume: ${Math.floor(v * 100)}%`)}
            onClick={() => controlCenterStackWidget.set("audio")}
            >
                <VolumeIcon/>
            </button>
            <VolumeSlider/>
        </box>
    )
}