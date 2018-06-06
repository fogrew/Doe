
class Doe {
  readonly elements : HTMLElement[]

  constructor (query : string, from? : HTMLElement) {
    if (!from) from = document.documentElement
    this.elements = Doe.query2array(query, from)
    return this
  }
  static query2array (query : string, from? : HTMLElement) {
    if (!from) from = document.documentElement
    return Array.prototype.slice.call(from.querySelectorAll(query))
  }
  each (fn : (element : HTMLElement) => void) : Doe {
    [].forEach.call(this.elements, fn)
    return this
  }
  find (query : string) : HTMLElement[] {
    return Doe.query2array(query, this.first())
  }
  first () : HTMLElement {
    return this.elements[0]
  }
  contains (child : Node | null) : boolean {
    const el = this.first()
    if (child === null) return false
    return el !== child && el.contains(child)
  }
  css (value : string) : Doe {
    return this.each((element : HTMLElement) =>
      element.style.cssText = element.style.cssText + value
    )
  }
  hide () : Doe {
    return this.each((element : HTMLElement) =>
      element.style.display = 'none'
    )
  }
  show () : Doe {
    return this.each((element : HTMLElement) =>
      element.style.display = ''
    )
  }
  attr (attribute : string, value? : string) : Doe {
    return this.each((element : HTMLElement) =>
      value ? element.setAttribute(attribute, value) : element.getAttribute(attribute)
    )
  }
  removeAttr (attribute : string) : Doe {
    return this.each((element : HTMLElement) =>
      element.removeAttribute(attribute)
    )
  }
  on (type: string, listener: EventListener | EventListenerObject, options?: boolean | AddEventListenerOptions) : Doe {
    return this.each((element : HTMLElement) =>
      element.addEventListener(type, listener, options || false)
    )
  }
  one (type: string, listener: EventListener | EventListenerObject, options?: boolean | AddEventListenerOptions) : Doe {
    return this.on(type, listener, Object.assign(options, { once: true }))
  }
  addClass (value : string) : Doe {
    return this.each((element : HTMLElement) =>
      element.classList.add(value)
    )
  }
  toggleClass (value : string) : Doe {
    return this.each((element : HTMLElement) =>
      element.classList.toggle(value)
    )
  }
  removeClass (value : string) : Doe {
    return this.each((element : HTMLElement) =>
      element.classList.remove(value)
    )
  }
  html (value : string) : Doe {
    return this.each((element : HTMLElement) =>
      element.innerHTML = value
    )
  }
  text (value : string) : Doe {
    return this.each((element : HTMLElement) =>
      element.textContent = value
    )
  }
  append (element : Node) {
    return this.first().appendChild(element)
  }
  clone () : Node {
    return this.first().cloneNode(true)
  }
  insertBefore (htmlString : string) : Doe {
    return this.each((element : HTMLElement) =>
      element.insertAdjacentHTML('beforebegin', htmlString)
    )
  }
  insertAfter (htmlString : string) : Doe {
    return this.each((element : HTMLElement) =>
      element.insertAdjacentHTML('afterend', htmlString)
    )
  }
  insertFirst (htmlString : string) : Doe {
    return this.each((element : HTMLElement) =>
      element.insertAdjacentHTML('afterbegin', htmlString)
    )
  }
  insertLast (htmlString : string) : Doe {
    return this.each((element : HTMLElement) =>
      element.insertAdjacentHTML('beforeend', htmlString)
    )
  }
  // empty () : Doe {
  //   return this.each((element : HTMLElement) =>
  //     element.innerHTML = ''
  //   )
  // }
  offset () {
    const rect = this.first().getBoundingClientRect()
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    }
  }
  static ajax (url : string, options: object) {
    return fetch(url)
      .then(response =>
        response.json()
      )
      .then(data => {
        // do stuff with the data
      });
  }
}

const $ = (query : string, from? : HTMLElement) : Doe => new Doe(query, from)

declare global {
  interface Window { $: any; }
}

window.$ = $

export { Doe, $ }
