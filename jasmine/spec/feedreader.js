/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(() => {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are defined', () => {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBeLessThan(0);
            };
        });



        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', () => {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            };
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        const body = $('body');
        const hiddenMenu = ("menu-hidden");

        it('menu is hidden by default', () => {
            expect((body).hasClass(hiddenMenu)).toBeTruthy(); // Checks if body have menu-hidden class by default
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility on menu icon click', () => {
            const menuIcon = $('.menu-icon-link');
            //Click once
            menuIcon.click(); // Inspired by https://stackoverflow.com/questions/48872864/testing-for-click-event-with-jasmine
            expect((body).hasClass(hiddenMenu)).toBeFalsy(); // Same expect as 'menu is hidden by default' but to not contain the class
            //Click again
            menuIcon.click();
            expect((body).hasClass(hiddenMenu)).toBeTruthy(); // Same expect as 'menu is hidden by default' but after click again
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });
        it('Feed have at least one entry on container', (done) => {
            const feedList = $('.feed .entry');
            expect(feedList.length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    //describe('New Feed Selection', function(){
    // });
    describe('New Feed Selection', () => {
        const feedContent = $('.feed');
        var feedBefore;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach((done) => {
            loadFeed(0, () => {
                feedBefore = feedContent.text();
                done();
            });
        });

        // Check if feeds are different
        it('new feed is different', (done) => {
            loadFeed(1, () => {
                feedAfter = feedContent.text();
                expect(feedAfter).not.toBe(feedBefore);
                done();
            });
        });

    });
});