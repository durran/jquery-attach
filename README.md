Upload files using JQuery, the File API, and XMLHTTPRequests. This currently will
only work in Firefox and Chrome.

Development Setup
=================
- `gem install bundler`
- `bundle install`

Running the Example
===================
- `rackup`
- http://localhost:9292

Running Specs
=============
- `evergreen serve`

Demo
====
[JQuery.attach](http://jquery-attach.heroku.com)

Requirements
============
- JQuery 1.7.1+
- Firefox 9
- Chrome 16

Usage
=====
Attach the functionality to a file form field.

```javascript
$("#upload").attach({ url: "/upload" });
```
