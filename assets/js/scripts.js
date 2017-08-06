$(document).ready(function () {

    $('.info-button').attr('data-target', '1_info');

    var currInfo = '1_info';
    $('.info-credits .credits').html($('#' + currInfo + '_credits').val());
    $('.info-credits .name').html( $('#' + currInfo + '_name').val() );
    
    // ======================================================
    // Main bootstrap of functions ==========================
    // ======================================================
    initFP('.topic-home');

    setTimeout(function () {
        window.scrollTo(0, 1);
    }, 1000);

    // Remove the cover
    $('.cover').on('click', function () {
        $.fn.fullpage.moveSectionDown();
        // $('.topic-cover').remove();
        // $.fn.fullpage.reBuild;

    });

    // Move next when Section image is clicked
    $('.topic-bkg').click(function () {
        $.fn.fullpage.moveSectionDown();
    });

    // Move around the menu items
    $('#menu .check-list, .goToTopic').on('click', function (e) {
        e.preventDefault();

        var topicClass = $(this).data('target');
        check('.checkbox-' + topicClass);

        setTimeout(function () {
            // $('.topic-cover').remove();
            $('.topic').addClass('topic-hidden');
           
            $(".menu." + topicClass).removeClass('topic-hidden');
            $(".cover." + topicClass).removeClass('topic-hidden');
           
            $('.' + topicClass).removeClass('topic-hidden');
            $.fn.fullpage.reBuild;
            $.fn.fullpage.destroy('all');

            initFP('.' + topicClass);
            $.fn.fullpage.silentMoveTo(1); // With cover is 2
            $.fn.fullpage.moveTo(2);// With cover is 3
            $('#topicClassName').val('.' + topicClass);

        }, 300);


    });
});


window.currBackSection;

// $('.contact-ul input').click(function () {
//     var list = '';
//     $('input[name="services[]"]:checked').each(function () {
//         list = list + ' - ' + $(this).val();
//     });
    
//     $('#listcontact').val(list);
    
// });


$(document).mousemove(function (e) {
    clearTimeout(timeout);
    $('.fp-controlArrow').addClass('forceVisible');
    $('.galleryCloseBtn').addClass('forceVisible');

    var timeout = setTimeout(function() {
        $('.fp-controlArrow').removeClass('forceVisible');
       $('.galleryCloseBtn').removeClass('forceVisible'); 
    }, 4000);

    
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        var secN = parseInt(currBackSection, 10);
        var secBack = secN - 1;
        var topicClass = $('#topicClassName').val();
        
        closeGallery( $(topicClass + '.gallery-container .navigation-down'), secBack) ;
    }
});

// ====================================================
// Function to check off the checkboxes
// ====================================================
function check(elem) {

    $(elem).each(function () {
        console.log('elem');
        $(this).attr('checked', true);
        $(this).prop('checked', true);
    });
    console.log(elem);
}

// ====================================================
// Functions to move ==================================
// ====================================================
function closeGallery(e, backToSection) {
    $(e).parent().addClass('hidden');
    $('.gallery-container').addClass('ignore');

    var topicClass = $('#topicClassName').val();
    $.fn.fullpage.reBuild;
    $.fn.fullpage.destroy('all');
    initFP(topicClass);
    $.fn.fullpage.silentMoveTo(backToSection);    
}


function moveTo(sectionNumber, slideNumber, slideContainer, silent) {
    var topicClass = $('#topicClassName').val();
    var secN = parseInt(sectionNumber, 10);
    var sldN = parseInt(slideNumber, 10) - 1;
    $(slideContainer).removeClass('hidden');
    $('.gallery-container').removeClass('ignore');

    window.currBackSection = sectionNumber;
    
    $.fn.fullpage.reBuild;
    $.fn.fullpage.destroy('all');
    initFP(topicClass);

    if (silent) {
        $.fn.fullpage.silentMoveTo(secN, sldN);
    }
    else {
        $.fn.fullpage.moveTo(secN, sldN);    
    }
 
    
}
function moveSectionDown() {
    $.fn.fullpage.moveSectionDown();
}

function moveToMenu() {
    $.fn.fullpage.moveTo('home');
}

function goToAbout(e) {
   
        var topicClass = 'topic-peace';
        check('.checkbox-' + topicClass);

        setTimeout(function () {
            // $('.topic-cover').remove();
            $('.topic').addClass('topic-hidden');
           
            $(".menu." + topicClass).removeClass('topic-hidden');
            $(".cover." + topicClass).removeClass('topic-hidden');
           
            $('.' + topicClass).removeClass('topic-hidden');
            $.fn.fullpage.reBuild;
            $.fn.fullpage.destroy('all');

            initFP('.' + topicClass);
            $.fn.fullpage.silentMoveTo(0); // this is 2 when cover
            $.fn.fullpage.moveTo(2); // This is 4 when cover
            $('#topicClassName').val('.' + topicClass);

        }, 300);
}

// ====================================================
// Open tooltip of image ==============================
// ====================================================
$('.close-info').click(function () {
    var currInfo = $(this).data('target');
    $('#' + currInfo).addClass('hidden');
    console.log(currInfo);
});

$('.info-button').on('click', function () {
    // var currInfo = $(this).data('target');
    // $('.info-credits .credits').html($('#' + currInfo + '_credits').val());
    // $('.info-credits .name').html( $('#' + currInfo + '_name').val() );
    $('.info-credits').removeClass('hidden');

})

function ignoreNextDestination(index, nextIndex, direction) {
    var topicClass = $('#topicClassName').val();
    var destinationToIgnore = $(topicClass).eq(nextIndex-1).hasClass('ignore');
    console.log('destination', destinationToIgnore);
    if (destinationToIgnore) {
        var destination = (direction === 'down') ? index + 1 : index - 1
        return false;
    }
}

//function initFP(topicClass = ('.topic')) {


// used EC6 default topic that IE doesn't support. Changed.
function initFP(topicClass) {

topicClass = typeof topicClass !== 'undefined' ? topicClass : '.topic';


    $('#wrapper').fullpage({

        //Navigation
        // menu: '#menu',
        lockAnchors: true,
        anchors: ['home'],//,  anchors: ['intro', 'home'] 'building-interior', 'renovation', 'building-management'
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide'],
        showActiveTooltip: true,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        dragAndMove: false,
        offsetSections: false,
        resetSliders: false,
        fadingEffect: false,
        normalScrollElements: '#grid-interior',
        scrollOverflow: true,
        scrollOverflowReset: false,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        sectionsColor: ['#ccc', '#fff'],
        // paddingTop: '3em',
        // paddingBottom: '10px',
        // fixedElements: '#menu, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,
        responsiveSlides: true,
        parallax: false,
        parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate' },

        //Custom selectors
        sectionSelector: topicClass,
        slideSelector: '.slide',

        lazyLoading: true,

        //events
        onLeave: function (index, nextIndex, direction) {

            return ignoreNextDestination(index, nextIndex, direction);

        },
        afterLoad: function (anchorLink, index) {
           
        },
        afterRender: function () { },
        afterResize: function () { },
        afterResponsive: function (isResponsive) { },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            // setTimeout(function () {
                
                $('.info-button').attr('data-target', slideIndex + '_info');
            
                var currInfo = slideIndex + '_info';
                $('.info-credits .description').html($('#' + currInfo + '_description').val());
                $('.info-credits .credits').html($('#' + currInfo + '_credits').val());
                $('.info-credits .name').html($('#' + currInfo + '_name').val());
            
            // }, 1000);
        },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
            $('.info-credits').addClass('hidden'); 
            
            
         }

    });
}