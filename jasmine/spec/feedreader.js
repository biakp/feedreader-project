/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(() => {

    // This suite is all about the RSS feeds definitions, the allFeeds variable in our application.
    describe('RSS Feeds', () => {

        // This test make sure that the allFeeds variable has been defined and that it is not empty.
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // This test loops trought each feed
        it('urls are defined', () => {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined(); // ensures that URL is defined
                expect(allFeeds[i].url.length).not.toBeLessThan(0); // ensures that URL is not empty
            };
        });



        // This test loops through each feed in the allFeeds object
        it('names are defined', () => {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined(); // ensures that has a name defined
                expect(allFeeds[i].name.length).not.toBe(0); // ensures that the name is not empty
            };
        });
    });


    // New test suite 'The menu'

    describe('The menu', () => {
        const body = $("body");
        const hiddenMenu = "menu-hidden";

        // This test  ensures the menu element is hidden by default.
        it("menu is hidden by default", () => {
            expect(body.hasClass(hiddenMenu)).toBeTruthy(); // Checks if body have menu-hidden class by default
        });

        // This test ensures the menu changes visibility when the menu icon is clicked.
        it("changes visibility on menu icon click", () => {
            const menuIcon = $(".menu-icon-link");

            // Inspired by https://stackoverflow.com/questions/48872864/testing-for-click-event-with-jasmine

            //Check if menu display when clicked once
            menuIcon.click();
            expect(body.hasClass(hiddenMenu)).toBeFalsy();

            //Check if menu hide when clicked again
            menuIcon.click();
            expect(body.hasClass(hiddenMenu)).toBeTruthy();
        });
    });

    // New test suite 'Initial Entries'

    describe('Initial Entries', () => {

        /* This test ensures that when the loadFeed function is called and completes its work, there is at least
          a single .entry element within the .feed container.
        */

        beforeEach((done) => { // loadFeed() is async so it requires the use of beforeEach and async done() function
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

    //New test suite 'New Feed Selection'

    describe('New Feed Selection', () => {
        const feedContent = $('.feed');
        var feedBefore;

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        beforeEach((done) => { // loadFeed() is async so it requires beforeEach and done() function
            loadFeed(0, () => {
                feedBefore = feedContent.text();
                done();
            });
        });

        // Check if feeds have different text()
        it('new feed is different', (done) => {
            loadFeed(1, () => {
                feedAfter = feedContent.text();
                expect(feedAfter).not.toBe(feedBefore);
                done();
            });
        });

    });
});
