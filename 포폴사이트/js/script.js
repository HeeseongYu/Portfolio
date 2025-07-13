$(document).ready(function () {
    // topBtn
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $("#topBtn").fadeIn();
        } else {
            $("#topBtn").fadeOut();
        }
    });

    $("#topBtn").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 300);
        return false;
    });

    // gnb scroll
    $("#gnb a").click(function (e) {
        //a태그의 기본이벤트 제거

        var hash = this.hash;

        // $("선택자").animate({변경할CSS},변화시간,콜백함수);
        $("html,body").animate({
            scrollTop: $(hash).offset().top
        }, 500, function () {
            window.location.hash = hash;
        });
        return false;
    });//$("#header a").click() end

    // storyboard scrollbox
    $(document).on('click', '.storyBoard', function (e) {
        e.preventDefault();
        // 현재 슬라이드의 storyBoardCon 요소를 복제해서 body에 추가
        var storyContent = $(this).closest('.slide-content').siblings('.storyBoardCon').clone();

        // 기존 팝업 제거 (혹시 열려있을 경우)
        $('.popupOverlay').remove();

        // 새로운 팝업 오버레이 생성
        var overlay = $('<div class="popupOverlay"></div>');
        overlay.append(storyContent);

        // body에 추가하고 표시
        $('body').append(overlay);
        storyContent.css('display', 'block')

        // 스크롤 방지
        $('body').css('overflow', 'hidden');

    });

    // 팝업 닫기 (동적으로 생성된 요소에 이벤트 바인딩)
    $(document).on('click', '.popupOverlay', function (e) {
        // 배경 클릭 시에만 닫기 (내용 클릭 시 닫히지 않도록)
        if ($(this).hasClass('popupOverlay')) {
            $(this).fadeOut(300, function () {
                $(this).remove();
                $('body').css('overflow', 'auto');
            });
        }
        $('.storyBoardCon').css('display', 'none')
    });

    // Introduce ScrollMagic 
    gsap.registerPlugin(ScrollTrigger);
    // eyes Blink
    ScrollTrigger.create({
        start: "top bottom",
        end: "bottom top",
        trigger: ".mid-banner",
        onEnter:
            () => { $(".mid-banner").addClass("blinkActive") },
        onLeaveBack: () => { $(".mid-banner").removeClass("blinkActive"); },
        markers: "true",
        id: "blink",
    });

    // introduceTitle1
    var introduce1 = gsap.to(".introduceTitle1", {
        xPercent: 100,
        scrollTrigger: {
            trigger: "#workSec",
            start: "50% top",
            end: "bottom top",
            scrub: true,
            markers: true,
            id: "introSlide"
        },
    });
    // introduceTitle2
    var introduce2 = gsap.to(".introduceTitle2", {
        xPercent: -100,
        scrollTrigger: {
            trigger: "#workSec",
            start: "50% top",
            end: "bottom top",
            scrub: true,
        },
    });

    //profileCard Up
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".profileCard",
            start: "top bottom",
            end: "bottom top",
            toggleActions: "restart none",
            markers: true,
            id: "Card"
        },
    });
    tl.fromTo(".profileCard",
        { y: 150, opacity: 0.8 },
        { y: 0, opacity: 1, ease: "power4", duration: 2 }
    );

    // skillsWave
    // var tween4 = gsap .fromTo(".skillContent>ul li",
    //     { y: 20

    //     },
    //     {

    //     }
    // );

    var skillsWave = gsap.timeline();

    skillsWave.fromTo(".skillContent>ul li",
        {
            y: 25,
            scale: 0.5,
            opacity: 0,
            duration: 2,
            scrollTrigger: {
                trigger: ".skillContent>ul",
                start: "top bottom",
                markers: true,
                id: "skill"
            }
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            delay: 0.5,
            stagger: 0.1,
            ease: "back.in",
            yoyo: true

        }

    );


    // QR popup
    $(".flip:last-child .card .back").click(function () {
        $("#qrPopbg").fadeIn(100);
    });
    $("#qrPop span").click(function () {
        $("#qrPopbg").fadeOut(100);
    });

});
