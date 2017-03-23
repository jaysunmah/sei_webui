//this is a local storage which holds the timeout_ids from
//specific ip_addresses.
//motivation for this is for the web ui to detect when a particular
//device has "disconnected", which we will define to be a device
//that hasn't pinged its new location within the next 5 seconds.
//The data structure for this is ip_address -> disconnect_id
timeout_ids = {};

timeoutRemove = function(ip_address) {
  disconnect_id = Meteor.setTimeout(function() {
    Meteor.Coordinates.remove({ip: ip_address});
  }, 5000);
  return disconnect_id;
}
