'use strict';

const arrNames = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const arrSurname = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const arrCoatColor = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const arrEyesColor = [`black`, `red`, `blue`, `yellow`, `green`];
const COUNT_WIZARD = 4;

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

let userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

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
