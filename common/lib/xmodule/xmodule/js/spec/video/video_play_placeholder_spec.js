(function (WAIT_TIMEOUT) {
    'use strict';

    describe('VideoPlayPlaceholder', function () {
        var state, oldOTBD;

        beforeEach(function () {
            oldOTBD = window.onTouchBasedDevice;
            window.onTouchBasedDevice = jasmine
                .createSpy('onTouchBasedDevice').andReturn(null);

            state = jasmine.initializePlayer();
            spyOn(this.state.videoCommands, 'execute');
        });

        afterEach(function () {
            $('source').remove();
            state.storage.clear();
            window.Video.previousState = null;
            window.onTouchBasedDevice = oldOTBD;
        });

        var cases = [
            {
                name: 'PC',
                isShown: false,
                isTouch: null
            }, {
                name: 'iPad',
                isShown: true,
                isTouch: ['iPad']
            }, {
                name: 'Android',
                isShown: true,
                isTouch: ['Android']
            }, {
                name: 'iPhone',
                isShown: false,
                isTouch: ['iPhone']
            }
        ];

        beforeEach(function () {
            jasmine.stubRequests();

            spyOn(window.YT, 'Player').andCallThrough();
        });

        it ('works correctly on calling proper methods', function () {
            var btnPlay;

            state = jasmine.initializePlayer();
            btnPlay = state.el.find('.btn-play');

            state.videoControl.showPlayPlaceholder();

            expect(btnPlay).not.toHaveClass('is-hidden');
            expect(btnPlay).toHaveAttrs({
                'aria-hidden': 'false',
                'tabindex': 0
            });

            state.videoControl.hidePlayPlaceholder();

            expect(btnPlay).toHaveClass('is-hidden');
            expect(btnPlay).toHaveAttrs({
                'aria-hidden': 'true',
                'tabindex': -1
            });
        });

        $.each(cases, function (index, data) {
            var message = [
                (data.isShown) ? 'is' : 'is not',
                ' shown on',
                data.name
            ].join('');

            it(message, function () {
                var btnPlay;

                window.onTouchBasedDevice.andReturn(data.isTouch);
                state = jasmine.initializePlayer();
                btnPlay = state.el.find('.btn-play');

                if (data.isShown) {
                    expect(btnPlay).not.toHaveClass('is-hidden');
                } else {
                    expect(btnPlay).toHaveClass('is-hidden');
                }
            });
        });

        $.each(['iPad', 'Android'], function (index, device) {
            it(
                'is shown on paused video on ' + device +
                ' in HTML5 player',
                function ()
            {
                var btnPlay;

                window.onTouchBasedDevice.andReturn([device]);
                state = jasmine.initializePlayer();
                btnPlay = state.el.find('.btn-play');

                state.videoControl.play();
                state.videoControl.pause();

                expect(btnPlay).not.toHaveClass('is-hidden');
            });

            it(
                'is hidden on playing video on ' + device +
                ' in HTML5 player',
                function ()
            {
                var btnPlay;

                window.onTouchBasedDevice.andReturn([device]);
                state = jasmine.initializePlayer();
                btnPlay = state.el.find('.btn-play');

                state.videoControl.play();

                expect(btnPlay).toHaveClass('is-hidden');
            });

            it(
                'is hidden on paused video on ' + device +
                ' in YouTube player',
                function ()
            {
                var btnPlay;

                window.onTouchBasedDevice.andReturn([device]);
                state = jasmine.initializePlayerYouTube();
                btnPlay = state.el.find('.btn-play');

                state.videoControl.play();
                state.videoControl.pause();

                expect(btnPlay).toHaveClass('is-hidden');
            });
        });

        it('can destroy itself', function () {
            expect().toBe();
        });

    });
}).call(this, window.WAIT_TIMEOUT);
