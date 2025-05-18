/**
 * @file This grammar supports the mark-up for the ChordPro file format.
 * @author Jeff Odell <jeff@odellmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "chordpro",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
