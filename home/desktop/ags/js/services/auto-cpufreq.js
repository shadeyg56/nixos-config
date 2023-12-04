import Service from 'resource:///com/github/Aylur/ags/service.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

class auto_cpufreqService extends Service {

    static {
        Service.register(
            this,
            {},
            {
                'governor': ['string', 'r']
            }
        );
    }

    #governor = 'Default';

    setGovernor(governor) {
        if (governor == 'Default') {
            governor = 'reset'
        }
        Utils.execAsync(`pkexec auto-cpufreq --force=${governor.toLowerCase()}`)
            .then(() => {
                this.#governor = governor;
                this.changed('governor');
            })
            .catch(console.error);
    }

    constructor() {
        super();
        Utils.execAsync('auto-cpufreq --get-state')
            .then((governor) => {
                this.#governor = governor;
                this.changed('governor');
            })
            .catch(console.error);
    }

    get governor() { return this.#governor; }

};

export default new auto_cpufreqService;