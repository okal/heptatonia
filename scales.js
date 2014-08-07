var _ = require('underscore-node')
var dll = require('./doublyLinkedList.js')

var notes = new dll.DoublyLinkedList()

_.each(['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'], function(value) {
	notes.push(value)
})

var ModePatterns = {}
ModePatterns.Ionian = [1, 1, 0.5, 1, 1, 1, 0.5]
ModePatterns.Dorian =  [1, 0.5, 1, 1, 1, 0.5, 1]
ModePatterns.Phrygian =  [0.5, 1, 1, 1, 0.5, 1, 1]
ModePatterns.Lydian = [1, 1, 1, 0.5, 1, 1, 0.5]
ModePatterns.Mixolydian = [1, 1, 0.5, 1, 1, 0.5, 1]
ModePatterns.Aeolian = [1, 0.5, 1, 1, 0.5, 1, 1]
ModePatterns.Locrian = [0.5, 1, 1, 0.5, 1, 1, 1]

ModePatterns.Major = ModePatterns.Ionian
ModePatterns.Minor = ModePatterns.Aeolian

var generateChromaticScale = function(key) {
	var chromaticScale = []
	var startIndex = notes.getStartPosition(key)
	var range = _.range(startIndex, notes.size + startIndex)
	_.each(range, function(index) {
		chromaticScale.push(notes.getAt(index).value)
	})
	return chromaticScale
}

var generateDiatonicScale = function(key, modeName) {
	var pattern = ModePatterns[modeName]
	var chromaticScale = generateChromaticScale(key)
	var getNote = function(index) {
		if(index == 0) { return chromaticScale[0] }
		var intervalIndex = index - 1
		var chromaticIndex = _.reduce(
			_.map(pattern.slice(0, intervalIndex + 1), function(value) { return value / 0.5 }),
			function(memo, num) { return memo + num },
			0)
		return chromaticScale[chromaticIndex]
	}
	var activeNotes = _.map(_.range(8), function(index) {
		if(index ==  7) { return key }
		return getNote(index)
	})
	return activeNotes
}

console.log(generateDiatonicScale("D", "Ionian"))
console.log(generateDiatonicScale("C", "Major"))
exports.Patterns = ModePatterns
exports.notes = notes

