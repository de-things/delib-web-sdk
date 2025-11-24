## 🐈Install/Usage
Create any TS/JS web project (frontend/backend, I don't mind) and clone `delib.js` into the somewhere. Then create a `DelibDevice` class instance to communicate with your de:things devices based on **[delib](https://github.com/de-things/delib)** serverside.

You can check **[./tests/](./tests)** directory to understand, how frontend calls work, using a local `expressjs` server, emulating delib device handlers.

*SDK is the big word for this file, but it is what it is.*

## 🐈Example code
```js
// Wlan call example:
var device = new DelibDevice("device_ip", "TEST_SECRET"); // constructor(ip, secret);

device.call("example").then(res => {
    console.log(res); // device response
});

// Why WLAN? because device SECRET has been DEFINED in the constructor,
// so this example call sends a POST request to the "http://device_ip:80/example"
// with a SECRET in the request body.
```

```js
// Ethernet call example:
var device = new DelibDevice("device_ip"); // constructor(ip);

device.call("example").then(res => {
    console.log(res); // device response
});

// Why ETHERENET? because device SECRET has NOT been DEFINED in the constructor,
// so this example call sends a POST request to the "http://device_ip:80/"
// with a body content equal to: "!example".
```

Check **[delib](https://github.com/de-things/delib)** to understand requests mechanics more.
