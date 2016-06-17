/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // Check to see if there's an updated version of service-worker.js with
      // new files to cache:
      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-registration-update-method
      if (typeof registration.update === 'function') {
        registration.update();
      }

      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }


})();


document.querySelector('#form_credit_card').addEventListener('input', function (e) {
    var foo = this.value.split("-").join("");
    if (foo.length > 0) {
        foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
    }
    this.value = foo;
});

document.querySelector('#form_expiration_date').addEventListener('input', function (e) {
    var foo = this.value.split("/").join("");
    if (foo.length > 0) {
        foo = foo.match(new RegExp('.{1,2}', 'g')).join("/");
    }
    this.value = foo;
});


function showError(container, errorMessage) {

      var msgElem = document.createElement('span');
      msgElem.className = "error-message";
      msgElem.innerHTML = errorMessage;
      container.appendChild(msgElem);
    }

    function resetError(container) {
    
      if (container.lastChild.className == "error-message") {
        container.removeChild(container.lastChild);
      }
    }

    function validate(form) {
      var result = false;
      var elems = form.elements;
      var isValidEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
      var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
      var isValidPhone =  /^([0-9\(\)\/\+ \-]*)$/;
      var isValidCredit = /((?:(?:4\d{3})|(?:5[1-5]\d{2})|6(?:011|5[0-9]{2}))(?:-?|\040?)(?:\d{4}(?:-?|\040?)){3}|(?:3[4,7]\d{2})(?:-?|\040?)\d{6}(?:-?|\040?)\d{5})/;
      var isNumbers = /^[0-9]+$/;
      var isDate = /^\d{2}[.//]\d{2}$/;
      resetError(elems.first_name.parentNode);
      if (!elems.first_name.value) {
        showError(elems.first_name.parentNode, 'Enter your First Name');
      } 

      resetError(elems.last_name.parentNode);
      if (!elems.last_name.value) {
        showError(elems.last_name.parentNode, 'Enter your Last Name');
      }

      resetError(elems.email.parentNode);
      if (!elems.email.value.match(isValidEmail)) {
        showError(elems.email.parentNode, 'Enter correct Email');

      }

      resetError(elems.country.parentNode);
      if (!elems.country.value) {
        showError(elems.country.parentNode, 'Fill this field');

      }

      resetError(elems.postal_code.parentNode);
      if (!elems.postal_code.value.match(isValidZip)) {
        showError(elems.postal_code.parentNode, 'Incorrect Postal Code');

      }

      resetError(elems.phone_number.parentNode);
      if (!elems.phone_number.value.match(isValidPhone) || !elems.phone_number.value) {
        showError(elems.phone_number.parentNode, 'Incorrect Phone Number');

      }

      resetError(elems.credit_card.parentNode);
      if (!elems.credit_card.value.match(isValidCredit) || !elems.credit_card.value) {
        showError(elems.credit_card.parentNode, 'Incorrect Credit Card Number');

      }

      resetError(elems.security_code.parentNode);
      if (!elems.security_code.value.match(isNumbers) || elems.security_code.value.length>3) {
        showError(elems.security_code.parentNode, 'Incorrect Security Code');

      }
      resetError(elems.expiration_date.parentNode);
      if (!elems.expiration_date.value.match(isDate) || elems.expiration_date.value.length>5) {
        showError(elems.expiration_date.parentNode, 'Enter valid date in MM/YY format');

      }

      if (!document.querySelector('.error-message')) {
          alert('Verified');
      }

    }