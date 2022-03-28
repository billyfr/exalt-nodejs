const assert = require('assert');
var expect = require('chai').expect;

const usersService = require("../services/userService");
const AllUser = require("./../constants/results.json");

describe('fixUsersInfo', function() {
    it('should return same value of results.json', function() {
        let fixUsersInfo = usersService()
        expect(fixUsersInfo).to.be.deep.equal(AllUser)
    });
});