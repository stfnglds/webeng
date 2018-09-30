const api = require("../src/services/api.js");

describe("API Tests", function() {
    it("contains spec with an expectation", function() {
        var list=[];
        await (function(){
            list=api.getGroups();
        });

        expect(list.length).toBeGreaterThan(0);
    });
});