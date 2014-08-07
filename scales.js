var _ = require('underscore-node')
var dll = require('./doublyLinkedList.js')

var notes = new dll.DoublyLinkedList()

_.each(['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'], function(value) {
	notes.push(value)
})

exports.notes = notes
