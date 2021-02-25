$(document).ready(function() {
  // MODAL
  var modalText = {
    venndy: {
      title:'Venndy',
      tag : 'SOCIAL SHOPPING NETWORKING',
      detail: 'VENNDY is all about collection, connection, and collaboration for and between people. VENNDY is a user-generated content platform that focuses on contextual connectivity. It offers a new way to share the right content in the right context with the right audience. Using its proprietary algorithm, VENNDY offers users a multi-layered connectivity system which consolidates the best of stories, items, and people to follow',
      link: 'https://www.venndy.com'
    },
    ecomhunt: {
      title: 'Ecomhunt - Find Winning Products To Sell On Your Online Store!',
      tag:'',
      detail: 'Ecomhunt allows you to easily find products that are already proven to sell or how we like to call them Winning products! - in only a few clicks - it`s time to stop guessing, start selling!',
      link: 'https://ecomhunt.com'
    },
    dhanuka: {
      title: 'Dhanuka FL App',
      tag:'',
      detail: 'Dhanuka FL App is an application for Dhanuka Front Lines team members for Complete Sales process. This is a tool to update ourselves & do smart selling with unmatched Service level. No General information will be available',
      link: 'https://play.google.com/store/apps/details?id=dhanuka.kohinoor&hl=en_IN'
    },
    dogtube: {
      title: '',
      tag: '',
      detail: '',
      link: 'https://www.dogtube.us/'
    }
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});
