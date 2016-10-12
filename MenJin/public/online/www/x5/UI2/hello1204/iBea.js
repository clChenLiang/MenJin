define(function(require){
	var $ = require("jquery");
	var beacon = navigator.beacon;
	var justep = require("$UI/system/lib/justep");
//	require("$UI/system/lib/cordova/cordova");//
	require("cordova!com.unarin.cordova.beacon");//
	
	var cordova=require("cordova!com.unarin.cordova.beacon");
	var Model = function(){
		this.callParent();
	};

	Model.prototype.button1Click = function(event){
		var name=this.comp('input1').val();
		this.comp('output1').set({value:'hello'+name});
		
		function createBeacon() {
			var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9'; // mandatory
			var identifier = 'beaconAtTheMacBooks'; // mandatory
			var minor = 1000; // optional, defaults to wildcard if left empty
			var major = 5; // optional, defaults to wildcard if left empty

			// throws an error if the parameters are not valid
			var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
			return beaconRegion;   
		}
		var logToDom = function (message) {
			alert(message);
		};


		if(navigator.beacon){
			var delegate = new navigator.locationManager.Delegate();

			delegate.didDetermineStateForRegion = function (pluginResult) {
				logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
				cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
						+ JSON.stringify(pluginResult));
			};
			delegate.didStartMonitoringForRegion = function (pluginResult) {
				console.log('didStartMonitoringForRegion:', pluginResult);
				logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
			};
		}
	};
		
	return Model;
});
		
