'use strict';

describe('tickets app', function () {

    beforeEach(function () {
        browser.get('http://localhost:8000/');
    });

    it('should have a relevant title', function () {
        expect(browser.getTitle()).toEqual('Tickets');
    });

    it('should greet the the user', function () {
        expect($('h1').getText()).toEqual('Welcome!');
    });

    describe('search component', function () {

        var search;
        beforeEach(function () {
            search = $('#input-search');
            search.click();
        });

        it('should show a result when you enter a proper search phrase', function () {
            search.sendKeys('h');
            expect($$('.suggestion').count()).toBeGreaterThan(0);
        });

        it('should not show a result when you enter nonsense', function () {
            search.sendKeys('hadejjjkkkkk');
            expect($$('.suggestion').count()).toBe(0);
        });

    });

    it('should list the latest 5 tickets', function () {
        expect($$('.ticket').count()).toBe(5);
    });

    it('should add a new ticket and show it on the latest tickets', function () {
        $('#ticket-submit').click();
        $('#input-ticket-title').click();
        $('#input-ticket-title').sendKeys('protractor ticket test title');
        $('#input-ticket-email').click();
        $('#input-ticket-email').sendKeys('protractor@test.com');
        $('#button-ticket-submit').click();
        browser.ignoreSynchronization = true;
        browser.waitForAngular();
        expect($$('.ticket-title').get(4).getText()).toBe('protractor ticket test title');
    });

    it('should add a new reply and show it on ticket replies', function () {
        $$('#ticket-view').get(3).click();
        $('#input-reply-content').click();
        $('#input-reply-content').sendKeys('protractor reply test content');
        $('#input-reply-email').click();
        $('#input-reply-email').sendKeys('protractor@test.com');
        $('#button-reply-submit').click();
        browser.ignoreSynchronization = true;
        browser.waitForAngular();
        expect($$('.reply-content').get(0).getText()).toBe('protractor reply test content');
    });

});
