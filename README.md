Unhyphenator is a JavaScript library that strips soft hyphens when you
copy and paste text. (Actually, it can transform the copy-pasted text
in arbitrary ways, but unhyphenation is what it is designed for.)

Unhyphenator can be used with server-side hyphenation, or any
client-side JavaScript hyphenation library (such as [Hypher][]).

Unhyphenator is based on the equivalent functionality from
[Hyphenator.js][hyphenator], which in turn derives from
[Sweet Justice][justice].

## Usage

Obviously, include [unhyphenator.js](unhyphenator.js).

For unhyphenation only:

    var u = new Unhyphenator();
    u.start() // To activate the handler
    u.stop()  // To deactivate the handler

If you want to do something else, instantiate the new unhyphenator
with a callback of one argument:

    // Convert all copy-pasted text to uppercase.
    var u = new Hyphenator(function (s) { return s.toUpperCase(); })
    u.start()

At the moment there is no provision for multiple unhyphenators.

[hyphenator]: https://code.google.com/p/hyphenator/
[justice]: https://github.com/aristus/sweet-justice
[Hypher]: https://github.com/bramstein/hypher
