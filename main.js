var _ = require('underscore-node')
var dll = require('./doublyLinkedList.js')

var chromaticScale = new dll.DoublyLinkedList()

_.each(['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'], function(value) {
	chromaticScale.push(value)
})

console.log(chromaticScale)
