import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import './door.html';

Template.DoorFooter.onCreated(function() {
    this.logoutIcon = new ReactiveVar();
    const context = this;

    Meteor.call('door.getSvgContent', ['exit.svg'], function(error, data) {
        if (error) {
            console.error(error);
        } else {
            context.logoutIcon.set(data[0]);
        }
    });
});

Template.Door.onCreated(function() {
    this.lockedIcon = new ReactiveVar();
    const context = this;

    Meteor.call('door.getSvgContent', ['locked.svg'], function(error, data) {
        if (error) {
            console.error(error);
        } else {
            context.lockedIcon.set(data[0]);
        }
    });
});

Template.Door.onRendered(function() {
    Tracker.autorun(function (computation) {
        setTimeout(function() {
            if (!computation.firstRun) {
                const svg = document.querySelector('#locked-container svg');
                const path = document.querySelector('#locked-container svg #svg_16');
                const lock = document.querySelector('#locked-container svg path');
                const info = document.querySelector('.info p');
                const error = document.querySelector('.error');
                const success = document.querySelector('.success');
                let start;

                svg.addEventListener('touchstart', started, false);
                svg.addEventListener('touchend', ended, false);
                svg.addEventListener('mousedown', started, false);
                svg.addEventListener('mouseup', ended, false);

                error.addEventListener('animationend', () => {
                    addClass(error, 'hide');
                }, false);

                function addClass(element, className) {
                    element.classList.add(className);
                }

                function removeClass(element, className) {
                    element.classList.remove(className);
                }

                function cancel() {
                    addClass(path, 'cancel');
                    removeClass(path, 'free');
                    removeClass(lock, 'unlock');
                    removeClass(error, 'hide');
                    addClass(success, 'hide');
                    removeClass(info, 'hide');
                }

                function reset() {
                    removeClass(path, 'free');
                    removeClass(lock, 'unlock');
                    addClass(success, 'hide');
                    removeClass(info, 'hide');
                }

                function started() {
                    start = Date.now();

                    addClass(path, 'free');
                    addClass(lock, 'unlock');
                    addClass(info, 'hide');
                    addClass(error, 'hide');
                }

                function ended() {
                    const now = Date.now() - start;
                    const seconds =  (Math.floor(now / 1000));

                    if (seconds < 1) {
                        cancel();
                    } else {
                        addClass(error, 'hide');
                        removeClass(success, 'hide');

                        Meteor.call('door.open', function(error, data) {
                            if (error) {
                                alert(error);
                            } else {
                                setTimeout(reset, 2000);
                            }
                        });
                    }
                }
            }
        }, 500);
    });
});

Template.DoorFooter.events({
    'click .logout': function() {
        if (confirm('Are you sure?')) {
            Accounts.logout();
        }
    }
});

Template.Door.events({
    'click .locked': function() {
        try {
            Meteor.call('door.open', function() {
                const name = Meteor.user().profile.name;

                setTimeout(function() {
                    alert('Welcome, ' + name + ' :)');
                }, 1000);
            });
        } catch (error) {
            alert(error);
        }
    }
});

Template.Door.helpers({
    lockedIcon() {
        return Template.instance().lockedIcon.get();
    }
});

Template.DoorFooter.helpers({
    logoutIcon() {
        return Template.instance().logoutIcon.get();
    }
});

