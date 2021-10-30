'use strict';

class CountDown {
  constructor(totalSeconds) {
    this.nextDay = 0;
    this.nextHour = 0;
    this.nextMin = 0;
    this.nextSec = 0;
    this.totalSeconds = totalSeconds;
    this.firstTime = true;

    this.elements = {
      days: document.querySelector('[data-countdown=days]'),
      hours: document.querySelector('[data-countdown=hours]'),
      minutes: document.querySelector('[data-countdown=minutes]'),
      seconds: document.querySelector('[data-countdown=seconds]'),
    };

    this.days = {
      dataBack: this.elements.days.querySelectorAll('[data-back]'),
      dataFront: this.elements.days.querySelector('[data-front]'),
    };

    this.hours = {
      dataBack: this.elements.hours.querySelectorAll('[data-back]'),
      dataFront: this.elements.hours.querySelector('[data-front]'),
    };

    this.minutes = {
      dataBack: this.elements.minutes.querySelectorAll('[data-back]'),
      dataFront: this.elements.minutes.querySelector('[data-front]'),
    };

    this.seconds = {
      dataBack: this.elements.seconds.querySelectorAll('[data-back]'),
      dataFront: this.elements.seconds.querySelector('[data-front]'),
    };

    this.calculateTime();

    const runCalculate = setInterval(() => {
      if (this.totalSeconds < 0) {
        clearInterval(runCalculate);
        return;
      }
      this.calculateTime();
      this.totalSeconds--;
    }, 1000);
  }

  calculateTime() {
    const days = Math.floor(this.totalSeconds / (3600 * 24));
    const hours = Math.floor((this.totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((this.totalSeconds % 3600) / 60);
    const seconds = Math.floor(this.totalSeconds % 60);

    const updateNextTime = () => {
      this.nextDay = days == 0 ? 30 : `${days - 1 < 10 ? `0${days - 1}` : days - 1}`;
      this.nextHour = hours == 0 ? 23 : `${hours - 1 < 10 ? `0${hours - 1}` : hours - 1}`;
      this.nextMin = minutes == 0 ? 59 : `${minutes - 1 < 10 ? `0${minutes - 1}` : minutes - 1}`;
      this.nextSec = seconds == 0 ? 59 : `${seconds - 1 < 10 ? `0${seconds - 1}` : seconds - 1}`;
    };

    const compareTime = () => {
      if (days == this.nextDay) {
        setNewTime(this.days.dataFront, this.days.dataBack, this.nextDay);
        flipCountdownTimerCard(this.elements.days);
      }
      if (hours == this.nextHour) {
        setNewTime(this.hours.dataFront, this.hours.dataBack, this.nextHour);
        flipCountdownTimerCard(this.elements.hours);
      }
      if (minutes == this.nextMin) {
        setNewTime(this.minutes.dataFront, this.minutes.dataBack, this.nextMin);
        flipCountdownTimerCard(this.elements.minutes);
      }
      if (seconds == this.nextSec) {
        setNewTime(this.seconds.dataFront, this.seconds.dataBack, this.nextSec);
        flipCountdownTimerCard(this.elements.seconds);
      }
    };

    const setNewTime = (front, back, next) => {
      back.forEach((back) => (back.dataset.back = next));
      setTimeout(() => {
        front.dataset.front = next;
      }, 900);
    };

    const setInitialNextTime = () => {
      this.nextDay = days < 10 ? `0${days}` : days;
      this.nextHour = hours < 10 ? `0${hours}` : hours;
      this.nextMin = minutes < 10 ? `0${minutes}` : minutes;
      this.nextSec = seconds < 10 ? `0${seconds}` : seconds;
    };

    const flipCountdownTimerCard = (element) => {
      element.classList.add('animate');
      setTimeout(() => element.classList.remove('animate'), 900);
    };

    if (this.firstTime) {
      setInitialNextTime();
      this.firstTime = false;
      return;
    }

    compareTime();
    updateNextTime();
  }
}

new CountDown(1209600);
