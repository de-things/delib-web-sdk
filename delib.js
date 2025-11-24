/**
 * Class to handle a delib device instance.
 */
class DelibDevice {
    constructor(ip, secret = null) {
        this.ip = ip;
        this.secret = secret;
    }
    /**
     * 
     * @param {*} cmd string command to send to the delib device.
     * @returns Device response as `text/plain` string.
     */
    async call(cmd) {
        var response = "";

        if (this.secret != null) { 
            // send req to the wlan handler
            // delib devices has url paths for the wlan requests, 
            // so `cmd` here is the handler path, like:
            // http://1.2.3.4:80/on <- `on` handler path
            // http://1.2.3.4:80/off <- `off` handler path
            // http://1.2.3.4:80/anything_else <- `anything_else` handler path
            await fetch(`http://${this.ip}:80/${cmd}`, { method: "POST", body: this.secret })
            .then(res => res.text()).then(data => {
                response = data; // save a wlan handler response
            });
        }
        else { 
            // send req to the ethernet handler
            // delib devices handle ethernet requests like commands with '!' in the beggining:
            // !on, !off, !anything_else
            // so sender specifies, which "command" stands after '!' char.
            await fetch(`http://${this.ip}:80/`, { method: "POST", body: `!${cmd}` })
            .then(res => res.text()).then(data => {
                response = data; // save ethernet response
            });
        }

        return response;
    }
}