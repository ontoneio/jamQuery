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
  },

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

domElement.prototype.on = function(event, callback) {
  this.eventHandler.bindEvent(event, callback, this.element);
}
domElement.prototype.off = function (event, callback) {
  this.eventHandler.unbindEvent(event, this.element);  
}

domElement.prototype.val = function (newVal) {
  return (newVal !== undefined ? this.element.value = newVal :
  this.element.value);  
}

domElement.prototype.append = function(html) {
  this.element.innerHTML = this.element.innerHTML + html;
}

domElement.prototype.prepend = function(html) {
  this.element.innerHTML = html + this.element.innerHTML;
}

domElement.prototype.html = function(html) {
  if(html === undefined) {
    return this.element.innerHTML;
  }
  this.element.innerHTML = html;
};

domElement.prototype.init = function() {
  switch(this.selector[0]) {
      case '<':
      //create element
      let matches = this.selector.match(/<([\w-]*)>/)
      if (matches === null || matches === undefined){
        throw 'Invalid Selector / Node';
        return false;
      }
      let nodeName = matches[0].replace('<', '').replace('>', '');
      this.element = document.createElement(nodeName);
      break;

      default: this.element = document.querySelector(this.selector)
  }
};

$ = function(selector) {
  let element = new domElement(selector); // new domElement
  element.init(); // initialize the domElement
  return element; // return domElement
}