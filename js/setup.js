'use strict';

const arrNames = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const arrSurname = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const arrCoatColor = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const arrEyesColor = [`black`, `red`, `blue`, `yellow`, `green`];
const COUNT_WIZARD = 4;
const userDialog = document.querySelector(`.setup`);
const setupOpen = document.querySelector('.setup-open');
const setupClose = userDialog.querySelector('.setup-close');
const coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const eyesColor = ['black', 'red', 'blue', 'yellow', 'green '];
const fireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
const setupWizard = document.querySelector('.setup-wizard');
const wizardCoat = setupWizard.querySelector('.wizard-coat');
const wizardEyes = setupWizard.querySelector('.wizard-eyes');
const elementFireball = userDialog.querySelector('.setup-fireball-wrap');
const inputFireballColor = elementFireball.querySelector('input');
const inputCoatColor = userDialog.querySelector("input[name='coat-color']");
const inputEyesColor = userDialog.querySelector("input[name='eyes-color']");

let getRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

let createWizard = function () {
  let randomNumName = getRandomNumber(arrNames.length);
  return {
    name: arrNames[randomNumName] + ` ` + arrSurname[randomNumName],
    coatColor: arrCoatColor[getRandomNumber(arrCoatColor.length)],
    eyesColor: arrEyesColor[getRandomNumber(arrEyesColor.length)],
  };
};

let arrWizard = [];
for (let i = 1; i <= COUNT_WIZARD; i++) {
  arrWizard.push(createWizard());
}

let similarListElement = userDialog.querySelector(`.setup-similar-list`);

let similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

let renderWizard = function (wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  return wizardElement;
};

let createFragmentSetup = function () {
  let fragment = document.createDocumentFragment();
  arrWizard.forEach((item) => {
    fragment.appendChild(renderWizard(item));
  });
  return fragment;
};
similarListElement.appendChild(createFragmentSetup());
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

const onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (document.activeElement.className !== "setup-user-name") {
      closePopup();
    }
  }
};

const fillCoatWizard = function () {
  let randomNumColor = getRandomNumber(coatColor.length);
  let color = coatColor[randomNumColor];
  wizardCoat.style.fill = color;
  inputCoatColor.value = color;
};

const fillEyesWizard = function () {
  let randomNumColor = getRandomNumber(eyesColor.length);
  let color = eyesColor[randomNumColor];
  wizardEyes.style.fill = color;
  inputEyesColor.value = color;
};

const fillFireballWizard = function () {
  let randomNumColor = getRandomNumber(fireballColor.length);
  let color = fireballColor[randomNumColor];
  inputFireballColor.value = color;
  elementFireball.style.background = color;
};

const openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  wizardCoat.addEventListener('click', fillCoatWizard);
  wizardEyes.addEventListener('click', fillEyesWizard);
  elementFireball.addEventListener('click', fillFireballWizard);
};

const closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  wizardCoat.removeEventListener('click', fillCoatWizard);
  wizardEyes.removeEventListener('click', fillEyesWizard);
  elementFireball.removeEventListener('click', fillFireballWizard);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

