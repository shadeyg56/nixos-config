import { bind } from "astal";
import Autocpufreq from "../../../services/Autocpufreq";

interface GovernorButtonProps {
    name: string,
    icon: string
}

const auto_cpufreq = Autocpufreq.get_default();

function GovernorButton({name, icon}: GovernorButtonProps) {
    
    const activeBind = bind(auto_cpufreq, "governor")
        .as((governor) => governor.toLowerCase() === name.toLowerCase())
    
    return (
        <button className={bind(activeBind).as((active) => "governor-button" + (active ? " active" : ""))}
        onClick={() => auto_cpufreq.governor = (activeBind.get() ? "Default" : name)}
        >
            <box>
                <icon icon={icon}/>
                <label label={name}/>
            </box>
        </button>
    )
}

export default function Governors() {
    return (
        <box className="toggle-button"
        homogeneous={true}
        >  
            <GovernorButton name="Powersave"
            icon="power-profile-power-saver-symbolic"
            />
            <GovernorButton name="Performance"
            icon="power-profile-performance-symbolic"
            />
        </box>
    )
}

