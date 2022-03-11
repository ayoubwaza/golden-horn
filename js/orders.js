const spSheet =
  "https://script.google.com/macros/s/AKfycbwRpLfkX_Hz3PswCws74ZO0TSq2q38lcwXB97vJXy1klf40h86kAwAPwmWHaler6OzBCQ/exec";
var request;
$("#request-form").on("submit", function (e) {
  e.preventDefault();
  if (request) {
    request.abort();
  }
  var $form = $(this);
  var $inputs = $form.find("input, select, button, textarea");
  if (
    !$("#Phone").val() ||
    $("#Phone").val().length < 10 ||
    $("#Phone").val().charAt("0") !== "0"
  ) {
    alert("رقم الهاتف الذي تم إدخاله غير صحيح");
  } else {
    document.getElementById("submitbutton").style.opacity = "0.5";
    document.getElementById("submitbutton").style.pointerEvents = "none";
    document.getElementById("submitbutton").innerHTML = "المرجو الإنتظار...";
    var serializedData = $form.serialize();
    $inputs.prop("disabled", false);
    e.preventDefault();
    var request = $.ajax({
      url: spSheet,
      method: "POST",
      dataType: "jsonp",
      data: serializedData,
      success: function () {
        console.log("it worked");
      },
    });
    gtag_report_conversion();
    request.always(function () {
      setTimeout(function () {
        window.location.href = "success.html";
      }, 300);
    });
  }
});
