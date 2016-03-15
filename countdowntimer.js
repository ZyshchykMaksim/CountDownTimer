
define(function (require) {
  'use strict';

  var countdowntimer = function (duration) {
    var timerID = null;

    this.duration = duration;
    this.granularity = 1000;
    this.tickFtns = [];
    this.endFtns = [];
    this.running = false;

    this.start = function () {
      if (this.running) {
        return;
      }
      this.running = true;
      var that = this,
          diff = that.duration || 0;

      (function timer() {
        if (diff > 0) {
          timerID = setTimeout(timer, that.granularity);
          that.tickFtns.forEach(function (ftn) {
            ftn.call(this, diff);
          }, that);
        } else {
          diff = 0;
          that.running = false;
          that.endFtns.forEach(function (ftn) {
            ftn.call(this);
          }, that);
        }
        diff--;
      }());
    };

    this.refresh = function () {
      if (this.running) {
        clearTimeout(timerID);
      }
      this.running = false;
      this.start();
    };

    this.onTick = function (ftn) {
      if (typeof ftn === 'function') {
        this.tickFtns.push(ftn);
      }
      return this;
    };

    this.onEnd = function (ftn) {
      if (typeof ftn === 'function') {
        this.endFtns.push(ftn);
      }
      return this;
    };

    this.expired = function () {
      return !this.running;
    };

    this.parse = function (seconds) {
      return {
        'minutes': (seconds / 60) | 0,
        'seconds': (seconds % 60) | 0
      };
    };
  }
  countdowntimer.prototype = {};
  countdowntimer.prototype.constructor = countdowntimer;

  return countdowntimer;
});