export class Section {
    constructor({ elements, renderer }, selector) {
      this._container = document.querySelector(selector)
      this._renderer = renderer
      this._elements = elements
    }
  
    renderItems() {
        this._elements.forEach(element => {
          this.addItem(this._renderer(element))
        })
    }
  
    addItemPrepend(element) {
      this._container.prepend(element.getNode())
    }
  
    addItemAppend(element) {
      this._container.append(element)
    }
  }