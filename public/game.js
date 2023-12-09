/**
 * Quinton Pharr
 * October 3rd 2023
 * Donovan Kong, and Kathryn Koehler - Section AB
 *
 * This is the JavaScript file for the Whack-A-Mole game. It contains the
 * functions that are used to start the game, spawn moles, and whack moles.
 * pretty much everything needed to make the game work.
 */

'use strict';

/**
 * module-global pattern
 */
(function() {

  window.addEventListener('load', init);
  let gameStarted = false; // boolean to check if game has started starts as false
  const ONE_SECOND = 1000; // constant for one second in milliseconds

  // code to run when page loads
  /**
   * Initializes the game by adding event listeners to the start button and
   * each mole.
   */
  function init() {
    let moles = qsa(".mole");
    let start = id("score-button");
    start.addEventListener("click", startGame);
    for (let i = 0; i < moles.length; i++) {
      moles[i].addEventListener("click", whackMole);
    }

  }

  /**
   * Starts the game by setting the score to 0 and the timer to 30 seconds.
   * Spawns a mole every second. When the timer reaches 0, the game is over.
   */
  function startGame() {
    gameStarted = true;
    let score = id("score");
    score.textContent = 0;
    let timer = id("timer");
    timer.textContent = 30;

    let interval = setInterval(function() {
      timer.textContent = parseInt(timer.textContent) - 1;
      if (parseInt(timer.textContent) <= 0) {
        clearInterval(interval);
        let moles = qsa(".mole");
        for (let i = 0; i < moles.length; i++) {
          moles[i].src = "img/hole.png";
        }
        let gameOver = document.createElement("h2");
        gameOver.textContent = "Game Over";
        let timerContainer = id("timer-container");
        let oldTimer = qs("#timer-container h2");
        timerContainer.replaceChild(gameOver, oldTimer);

        gameStarted = false;
      }
    }, ONE_SECOND);

    spawnMole();
  }

  /**
   * Spawns a mole in a random hole. If the mole has not been whacked yet,
   * it will stay for 1 second. If the mole has been whacked, it will
   * disappear immediately.
   */
  function spawnMole() {
    if (!gameStarted) {
      return;
    }
    const numHoles = 9;

    let moles = qsa(".mole");
    let random = Math.floor(Math.random() * numHoles);
    moles[random].src = "img/mole.jpeg";
    moles[random].classList.remove("whacked");

    setTimeout(function() {
      moles[random].src = "img/hole.png";
      moles[random].classList.add("whacked");
      spawnMole();
    }, ONE_SECOND);
  }

  /**
   * Whacks a mole and adds to the score if the mole has not been whacked yet.
   */
  function whackMole() {
    if (gameStarted) {
      let mole = this;
      let score = id("score");
      if (!this.classList.contains("whacked")) {
        score.textContent = parseInt(score.textContent) + 1;
        this.classList.add("whacked");
        mole.src = "img/hole.png";
      }
    }
  }

  /* --- CSE 154 HELPER FUNCTIONS --- */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();