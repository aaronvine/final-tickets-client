'use strict';

describe('tickets homepage', function () {

    beforeEach(function () {
        browser.get('http://localhost:8000/');
    });

    it('should have a relevant title', function () {
        expect(browser.getTitle()).toEqual('Tickets');
    });

    it('should greet the the user', function () {
        var greetingMessage = $('h1');
        expect(greetingMessage.getText()).toEqual('Welcome!');
    });

    describe('search component', function () {

        var searchBox;
        beforeEach(function () {
            searchBox = $('search');
        });

        it('should show a result when you enter a proper search phrase', function () {
            var results;
            var searchPhrase = 'h';
            searchBox.click();
            searchBox.sendKeys(searchPhrase);
            results = $('.suggestion');
            // todoList = element.all(by.repeater('todo in todos'));
            expect(results.count()).toBeGreaterThan(0);
        });

        it('should not show a result when you enter nonsense', function () {
            var results;
            var searchPhrase = 'hadejjjkkkkk';
            searchBox.click();
            searchBox.sendKeys(searchPhrase);
            results = $('.suggestion');
            expect(results.count()).toBe(0);
        });

    });

    it('should list the latest 5 tickets', function () {
        var tickets = $('.tickets');
        expect(tickets.cpunt()).toBe(5);
    });

    // it('should add a todo', function() {
    //   var addTodo = element(by.model('todoText'));
    //   var addButton = element(by.css('[value="add"]'));
    //
    //   addTodo.sendKeys('write a protractor test');
    //   addButton.click();
    //
    //   expect(todoList.count()).toEqual(3);
    //   expect(todoList.get(2).getText()).toEqual('write a protractor test');
    // });

});
