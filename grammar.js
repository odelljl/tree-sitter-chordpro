/**
 * @file This grammar supports the mark-up for the ChordPro file format.
 * @author Jeff Odell <jeff@odellmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "chordpro",

  conflicts: $ => [
    [$.song_line]
  ],

  rules: {
    // TODO: add the actual grammar rules

    source_file: ($) => repeat(choice($.directive, $.empty_line, $.song_line)),
    empty_line: () => /\r?\n/,
    song_line: ($) => seq(
      repeat1(choice($.chord, $.lyrics_text)),
      optional(/\r?\n/)
    ),
    chord: () => seq("[", /[^\]]+/, "]"),
    lyrics_text: () => /[^{}\[\r\n]+/,
    directive: ($) => choice(
      $.title_directive, 
      $.subtitle_directive,
      $.author_directive, 
      $.artist_directive,
      $.composer_directive,
      $.lyricist_directive,
      $.copyright_directive,
      $.album_directive,
      $.year_directive,
      $.key_directive,
      $.time_directive,
      $.tempo_directive,
      $.capo_directive,
      $.comment_directive,
      $.start_of_chorus_directive,
      $.end_of_chorus_directive,
      $.start_of_verse_directive,
      $.end_of_verse_directive,
      $.start_of_bridge_directive,
      $.end_of_bridge_directive,
      $.start_of_tab_directive,
      $.end_of_tab_directive
    ),
    title_directive: ($) =>
      seq("{", "title", ":", $.one_space, $.directive_text, "}"),
    subtitle_directive: ($) =>
      seq("{", "subtitle", ":", $.one_space, $.directive_text, "}"),
    author_directive: ($) =>
      seq("{", "author", ":", $.one_space, $.directive_text, "}"),
    artist_directive: ($) =>
      seq("{", "artist", ":", $.one_space, $.directive_text, "}"),
    composer_directive: ($) =>
      seq("{", "composer", ":", $.one_space, $.directive_text, "}"),
    lyricist_directive: ($) =>
      seq("{", "lyricist", ":", $.one_space, $.directive_text, "}"),
    copyright_directive: ($) =>
      seq("{", "copyright", ":", $.one_space, $.directive_text, "}"),
    album_directive: ($) =>
      seq("{", "album", ":", $.one_space, $.directive_text, "}"),
    year_directive: ($) =>
      seq("{", "year", ":", $.one_space, $.directive_text, "}"),
    key_directive: ($) =>
      seq("{", "key", ":", $.one_space, $.directive_text, "}"),
    time_directive: ($) =>
      seq("{", "time", ":", $.one_space, $.directive_text, "}"),
    tempo_directive: ($) =>
      seq("{", "tempo", ":", $.one_space, $.directive_text, "}"),
    capo_directive: ($) =>
      seq("{", "capo", ":", $.one_space, $.directive_text, "}"),
    comment_directive: ($) =>
      seq("{", "comment", ":", $.one_space, $.directive_text, "}"),
    start_of_chorus_directive: ($) =>
      choice(
        seq("{", "start_of_chorus", ":", $.one_space, $.directive_text, "}"),
        seq("{", "start_of_chorus", "}")
      ),
    end_of_chorus_directive: () =>
      seq("{", "end_of_chorus", "}"),
    start_of_verse_directive: ($) =>
      choice(
        seq("{", "start_of_verse", ":", $.one_space, $.directive_text, "}"),
        seq("{", "start_of_verse", "}")
      ),
    end_of_verse_directive: () =>
      seq("{", "end_of_verse", "}"),
    start_of_bridge_directive: ($) =>
      choice(
        seq("{", "start_of_bridge", ":", $.one_space, $.directive_text, "}"),
        seq("{", "start_of_bridge", "}")
      ),
    end_of_bridge_directive: () =>
      seq("{", "end_of_bridge", "}"),
    start_of_tab_directive: ($) =>
      choice(
        seq("{", "start_of_tab", ":", $.one_space, $.directive_text, "}"),
        seq("{", "start_of_tab", "}")
      ),
    end_of_tab_directive: () =>
      seq("{", "end_of_tab", "}"),
    directive_text: () => /[^{}]+/,
    one_space: () => /\s/,
  },
});
