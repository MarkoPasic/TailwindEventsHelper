var DropdownOpened = false;

var TailwindEvents = (function () {
  var HideModal = function (element) {
    var modal = $("#" + element);

    modal.removeClass("opacity-100").addClass("opacity-0");

    setTimeout(function () {
      modal.css("display", "none");
    }, 500);
  };

  var ShowLoading = function () {
    $("#search-icon").addClass("hidden");
    $("#search-loading").removeClass("hidden");
  };

  var HideLoading = function () {
    $("#search-icon").removeClass("hidden");
    $("#search-loading").addClass("hidden");
  };

  var SetLayoutEvents = function () {
    // var element = $(
    //   'a[href^="' + window.location.pathname + '"].sidemenu-item'
    // );
    // if (window.location.pathname == "/") {
    //   $(".side-menu-dashboard")
    //     .addClass("text-white bg-[#7094e0]")
    //     .parent()
    //     .addClass("bg-[#7094e0]");
    // } else {
    //   element.each(function (i, el) {
    //     $(el)
    //       .removeClass("text-gray-400 hover:text-white hover:bg-gray-800")
    //       .addClass("text-white bg-[#7094e0]")
    //       .parent()
    //       .addClass("bg-[#7094e0]");
    //   });
    // }
  };

  var initTippy = function () {
    $(".tippy").each(function (i, el) {
      tippy(el, {
        placement: "bottom-end",

        content: $(el).data("title"),
      });
    });
  };

  var RegisterEvents = function () {
    HideLoading();

    $("#side-menu-btn").on("click", toggleMenu);

    function toggleMenu() {
      $("#mobile-menu").toggleClass("hidden");
    }

    $("[data-modal]").on("click", showModal);

    function showModal() {
      var element = $(this);
      var dataId = element.data("modal");

      var modal = $("#" + dataId);
      modal.css("display", "block");
      setTimeout(function () {
        modal.removeClass("opacity-0").addClass("opacity-100");
      }, 50);
    }

    $("[data-bs-dismiss]").on("click", hideModal);

    function hideModal() {
      var modal = $(this).closest(".modal");
      modal.removeClass("opacity-100").addClass("opacity-0");

      setTimeout(function () {
        modal.css("display", "none");
      }, 500);
    }

    $("[data-toggle-dropdown]").each(function () {
      var element = $(this);
      var dataId = element.data("toggle-dropdown");

      element.unbind().on("click", toggleElementVisibility);

      function toggleElementVisibility() {
        var elem = $("#" + dataId);

        if (elem.hasClass("hidden")) {
          elem.removeClass("hidden").addClass("block");

          setTimeout(function () {
            DropdownOpened = true;
          }, 500);
        } else {
          elem.removeClass("block").addClass("hidden");
          DropdownOpened = false;
        }
      }
    });

    var RemoveOpenedDropdowns = function (e) {
      $("[data-toggle-dropdown-menu]").each(function (i, el) {
        $(el).removeClass("block").addClass("hidden");
      });
      DropdownOpened = false;
    };

    $(document).on("click", function (event) {
      if (
        !$(event.target).closest(".filter-dorpdown").length &&
        DropdownOpened
      ) {
        RemoveOpenedDropdowns();
      }
    });
  };

  return {
    init: function () {
      initTippy();
      setTimeout(() => {
        RegisterEvents();
      }, 1000);
    },
    hideModal: function (element) {
      return HideModal(element);
    },
    registerEvents: function () {
      return RegisterEvents();
    },
    showLoading: function () {
      return ShowLoading();
    },
    hideLoading: function () {
      return HideLoading();
    },
  };
})();

$(document).ready(function () {
  TailwindEvents.init();
});
