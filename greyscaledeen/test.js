'use strict'
const expect = require('chai').expect // require syntax vereist iets oudere versie
const handler = require('./handler');

describe('Image processing', async function() {
    it('works for a simple test', async function() {
        const fakeEvent = {
            body: "iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAIAAAB7QOjdAAAAD0lEQVR42mP6z8DA/l8YAAg1AhvhYAP3AAAAAElFTkSuQmCC",
            headers: {
                authorization: "Bearer keepitsecret"
            }
        };
        const fakeContext = {
            status: function(code) {
                return this;
            },
            succeed: function(data) {
                this.data = data;
                return this;
            }
        }
        const result = await handler(fakeEvent, fakeContext);
        expect(result.data).to.equal("iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEUlEQVR4AWM0MzP739zczAAADhYDLCgAyDMAAAAASUVORK5CYII=");
    });
});
