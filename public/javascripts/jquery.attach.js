/*
jQuery Attach Plugin

Copyright (c) 2012 Durran Jordan

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
;(function($) {

  var Attach = {};

  /*
  * The current active readers reside in this variable until
  * completed and popped off the stack.
  */
  Attach.readers = [];

  /*
  * Cache control constant.
  */
  Attach.CACHE_CONTROL = "Cache-Control";

  /*
  * File name header constant.
  */
  Attach.FILE_NAME = "X-File-Name";

  /*
  * Form submit method constant.
  */
  Attach.METHOD = "POST";

  /*
  * Requested with header constant.
  */
  Attach.REQUESTED_WITH = "X-Requested-With";

  /*
  * Designate a file upload field as attachable.
  *
  *   $("#upload").attach({ url: "/upload" });
  */
  $.fn.attach = function(options) {
    $(this).each(function(index, element) {
      $(element).change(function(event) {
        // Clear out all the existing readers.
        Attach.readers.length = 0;

        // Create a new reader for each file and add it to the stack.
        $(element.files).each(function(i, file) {
          Attach.readers.push(new Attach.Reader(file, options.url));
        });

        // For each reader read the file.
        $(Attach.readers).each(function(i, reader) {
          reader.read();
        });
      });
    });
  };

  /*
  * The Attach.Reader is the object that is responsible for sending the file
  * to the server, altering the HTML, and reporting the progress.
  *
  *   var reader = new Attach.Reader(file, url);
  */
  Attach.Reader = function(file, url) {
    this._file = file;
    this._url = url;
    Attach.createProgressContainer(this.fileName());
  };

  /* Attach the progress, success, and error events to the reader.
  *
  *   reader.attachEvents(reader);
  */
  Attach.Reader.prototype.attachEvents = function(reader) {
    reader.onprogress = Attach.readProgress;
    reader.onload = Attach.readSuccess;
    reader.onerror = Attach.readError;
  };

  /*
  * Get the file object from the Attach.Reader.
  *
  *   reader.file();
  */
  Attach.Reader.prototype.file = function() {
    return this._file;
  };

  /*
  * Get the file name from the Attach.Reader.
  *
  *   reader.fileName();
  */
  Attach.Reader.prototype.fileName = function() {
    return this.file().name;
  };

  /*
  * Read the file from the user into the browser and depending on
  * the events, can error or send to the server.
  *
  *   reader.read();
  */
  Attach.Reader.prototype.read = function() {
    var reader = new FileReader();
    reader.readAsBinaryString(this.file());
    this.attachEvents(reader);
  };

  /*
  * Get the url object from the Attach.Reader.
  *
  *   reader.url();
  */
  Attach.Reader.prototype.url = function() {
    return this._url;
  };

  /* Create the containing div for the progress bar.
  *
  *   Attach.createProgressContainer();
  */
  Attach.createProgressContainer = function(fileName) {
    var progressBar = $("<div>").attr("id", "progress").html(fileName);
    $(":first :file").after(progressBar);
  };

  /*
  * Handle errors that could have occured with the browser trying to read
  * the file.
  *
  *   Attach.readError(event);
  */
  Attach.readError = function(event) {
  };

  /*
  * Show the progress of the file that is being read.
  *
  *   Attach.readProgress(event);
  */
  Attach.readProgress = function(event) {
    if (event.lengthComputable) {
      var percentage = event.loaded / event.total;
    }
  };

  /*
  * Handle the finishing of the file read.
  *
  *   Attach.readSuccess(event);
  */
  Attach.readSuccess = function(event) {
    var uploader = new Attach.Uploader(event.target);
    uploader.send();
  };

  /*
  * The Attach.Uploader is the object responsible for sending the file to
  * the server.
  *
  *   var uploader = new Attach.Uploader(target);
  */
  Attach.Uploader = function(target) {
    this._file = target.result;
  };

  /* Attach the progress, success, and error events to the xhr upload.
  *
  *   uploader.attachEvents(request);
  */
  Attach.Uploader.prototype.attachEvents = function(request) {
    var upload = request.upload;
    upload.addEventListener("progress", Attach.sendProgress);
    upload.addEventListener("load", Attach.sendSuccess);
    upload.addEventListener("error", Attach.sendError);
  };

  /*
  * Get the file object from the Attach.Uploader.
  *
  *   uploader.file();
  */
  Attach.Uploader.prototype.file = function() {
    return this._file;
  };

  /* Prepare the xhr for sending.
  *
  *   uploader.prepareRequest(request);
  */
  Attach.Uploader.prototype.prepareRequest = function(request) {
    var reader = Attach.readers.pop();
    request.open(Attach.METHOD, reader.url());
    request.setRequestHeader(Attach.CACHE_CONTROL, "no-cache");
    request.setRequestHeader(Attach.REQUESTED_WITH, "XMLHttpRequest");
    request.setRequestHeader(Attach.FILE_NAME, reader.fileName());
  };

  /*
  * Send the file to the server via xhr.
  *
  *   uploader.send();
  */
  Attach.Uploader.prototype.send = function() {
    var request = new XMLHttpRequest();
    this.attachEvents(request);
    this.prepareRequest(request);
    request.send(this.file());
  };

  /*
  * Handle errors that could have occured with the browser trying to send
  * the file.
  *
  *   Attach.sendError(event);
  */
  Attach.sendError = function(event) {
  };

  /*
  * Show the progress of the file that is being sent.
  *
  *   Attach.sendProgress(event);
  */
  Attach.sendProgress = function(event) {
    if (event.lengthComputable) {
      var percentage = event.loaded / event.total;
    }
  };

  /*
  * Handle the finishing of the file send.
  *
  *   Attach.sendSuccess(event);
  */
  Attach.sendSuccess = function(event) {
  };

})(jQuery);
