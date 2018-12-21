const check_api = (function() {
  var check = {};

  check['lastName'] = function(id) {
    var name = document.getElementById(id);
    if (name.value.length >= 8) {
      name.className = 'correct';
    } else {
        name.className = 'incorrect';
      }
  };

  check['firstName'] = check['lastName']; // La fonction pour le prénom est la même que celle du nom

  check['age'] = function() {
    var age = document.getElementById('age'),
        ageValue = parseInt(age.value);   
    if (!isNaN(ageValue) && ageValue >= 5 && ageValue <= 140) {
      age.className = 'correct';
    } else {
        age.className = 'incorrect';
      }
  };

  check['email'] = function() {
    var email = document.getElementById('email');
    var RegEx = /^([a-z0-9._-]+)@([a-z0-9._-]+)\.([a-z]{2,6})$/;
    if (RegEx.test(email.value)) {
      email.className = 'correct';
    } else {
        email.className = 'incorrect';
      }
  };

  check['login'] = function() {
    var login = document.getElementById('login');
    if (login.value.length >= 6) {
      login.className = 'correct';
    } else {
        login.className = 'incorrect';
      }
  };

  check['pwd1'] = function() {
    var pwd1 = document.getElementById('pwd1');
    if (pwd1.value.length >= 6) {
      pwd1.className = 'correct';
      return true;
    } else {
        pwd1.className = 'incorrect';
      }    
  };

  check['pwd2'] = function() {
    var pwd1 = document.getElementById('pwd1'),
        pwd2 = document.getElementById('pwd2');
    if (pwd1.value === pwd2.value && pwd2.value !== '') {
      pwd2.className = 'correct';
    } else {
        pwd2.className = 'incorrect';
      }      
  };

  return check;
})();

export { check_api };