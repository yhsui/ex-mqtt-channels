var mqtt = require('mqtt');
var client = {};
var exercise = {};
exercise.channelsReceived = [];

// We have devices connected to a broker publishing
// data. Each device may publish any data in topics
// such as:
// device/loganWeather/temperature
// device/loganWeather/pressure
// device/MITWeather/temperature
// device/MITWeather/pressure
// device/muddyCharles/soundLevel
// device/muddyCharles/lightLevel
// device/muddyCharles/temperature

exercise.ConnectToServer = function(address){
    client = mqtt.connect(address);
    exercise.client = client;
    // Connect to the MQTT broker
};

exercise.SubscribeToAllSensorData = function(sensor){
    exercise.client.subscribe('device/#');
    // Subscribe to sensor data from all
    // devices
};

exercise.SubscribeToTemperatureDataOnly = function(){
    // Subscribe to sensor data from only
    // devices which report temperature
    // data
    exercise.client.subscribe('device/+/temperature');
};

exercise.LogChannelsReceived = function(){
    exercise.client.on('message',function(channel,message){
       exercise.channelsReceived.push(channel);
    });
    // Store the channel used for any
    // incoming message in the
    // exercise.channelsReceived array
};

exercise.Disconnect = function(){
    client.end();
    // Disconnect the client
};

module.exports = exercise;
