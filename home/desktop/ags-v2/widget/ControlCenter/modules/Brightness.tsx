import { bind } from "astal";
import Brightness from "../../../objects/Brightness";

const brightness = Brightness.get_default();

function BrightnessSlider() {
    return (
        <slider
        drawValue={false}
        hexpand={true}
        value={bind(brightness, "screen")}
        onDragged={(slider) => brightness.screen = slider.get_value()}
        />
    )
}

export default function BrightnessWidget() {
    return (
        <box
        tooltipText={bind(brightness, "screen").as((v) => 
            `Screen Brightness: ${Math.floor(v * 100)}%`)}
        >
            <button>
                <icon icon="display-brightness-symbolic"/>
            </button>
            <BrightnessSlider/>

        </box>
    )
}