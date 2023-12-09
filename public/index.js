/*
 *Quinton Pharr
 *November 1st 2023
 * Donovan Kong, and Kathryn Koehler - Section AB
 *
 * This is the JavaScript file for the about/index page of the website. It
 * contains the functionality for the button on the page. When the button is
 * clicked, it will add a new entry to the page with the name of the user. If
 * if the bored button is clicked, it will display a random activity for the
 * user to do. If the amiibo button is clicked, it will display a random amiibo
 * for the user to see. If the user enters a name and clicks the submit button,
 * it will replace the content of the existing entry with the new name. NEW  -
 * there is now a registation and login page when the user first enters the
 * website. The user can register with a username and password and then login
 * with the same username and password. If the user enters the wrong username
 * or password, it will display an error message on the page.
 */

'use strict';

/**
 * module-global pattern
 */
(function() {
  const BORED_API_URL = "http://www.boredapi.com/api/activity/";
  const AMIIBO_API_URL = "https://www.amiiboapi.com/api/amiibo/?name=";

  window.addEventListener('load', init);

  /**
   * Initializes the buttons
   */
  function init() {
    qs("#submit").addEventListener("click", addEntry);
    id("bored-button").addEventListener("click", fetchActivityBored);
    id("amiibo-button").addEventListener("click", fetchActivityAmiibo);
    qs('#register form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      register();
    });
    qs('#login form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      login();
    });
  }

  /**
   * reigsters the user with the username and password that they entered
   * when registering. If the two passwords do not match, it will display an
   * error message on the page.
   */
  function register() {
    let form = new FormData(qs('#register form'));

    fetch('/register', {method: 'POST', body: form})
      .then(statusCheck)
      .then(res => res.text())
      .then(handleRegisterResponse)
      .catch(handleRegError);
  }

  /**
   * displays the error message on the page
   * @param {string} error error message
   */
  function handleRegError(error) {
    let responseContainer = id('reg-response');
    if (!responseContainer.querySelector('.error')) {
      let responseText = gen('p');
      responseText.classList.add('error');
      responseContainer.appendChild(responseText);
    }
    responseContainer.querySelector('.error').textContent = error.message;
  }

  /**
   * function to login with username and password and check if they match
   * the username and password that was entered when registering
   */
  function login() {
    let form = new FormData(qs('#login form'));

    fetch('/login', {method: 'POST', body: form})
      .then(statusCheck)
      .then(res => res.text())
      .then(handleLoginResponse)
      .catch(handleLogError);
  }

  /**
   * function handles the error and displays it on the page
   * @param {string} error error message
   */
  function handleLogError(error) {
    let responseContainer = id('log-response');
    if (!responseContainer.querySelector('.error')) {
      let responseText = gen('p');
      responseText.classList.add('error');
      responseContainer.appendChild(responseText);
    }
    responseContainer.querySelector('.error').textContent = error.message;
  }

  /**
   * this function handles the response from the server. If the response is
   * success, it will redirect the user to the home page. Otherwise it will
   * display an error message on the page.
   * @param {string} text the response text
   */
  function handleRegisterResponse(text) {
    if (text === 'success') {
      id('register').classList.add('hidden'); // is there something wrong here?
      id('login').classList.remove('hidden'); // is there something wrong here?
    } else {
      let responseText = gen('p');
      responseText.textContent = text;
      id('reg-response').appendChild(responseText);
    }
  }

  /**
   * this function handles the response from the server. If the response is
   * success, it will redirect the user to the home page. Otherwise it will
   * display an error message on the page.
   * @param {string} text the response text
   */
  function handleLoginResponse(text) {
    if (text === 'success') {
      id('login').classList.add('hidden');
      id('main-page').classList.remove('hidden');
    } else {
      let responseText = gen('p');
      responseText.textContent = text;
      id('log-response').appendChild(responseText);
    }
  }

  /**
   * Fetches a random activity from the bored api and displays it on the page
   * based on the user's input. Or displays a random one if left blank
   */
  async function fetchActivityAmiibo() {
    try {
      let response = await fetch(AMIIBO_API_URL + id("amiibo-name").value);
      response = await statusCheck(response);
      response = await response.json();
      displayAmiibo(response.amiibo[Math.floor(Math.random() * response.amiibo.length)]);
    } catch (error) {
      handleErrorAmiibo(error);
    }
  }

  /**
   * Displays the amiibo on the page. If there is an error, it will display
   * an error message on the page. And if we resolve the error it will remove
   * the error message from the page.
   * @param {object} res - the response from the fetch request
   */
  function displayAmiibo(res) {
    let amiiboImage = document.createElement("img");
    amiiboImage.src = res.image;
    amiiboImage.alt = res.name;
    id("ajax-container").replaceChild(amiiboImage, id("ajax-container").lastChild);

    let error = qs(".error");
    if (error) {
      id("amiibo").removeChild(error);
    }
  }

  /**
   * Handles the error if there is one. It will display an error message on
   * the page under the amiibo button.
   * @param {object} error - the error object
   */
  function handleErrorAmiibo(error) {
    let message = document.createElement('p');
    message.textContent = error.message;
    message.classList.add("error");
    id('amiibo').replaceChild(message, id('amiibo').lastChild);
  }

  /**
   * Fetches a random activity from the bored api, checks the status to see if its ok or not
   * and then displays the activity on the page. If there is an error, it will display
   * an error message on the page.
   */
  async function fetchActivityBored() {
    try {
      let response = await fetch(BORED_API_URL);
      response = await statusCheck(response);
      response = await response.json();
      displayActivity(response);
    } catch (error) {
      handleError(error);
    }

  }

  /**
   * Displays the random activity on the page. If there is an error, it will display
   * an error message on the page.
   * @param {object} res - the response from the fetch request
   */
  function displayActivity(res) {
    let activityElement = document.createElement("p");
    activityElement.textContent = res.activity;
    id("activity").replaceChild(activityElement, id("activity").lastChild);
  }

  /**
   * Checks the status of the fetch request. If the status is ok, it will return the response.
   * @param {object} res - the response from the fetch request
   * @returns {object} - the response if the status is ok, otherwise it will throw an error
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Handles the error if there is one. It will display an error message on
   * the page under the activity button.
   * @param {object} error - the error object
   */
  function handleError(error) {
    let message = document.createElement('p');
    message.textContent = error + "Sorry something went wrong! Please try again later.";
    id('activity').appendChild(message);
  }

  /**
   * Adds a new entry to the page with the name of the user. If there is already
   * an entry on the page, it will replace the content of the existing entry
   * with the new name.
   */
  function addEntry() {

    let existingEntry = qs(".entry");

    if (existingEntry) {
      existingEntry.querySelector("p").textContent = "Hi there " +
      id("name").value + " nice to meet you!";
    } else {

      let newEntry = document.createElement("article");
      newEntry.classList.add("entry");

      let content = document.createElement("p");
      content.textContent = "Hi there " + id("name").value + " nice to meet you!";

      newEntry.appendChild(content);
      qs(".controls").appendChild(newEntry);
    }
    id("name").value = "";
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
   * gen function that creates a dom object
   * @param {string} selector - CSS query selector.
   * @returns {object} dom object
   */
  function gen(selector) {
    return document.createElement(selector);
  }
})();