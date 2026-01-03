

(function($) {
	"use strict";
    // sticky menu
    var header = $('.menu-sticky');
    var win = $(window);

    win.on('scroll', function() {
       var scroll = win.scrollTop();
       if (scroll < 1) {
           header.removeClass("sticky");
       } else {
           header.addClass("sticky");
       }

        $("section").each(function() {
        var elementTop = $(this).offset().top - $('#rs-header').outerHeight();
            if(scroll >= elementTop) {
                $(this).addClass('loaded');
            }
        });

    });
})

var href1 = document.getElementById("aaa").href;
//alert(href1);
// Define the developer's URL
var developerURL = "https://alokha.com/";

// Get the current URL
var currentURL = href1;

// Check if the current URL matches the developer's URL
if (currentURL !== developerURL) {
    // Redirect the user to a different page or display an error message
    window.location.href = "access-denied.html";
}
