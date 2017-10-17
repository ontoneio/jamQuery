let domElement = function(selector) {
  this.selector = selector || null; // The selector being targeted
  this.element = null; // The actual DOM element  
}

domElement.prototype.eventHandler = {
  events: [], // Array of events & callbacks the element is subscribed to.

bindEvent: function(event, callback, targetElement) {
  // Remove any duplicate event
  this.unbindEvent(event, targetElement);

  // Bind event listener to DOM element
  targetElement.addEventListener(event, callback, false);

  this.events.push({
    type: event,
    event: callback,
    target: targetElement
  }); // Push the new event into our events array.
},

  findEvent: function(event) {
    return this.events.filter(function(evt) {
      return (evt.type === event); // If event type is a match return
    }, event) [0];
  }

  unbindEvent: function(event, targetElement) {
    // Search events
    const foundEvent = this.findEvent(event);

    //remove event listener if found
    if(foundEvent !== undefined) {
      targetElement.removeEventListener(event, foundEvent.event, false);
    }
    
    // Update the events array
    this.events = this.events.filter(function(evt) {
      return (evt.type !== event);      
    }, event)
  }
};



