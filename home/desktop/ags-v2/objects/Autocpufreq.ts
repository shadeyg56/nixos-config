import { GObject, register, property } from "astal/gobject";
import { execAsync, monitorFile } from "astal";

@register({GTypeName: "Auto-cpufreq"})
class Autocpufreq extends GObject.Object {

    static instance: Autocpufreq;
    static get_default() {
        if (!this.instance)
            this.instance = new Autocpufreq();

        return this.instance;
    }

    #governor = 'Default';

    @property(String)
    get governor() { return this.#governor; }

    set governor(governor) {
        if (governor == 'Default') {
            governor = 'reset'
        }
        execAsync(`pkexec auto-cpufreq --force=${governor.toLowerCase()}`)
            .then(() => {
                this.#governor = governor;
                this.notify('governor');
            })
            .catch(console.error);
    }

    constructor() {
        super();
        const governor_file = '/sys/devices/system/cpu/cpu0/cpufreq/scaling_governor';
        monitorFile(governor_file, () => this.#onChange());
        
        this.#onChange();
    }

    #onChange() {
        execAsync('auto-cpufreq --get-state')
            .then((governor) => {
                this.#governor = governor;
                this.notify('governor');
            })
            .catch(console.error);
    }

};

export default Autocpufreq;