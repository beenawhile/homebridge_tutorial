
"use strict";

// run script in strict module; i.e. not allowing
//  - use of undeclared var
//  - deleting var or obj
//  - deleting function
//  - etc...
//  I think most other languages just don't allow it.
//  JS without strict mode seems just to flexible
// declare variables for easy access to often-used long-named variables

const http = require("http");

let Service, Characteristic;

module.exports = function (homebridge) {
    // Service, Characteristic: homebridge 자체 제공 object
    Service = homebridge.hap.Service
    Characteristic = homebridge.hap.Characteristic
    // add accessory
    // (plugin-name, product-name, accessory-plugin-constructor)
    homebridge.registerAccessory("homebridge-tutorial",
        "SensMan Volume", volume)
}

// constructor
// 엑세서리 하나 정의될 때마다 호출됨
function volume(log, config, api) {
    this.log = log
    this.config = config
    this.api = api

    if (this.config.defaultVolume)
        this.defaultVolume = this.config.defaultVolume
    else
        this.defaultVolume = 10

    this.log("Volume accessory is Created!")
    this.log("defaultValue is " + this.defaultVolume)

    this.bulb = new Service.Lightbulb(this.config.name)
    // 무조건 lightBulb는 무조건 Characteristic.On을 만들어야 함
    // Set up Event Handler for bulb on/off
    this.bulb.getCharacteristic(Characteristic.On)
        // on: event handler 정하기
        .on("get", this.getPower.bind(this))
        .on("set", this.setPower.bind(this))
    this.bulb.getCharacteristic(Characteristic.Brightness)
        .on("get", this.getVolume.bind(this))
        .on("set", this.setVolume.bind(this))

    this.log("all event handler was setup.")
}

// constructor만 호출 되는 것이 아니라 getServices라는 것도 부름
volume.prototype = {
    getServices: function () {
        if (!this.bulb) return []
        this.log("Homekit asked to report service")
        const infoService = new Service.AccessoryInformation()
        infoService.setCharacteristic(Characteristic.Manufacturer,
            "SensMan")
        return [infoService, this.bulb]
    },
    getPower: function (callback) {
        this.log("getPower")

        // // read speaker volume
        // let req = http.get("http://localhost:5000/volume", res => {
        //     let recvData = "";
        //     res.on("data", chunk => { recvData += chunk })
        //     res.on("end", () => {
        //         // recvData contains volume info
        //         let vol = JSON.parse(recvData).volume
        //         this.log("Read from Sonos; volume: " + vol)
        //         this.vol = vol

        //         callback(null, this.vol > 0)
        //     })
        // })
        // req.on("error", err => {
        //     this.log("Error in getPower: " + err.message)
        //     callback(err);
        // })
        // // callback with volume > 0
        callback(null, true)
    },
    setPower: function (on, callback) {
        this.log("setPower " + on)
        callback(null)
    },
    getVolume: function (callback) {
        this.log("getVolume")
        callback(null, this.vol)
    },
    setVolume: function (vol, callback) {
        this.log("setVolume " + vol)
        callback(null)
    }
}