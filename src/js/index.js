import Reveal from 'reveal.js';
import 'reveal.js/lib/js/head.min.js';

import 'reveal.js/css/reveal.css';
import 'reveal.js/css/theme/night.css';
import '../style/main.css';

//notes
import Notes from 'reveal.js/plugin/notes/notes.js';
import 'reveal.js/plugin/notes/notes.html';

import marked from 'reveal.js/plugin/markdown/marked.js';
import markdown from 'reveal.js/plugin/markdown/markdown.js';

var highlightLines = function() {
    var elements = document.querySelectorAll('[data-highlight]');
    elements.forEach(function(element) {
        var lines = element.getAttribute('data-highlight').split(','),
            lineElements = element.querySelectorAll('.line');
        lines.forEach( function(line) {
            lineElements[line].classList.add('highlight');
        })
    })
}

window.Reveal = Reveal;

Reveal.initialize({
	controls: false,
	progress: false,
	history: true,
	center: true,
	transition: 'convex',
	dependencies: [
        { src: Notes, async: true },
        { src: marked, condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: markdown, condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
	]
});

Reveal.addEventListener('ready', function() {
    require.ensure([], function() {
        window.hljs = require( 'highlight.js/lib/highlight.js' );
        window.hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
        window.hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
        window.hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
        window.hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
        window.hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
        require( 'highlight.js/styles/tomorrow-night.css' );
        require( 'imports-loader?this=>window!reveal-code-focus' );

        RevealCodeFocus();
        highlightLines();
    })
})

//timescale preview
document.addEventListener('keydown', function(e){
    if(e.keyCode === 84) {
        var interval = setInterval(function(){
            Reveal.next();
            if( Reveal.isLastSlide() ) {
                clearInterval(interval);
                Reveal.slide(0)
            }
        }, 50)
    }
})
