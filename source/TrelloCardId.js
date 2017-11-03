(function() {

  (function() {
    var TrelloCardId;

    TrelloCardId = (function() {
      function TrelloCardId(config) {
        this.config = config;
        this.actionSelectorPrimary  = ".window-sidebar .other-actions .u-clearfix";
        this.actionSelectorFallback = ".window-sidebar .window-module:first-child .u-clearfix";
        this.listen();
      }

      TrelloCardId.prototype.listen = function() {
        return window.addEventListener("message", (function(_this) {
          return function(event) {
            if (event.data.trelloUrlChanged === null) {
              return;
            }
            return _this.addButtonIfOnCard();
          };
        })(this));
      };

      TrelloCardId.prototype.addButtonIfOnCard = function() {
        var c, cardId, _, _ref;
        _ref = window.location.pathname.split("/");
        c = _ref[1];
        cardId = _ref[2];

        if (!(c === "c" && (cardId !== null))) {
          return;
        }
        this.buildButton(cardId);
        return true;
      };

      TrelloCardId.prototype.buildButton = function(cardId) {
        var oldButton = document.getElementById('trello-card-id-button');
        if (oldButton !== null) {
          oldButton.remove();
        }

        var actions, icon, label;
        actions = document.querySelector(this.actionSelectorPrimary);
        if (actions == undefined) {
          actions = document.querySelector(this.actionSelectorFallback);
        }

        if (actions == null) {
          return;
        }

        this.button = document.createElement("a");
        this.button.className = "button-link js-add-trello-card-id";
        this.button.setAttribute("id", "trello-card-id-button");
        this.button.setAttribute("title", "Copy the id for this card to the clipboad");
        this.button.dataset.cardId = cardId;

        icon = document.createElement("span");
        icon.className = "icon-sm icon-card";
        this.button.appendChild(icon);
        this.button.addEventListener("click", this.buttonClick);

        label = document.createElement("span");
        label.className = "button-label";
        label.innerHTML = " Card ID";
        this.button.appendChild(label);

        return actions.insertBefore(this.button, actions.children[0]);
      };

      TrelloCardId.prototype.buttonClick = function(event) {
        var label = this.querySelector("span.button-label");
        label.innerHTML = " Copied...";

        cardId = this.dataset.cardId;

        var t = document.createElement('input');
        t.setAttribute('type', 'text');
        t.value = cardId;
        this.appendChild(t);
        t.focus();
        t.select();
        document.execCommand('Copy', false, null);
        t.remove();

        setTimeout(function() { label.innerHTML = " Card ID"; }, 750);
      };

      return TrelloCardId;
    })();

    return new TrelloCardId({});
  })();

}).call(this);
