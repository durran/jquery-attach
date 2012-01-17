require("/javascripts/jquery-1.7.1.min.js");
require("/javascripts/jquery.attach.js");

describe("jquery Attach", function() {

  describe("Attach.readers", function() {

    it("defaults to an empty array", function() {
      expect(Attach.readers).toEqual([]);
    });
  });

  describe("framework constants", function() {

    describe("Attach.CACHE_CONTROL", function() {

      it("returns Cache-Control", function() {
        expect(Attach.CACHE_CONTROL).toEqual("Cache-Control");
      });
    });

    describe("Attach.FILE_NAME", function() {

      it("returns X-File-Name", function() {
        expect(Attach.FILE_NAME).toEqual("X-File-Name");
      });
    });

    describe("Attach.METHOD", function() {

      it("returns POST", function() {
        expect(Attach.METHOD).toEqual("POST");
      });
    });

    describe("Attach.REQUESTED_WITH", function() {

      it("returns X-Requested-With", function() {
        expect(Attach.REQUESTED_WITH).toEqual("X-Requested-With");
      });
    });
  });

  describe("Attach.Reader", function() {

    var file;
    var reader;
    var url;

    beforeEach(function() {
      file = "file.txt";
      reader = new Attach.Reader(file, url);
      url = "/upload";
    });

    describe("#new", function() {

      it("sets the file", function() {
        expect(reader._file).toEqual(file);
      });

      it("sets the file", function() {
        expect(reader._url).toEqual(url);
      });
    });

    describe("#file", function() {

      it("returns the file", function() {
        expect(reader.file()).toEqual(file);
      });
    });

    describe("#url", function() {

      it("returns the url", function() {
        expect(reader.url()).toEqual(url);
      });
    });
  });
});