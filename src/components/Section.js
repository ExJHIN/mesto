export class Section {
    constructor({ elements, renderer }, selector) {
      this._container = document.querySelector(selector)
      this._renderer = renderer
      this._elements = elements
    }
  
    renderItems() {
        this._elements.forEach(element => {
          this.addItem(this._renderer(element.getNode()));             
          this._container.append(element.getNode());
        })
        
    }
  
    addItemPrepend(element) {
      this._container.prepend(element)
    }
  
    addItemAppend(element) {
      this._container.append(element);
    }
  }