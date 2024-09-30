const localnavMenustate = document.querySelector('.localnav-menustate');
const navbar = document.querySelector('.flyout_nav');
const menu = document.querySelector('.menu');
const blurr = document.querySelector('.blur_navbar_container');
const menuItems = document.querySelectorAll('.menu li a');

if (localnavMenustate && navbar && menu && blurr && menuItems) {
  localnavMenustate.addEventListener('change', () => {
    if (localnavMenustate.checked) {
      navbar.classList.add('expanded');
      menu.classList.add('open');
      blurr.classList.add('blur');
    } else {
      navbar.classList.remove('expanded');
      menu.classList.remove('open');
      blurr.classList.remove('blur');
    }
  });
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      if (localnavMenustate.checked) {
        navbar.classList.remove('expanded');
        menu.classList.remove('open');
        blurr.classList.remove('blur');
        localnavMenustate.checked = false;
      }
    });
  });
  document.addEventListener('scroll', () => {
    if (localnavMenustate.checked) {
      navbar.classList.remove('expanded');
      menu.classList.remove('open');
      blurr.classList.remove('blur');
      localnavMenustate.checked = false;
    }
  });
  blurr.addEventListener('click', () => {
    if (localnavMenustate.checked) {
      navbar.classList.remove('expanded');
      menu.classList.remove('open');
      blurr.classList.remove('blur');
      localnavMenustate.checked = false;
    }
  });
}


document.addEventListener("DOMContentLoaded", function () {
  const blockBlur = $('.blur_card_container');

  function isElementInViewport(el) {
    if (el.length === 0) {
      return false;
    }

    var rect = el[0].getBoundingClientRect();
    var threshold = window.innerWidth <= 767 ? 80 : 200; 
    return (
      rect.top >= -threshold && 
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold && 
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleScroll() {
    const flippedBlocks = $(".about_us_container .block.flipped");
    flippedBlocks.each(function () {
      if (!isElementInViewport($(this))) {
        $(this).removeClass("flipped");
        const block = $(this);
        setTimeout(function () {
          blockBlur.removeClass('show_blur');
        }, 700);
        blockBlur.removeClass('blur_anim');
        setTimeout(function () {
          block.removeClass("index");
        }, 700);
      }
    });
  }

  window.addEventListener("scroll", handleScroll);

  blockBlur.click(function () {
    const flippedBlocks = $(".about_us_container .block.flipped");
    flippedBlocks.each(function () {
      const block = $(this);
      block.removeClass("flipped");
      setTimeout(function () {
        blockBlur.removeClass('show_blur');
      }, 700);
      blockBlur.removeClass('blur_anim');
      setTimeout(function () {
        block.removeClass("index");
      }, 700);
    });
  });

  $(".flip-button").click(function () {
    const block = $(this).closest(".about_us_container .block");

    if (block.hasClass("flipped")) {
      block.removeClass("flipped");
      setTimeout(function () {
        blockBlur.removeClass('show_blur');
      }, 700);
      blockBlur.removeClass('blur_anim');
      setTimeout(function () {
        block.removeClass("index");
      }, 700);
    } else {
      block.addClass("flipped");
      blockBlur.addClass('show_blur');
      setTimeout(function () {
        blockBlur.addClass('blur_anim');
      }, 100);
      block.addClass("index");
    }
  });
});


$(document).ready(function() {
  if ($(".question").length > 0) {
    $(".question").click(function() {
      const answer = $(this).next(".answer");
      answer.slideToggle();
      $(this).find(".toggle-btn").toggleClass("active");
    });
  }

  if ($(".toggle-btn").length > 0) {
    $(".toggle-btn").click(function(e) {
      e.stopPropagation(); 
      const answer = $(this).closest(".faq_item").find(".answer");
      answer.slideToggle();
      $(this).toggleClass("active");
    });
  }
});



document.getElementById("submitBtn").addEventListener("click", function(event) {
  event.preventDefault(); 
  var name = document.getElementById("nameInput").value;
  var phone = document.getElementById("phoneInput").value;
  if (name.trim() === "" || phone.trim() === "") {
      if (name.trim() === "") {
          document.querySelector(".first-input").classList.add("error");
          document.querySelector(".first-label").classList.add("error");
          document.querySelector(".contact_error_container.one").style.display = "block";
      } else {
          document.querySelector(".first-input").classList.remove("error");
          document.querySelector(".first-label").classList.remove("error");
          document.querySelector(".contact_error_container.one").style.display = "none";
      }
      if (phone.trim() === "") {
          document.querySelector(".third-input").classList.add("error");
          document.querySelector(".third-label").classList.add("error");
          document.querySelector(".contact_error_container.three").style.display = "block";
      } else {
          document.querySelector(".third-input").classList.remove("error");
          document.querySelector(".third-label").classList.remove("error");
          document.querySelector(".contact_error_container.three").style.display = "none";
      }
  } else {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "submit_form.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                  console.log("Дані успішно відправлено!");
                  document.querySelector(".contact_container").classList.add("filled");
                  document.querySelector(".contact_container_filled").classList.add("filled");
              } else {
                  console.log("Щось пішло не так. Спробуйте пізніше.");
                  document.querySelector(".contact_container").classList.add("filled");
                  document.querySelector(".contact_container_error").classList.add("filled");
              }
          }
      };
      xhr.send("name=" + name + "&phone=" + phone);
  }
});





