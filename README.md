# polymer-redux
An example application using Polymer and Redux.

Note how the application state is only changed in the reducers. Also, the editable UI state is separate
from the application state so that part is mutable, and bound by Polymer.

The scripts are detached from the respective HTML imports, because:

a) One Webpack plug-in I tested required this separation,

b) It is demonstrated as a warning example of how bad it looks when
   this is done, and

c) Using TypeScript requires this kind of separation, in good and in bad.

As mentioned, I tested Webpack with Polymer also here, and got to the conclusion
that it's not a good idea to mix Webpack with Polymer.

# Usage

`npm install`

`npm start`
