(function (document) {
  imports().forEach(function (link) {
    registerElement(link.id)
    bindElementFromImport(link)
  })

  function registerElement (id) {
    document.registerElement(id, {
      prototype: Object.create(HTMLElement.prototype)
    })
  }

  function bindElementFromImport (link) {
    var $element  = document.querySelector(link.id)
      , $template = link.import.querySelector('template')

    $element.appendChild(
      document.importNode($template.content, true)
    )
  }

  function imports () {
    return Array
      .from( document.querySelectorAll('link[rel="import"]') )
  }
})(document)

console.log('From register-component')
