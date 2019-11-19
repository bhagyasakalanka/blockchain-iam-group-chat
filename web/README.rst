BrowsePass
==========


Introduction
------------

BrowsePass is a web application to read **KDBX** files, as produced by `KeePass <http://keepass.io>`_.

BrowsePass also has a `Chrome extension <https://chrome.google.com/webstore/detail/browsepass/pihdapfeofbodahcblfmeckjnfcigakb>`_.

BrowsePass is open source, released under the GNU `General Public License 2 <LICENSE>`_.

FAQ
---

1. Why is BrowsePass really, REALLY, slow?

   BrowsePass is written in plain JavaScript so that it can run on your web
   browsers. JavaScript itself is not known for performance.

   Furthermore, the work that BrowsePass does involves heavy calculations. They
   are not suitable for plain JavaScript.

   And lastly, some users intentionally set the number of `password
   transformation rounds <http://keepass.info/help/base/security.html>`_ very
   large (even in the order of million). That puts further burdern on the
   JavaScript engine (which is already slow) to work longer to derive the keys.

2. Why is BrowsePass asking for permission to *read and change all your data
   on the websites you visit*?

   BrowsePass supports Google Drive, and other WebDAV-based file hosting
   services. To do that, it has to make HTTP requests and read the responses.

   BrowsePass **never** reads nor changes **your data**, unless you tell it to.
   For example, if you ask BrowsePass to open a file from a WebDAV source, it
   has to *read* that file. BrowsePass never changes any data. It is read-only.

   For more information, see `Cross-Origin XMLHttpRequest <https://developer.chrome.com/extensions/xhr>`_.

3. Why does BrowsePass not remember the last URL?

   BrowsePass never changes any data and therefore it cannot remember anything.
