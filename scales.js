var _ = require('underscore-node')
var dll = require('./doublyLinkedList.js')

var notes = new dll.DoublyLinkedList()

_.each(['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'], function(value) {
	notes.push(value)
})

var Patterns = {}
Patterns.Ionian = [1, 1, 0.5, 1, 1, 1, 0.5]
Patterns.Dorian =  [1, 0.5, 1, 1, 1, 0.5, 1]
Patterns.Phrygian =  [0.5, 1, 1, 1, 0.5, 1, 1]
Patterns.Lydian = [1, 1, 1, 0.5, 1, 1, 0.5]
Patterns.Mixolydian = [1, 1, 0.5, 1, 1, 0.5, 1]
Patterns.Aeolian = [1, 0.5, 1, 1, 0.5, 1, 1]
Patterns.Locrian = [0.5, 1, 1, 0.5, 1, 1, 1]

Patterns.Major = Patterns.Ionian
Patterns.Minor = Patterns.Aeolian

exports.notes = notes
