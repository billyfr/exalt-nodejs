// require('dotenv').config()
const jobs = require("../constants/jobs.json")
const informations = require("../constants/informations.json")
const users = require("../constants/users.json")
const fs = require('fs');


module.exports = function fixUsersInfo() {
    const replaceNumberByLetter = { "0": "o", "1": "i", "3": "e", "4": "a" }

    let allusers = new Map();
    Object.keys(informations).forEach((key) => {
        allusers.set(key, informations[key]);
    })
    Object.keys(jobs).forEach((key) => {
        if (allusers.has(key)) {
            let value = allusers.get(key);
            value.job = jobs[key].job;
            value.name = jobs[key].name;
            allusers.set(key, value)
        } else
            allusers.set(key, jobs[key])
    })
    Object.keys(users).forEach((key) => {
        if (allusers.has(key)) {
            let value = allusers.get(key);
            if (users[key].name !== undefined && users[key].name !== "#ERROR")
                value.name = users[key].name;
            if (/[0134]/g.test(value.name)) {
                value.name = value.name.replace(/[0134]/g, char => replaceNumberByLetter[char]);
                value.name = value.name.charAt(0).toUpperCase() + value.name.slice(1)
            }
            if (value.city)
                value.city = value.city.charAt(0).toUpperCase() + value.city.toLowerCase().slice(1);
            allusers.set(key, value);
        } else
            allusers.set(key, users[key])
    })
    const dictstring = JSON.stringify(Object.fromEntries(allusers));
    fs.writeFileSync("fixUsers.json", dictstring);
    return Object.fromEntries(allusers)
}