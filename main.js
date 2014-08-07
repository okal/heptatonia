var scales = require('./scales.js')
var _ = require('underscore-node')
var $ = require('jquery')
var Handlebars = require('handlebars')

$(function() {
	var generateControls = function() {
		var keySelectorTemplate = Handlebars.compile($('#key-selector-template').html())
		var modeSelectorTemplate = Handlebars.compile($('#mode-selector-template').html())
		$('[name=key]').html(
			keySelectorTemplate({keys: scales.generateChromaticScale('C')})
		)
		$('[name=mode]').html(
			modeSelectorTemplate({modes: Object.keys(scales.ModePatterns)})
		)
	}

	var generateNoteView = function(key, mode) {
		var noteTemplate = Handlebars.compile($('#note-template').html())
		$('#notes-container').html(
			noteTemplate({notes: scales.generateChromaticScale(key)})
		)
		var highlightActiveNotes = function(mode) {
			$('.note').removeClass('active')
			var diatonicScale = scales.generateDiatonicScale(key, mode)
			console.log(diatonicScale)
			_.each(diatonicScale, function(letter) {
				var cssSelector = '[data-note-letter=' + letter + ']'
				$(cssSelector).addClass('active')
			})
		}
		highlightActiveNotes(mode)
	}

	generateControls()
	generateNoteView('C', "Ionian")
})
window.scales = scales

