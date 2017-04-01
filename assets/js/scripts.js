$(document).ready(function () {

    // ======================================================
    // Main bootstrap of functions ==========================
    // ======================================================
    initFP('.topic-home');


    // Remove the cover
    $('.topic-cover').click(function () {
        $.fn.fullpage.moveSectionDown();
        // $('.topic-cover').remove();
        // $.fn.fullpage.reBuild;

    });

    // Move around the menu items
    $('#menu .check-list').on('click', function (e) {
        e.preventDefault();

        var topicClass = $(this).data('target');
        check('.checkbox-' + topicClass);

        setTimeout(function () {
            $('.topic-cover').remove();
            $('.topic').addClass('topic-hidden');
            $(".menu." + topicClass).removeClass('topic-hidden');
            $('.' + topicClass).removeClass('topic-hidden');
            $.fn.fullpage.reBuild;
            $.fn.fullpage.destroy('all');

            initFP('.' + topicClass);
            $.fn.fullpage.moveTo(2);

        }, 300);


    });
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
function closeGallery(e,backToSection) {
    $.fn.fullpage.silentMoveTo(backToSection);    
    $(e).parent().addClass('hidden');
    $('.gallery-container').addClass('ignore');
}

function moveTo(sectionNumber, slideNumber, slideContainer, silent) {
    
    var secN = parseInt(sectionNumber, 10);
    var sldN = parseInt(slideNumber, 10) - 1;
    $(slideContainer).removeClass('hidden');
    $('.gallery-container').removeClass('ignore');
    
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
    $.fn.fullpage.moveTo('intro');
}

function initFP(topicClass = '.topic') {

    $('#wrapper').fullpage({

        //Navigation
        // menu: '#menu',
        lockAnchors: true,
        anchors: ['intro', 'home'],//, 'building-interior', 'renovation', 'building-management'
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide'],
        showActiveTooltip: false,
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
        normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
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
        responsiveWidth: 768,
        responsiveHeight: 0,
        responsiveSlides: false,
        parallax: false,
        parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate' },

        //Custom selectors
        sectionSelector: topicClass,
        slideSelector: '.slide',

        lazyLoading: true,

        //events
        onLeave: function (index, nextIndex, direction) {
           var destinationToIgnore = $('.topic').eq(nextIndex).hasClass('ignore');
            console.log(destinationToIgnore);
            if(destinationToIgnore){
                var destination = (direction === 'down') ? nextIndex + 1 : nextIndex - 1
                return false;
                // $.fn.fullpage.moveTo(destination); doesnt work
                // $.fn.fullpage.silentMoveTo(1);
                
            }
        },
        afterLoad: function (anchorLink, index) {
           
        },
        afterRender: function () { },
        afterResize: function () { },
        afterResponsive: function (isResponsive) { },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) { },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) { }

    });
}