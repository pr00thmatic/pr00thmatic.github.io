var flow = (() => {
  var initializeDuration = 1000;
  var warningDuration = 5000;
  var respawnWait = 8000;

  var unstickTheCard = function () {
    if (!game.isCardInside) return;
    game.isCardInside = false;
    goToScreen("0");
    game.card.setEnabled(true);
    game.skeleton.beginAnimation("UnstickTheCard", false, 1, function () {
      game.card.actionManager.registerAction(game.card.stickInAction);
    });
  }

  var babylonAction = function (f) {
    return new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, f );
  };

  var handlePinInput = function () {
    if (game.numbersPanel.isEnabled && game.numbersPanel.button.input.length >= 4) {
      if (game.numbersPanel.button.input === '0000') {
        goToScreen("7"); // code accepted, do your stuff
      } else { // wrong code!
        goToScreen("5");

        if (++game.wrongCode >= 3) {
          game.capturedCard = true;
          retainCard();
        }
      }
    }
  };

  var retrieve = function () {
    var receipt = flow.scene.getMeshByName("receipt hitbox");
    var money = flow.scene.getMeshByName("money out hitbox");

    receipt.actionManager.actions = [];
    money.actionManager.actions = [];

    game.skeleton.beginAnimation("retrieve receipt and money", false);
    setTimeout(() => {
      goToScreen("16");
    }, 1000);
  }

  var spit = function (requestReceipt) {
    goToScreen("14");
    flow.scene.getMeshByName("receipt").setEnabled(requestReceipt);
    var receipt = flow.scene.getMeshByName("receipt hitbox");
    receipt.setEnabled(requestReceipt);
    var money = flow.scene.getMeshByName("money out hitbox");

    game.skeleton.beginAnimation("SpitMoneyAndReceipt", false, 1, function () {
      receipt.actionManager = new BABYLON.ActionManager(flow.scene);
      receipt.actionManager.registerAction(babylonAction(function () {
        retrieve();
      }));
      money.actionManager = new BABYLON.ActionManager(flow.scene);
      money.actionManager.registerAction(babylonAction(function () {
        retrieve();
      }));
    });
  }

  var whithdrawScreen = {
    buttons: ['touch r 0', 'touch r 1', 'touch r 2', 'touch r 3'],
    actions: [
      babylonAction(function () { goToScreen("10"); }),
      babylonAction(function () { goToScreen("10"); }),
      babylonAction(function () { goToScreen("10"); }),
      babylonAction(function () { goToScreen("10"); }),
    ]
  };

  var screens = {
    "3": { // language
      buttons: ['touch r 1',  'touch r 2'],
      actions: [
        babylonAction(function () { goToScreen("4"); }),
        babylonAction(function () { goToScreen("4"); })
      ]
    },
    "4": { // pin
      requirePin: true,
      hidePin: true,
      onInput: handlePinInput
    },
    "5": { // wrong pin, try again
      requirePin: true,
      hidePin: true,
      onInput: handlePinInput
    },
    "23": { // canceled transaction
      buttons: ['touch r 1', 'touch r 2'],
      actions: [
        babylonAction(unstickTheCard),
        babylonAction(function () { goToScreen("4"); })
      ]
    },
    "7": { // whatcha gonna do?
      buttons: ['touch l 3'],
      actions: [
        babylonAction(function () { goToScreen("8"); })
      ]
    },
    "8": { // retiro
      buttons: ['touch r 0', 'touch r 1', 'touch r 2'],
      actions: [
        babylonAction(function () {
          goToScreen("46");
          game.blocked = true;
          setTimeout(() => {
            game.blocked = false;
            game.cancelFunction();
          }, warningDuration);
        }),
        babylonAction(function () { goToScreen("45"); }),
        babylonAction(function () { goToScreen("47"); })
      ]
    },
    "11": {
      buttons: ['touch r 1', 'touch r 2'],
      actions: [
        babylonAction(function () { game.erasePanels(); }),
        babylonAction(function () {
          console.log((game.amountPanel.value / 100) % 10);
          if (game.amountPanel.value == 0 || (game.amountPanel.value / 100) % 10 != 0 ||
              (game.amountPanel.value/100) > 3000) {
            goToScreen("57");
          } else {
            goToScreen("12");
          }
        }),
      ],
      requireAmount: true
    },
    "10": { // whithdraw amount
      buttons: ['touch r 1'],
      actions: [
        babylonAction(function () { goToScreen("11"); })
      ]
    },
    "12": { // receipt?
      buttons: ['touch r 1', 'touch r 2'],
      actions: [
        babylonAction(function () { spit(false); }),
        babylonAction(function () { spit(true); })
      ]
    },
    "45": whithdrawScreen,
    "47": whithdrawScreen,
    "16": { // something else?
      buttons: ['touch r 1', 'touch r 2'],
      actions: [
        babylonAction(unstickTheCard),
        babylonAction(() => goToScreen("4"))
      ]
    }
  };

  var disableAllButtons = function () {
    for (var i=0; i<4; i++) {
      var mesh = flow.scene.getMeshByName("touch r " + i);
      if (mesh.actionManager) {
        mesh.actionManager.actions = [];
      }
      var mesh = flow.scene.getMeshByName("touch l " + i);
      if (mesh.actionManager) {
        mesh.actionManager.actions = [];
      }
    }
  }

  var goToScreen = function (screenName) {
    game.goToScreen(screenName);
    disableAllButtons(flow.scene);
    if (screens[screenName]) {
      if (screens[screenName].buttons) {
        for (var i=0; i<screens[screenName].buttons.length; i++) {
          var button = flow.scene.getMeshByName(screens[screenName].buttons[i]);
          button.actionManager = new BABYLON.ActionManager(flow.scene);
          button.actionManager.registerAction(screens[screenName].actions[i]);
        }
      }
      if (screens[screenName].requirePin) {
        game.numbersPanel.setEnabled(true);
        game.hidePin = screens[screenName].hidePin;
        game.numbersPanel.button.textBlock.text = "";
        game.numbersPanel.button.input = "";
      } else {
        game.numbersPanel.setEnabled(false);
      }
      if (screens[screenName].requireAmount) {
        game.amountPanel.setEnabled(true);
        game.amountPanel.value = 0;
        game.amountPanel.button.textBlock.text = "0.00";
      } else {
        game.amountPanel.setEnabled(false);
      }
      if (flow.toRemove) {
        document.removeEventListener('onNumpadInput', flow.toRemove);
      }
      if (screens[screenName].onInput) {
        flow.toRemove = screens[screenName].onInput;
        document.addEventListener('onNumpadInput', flow.toRemove);
      }
    } else {
      game.numbersPanel.setEnabled(false);
      game.amountPanel.setEnabled(false);
    }
  };

  var cancel = function () {
    goToScreen("23");
  }

  var initializeChip = function () {
    // goToScreen("10");
    // game.isCardInAnimationOver = true;

    console.log("WTF?!");
    game.card.setEnabled(false);
    game.isCardInAnimationOver = false;
    goToScreen("1");
    setTimeout(() => {
      goToScreen("2");
      setTimeout(() => {
        goToScreen("3");
        game.isCardInAnimationOver = true;
      }, initializeDuration/2);
    }, initializeDuration/2);
  };

  var retainCard = function () {
    goToScreen("6");
    setTimeout(() => {
      goToScreen("0");
    }, warningDuration);

    setTimeout(() => {
      game.skeleton.beginAnimation("RespawnCard", false, 1, function () {
        game.wrongCode = 0;
        game.capturedCard = game.isCardInAnimationOver = game.isCardInside = false;
      });
    }, respawnWait);
  }

  return {
    initializeChip: initializeChip,
    cancel: cancel,
    goToScreen: goToScreen
  };
})();
