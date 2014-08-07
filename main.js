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
			_.each(diatonicScale, function(letter) {
				var cssSelector = '[data-note-letter=' + letter + ']'
				$(cssSelector).addClass('active')
			})
		}
		highlightActiveNotes(mode)
	}

	var modeSelectionHandler = function() {
		var mode = $('[name=mode]').val()
		var key = $('[name=key]').val()
		generateNoteView(key, mode)
	}

	generateControls()
	generateNoteView('C', "Ionian")
	$('[name=key], [name=mode]').on('change', modeSelectionHandler)
})

window.scales = scales

