Unhyphenator is a JavaScript library that strips soft hyphens when you
copy and paste text. (Actually, it can transform the copy-pasted text
in arbitrary ways, but unhyphenation is what it is designed for.)

Unhyphenator can be used with server-side hyphenation, or any
client-side JavaScript hyphenation library (such as [Hypher][]).

Unhyphenator is based on the equivalent functionality from
[Hyphenator.js][], which in turn derives from [Sweet Justice][].

## Usage

Obviously, include [unhyphenator.js](unhyphenator.js).

For unhyphenation only:

    var u = new Unhyphenator();
    u.start() // To activate the handler
    u.stop()  // To deactivate the handler

If you want to do something else, instantiate the new unhyphenator
with an array of callbacks of one argument:

    // Convert all copy-pasted text to uppercase.
    var u = new Hyphenator([function (s) { return s.toUpperCase(); }])
    u.start()

Each function in the array will be applied in order.

[Hypher]: https://github.com/bramstein/hypher
[Hyphenator.js]: https://code.google.com/p/hyphenator/
[Sweet Justice]: https://github.com/aristus/sweet-justice
