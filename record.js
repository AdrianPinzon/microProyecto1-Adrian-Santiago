'use strict';

function addElement() {
    var scrollbox = document.getElementById('scrollbox');

    // Create some element, e.g. div
    var newElement = document.createElement('div');
    newElement.setAttribute('id', "some-id-for-new-element");
    newElement.innerHTML = 'New element has been added!';

    scrollbox.appendChild(newElement);
}

function allStorage() {

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push( key + '=' + localStorage.getItem(key));
    }

    return archive;
}

let storage = allStorage()
for (const element of storage) {
    var scrollbox = document.getElementById('scrollbox');
    var newElement = document.createElement('div');
    newElement.setAttribute('id', "some-id-for-new-element");
    newElement.innerHTML = element;

    scrollbox.appendChild(newElement);
  }
