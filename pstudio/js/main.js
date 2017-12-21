$(function () {
    setNavMHeight();
    // 移动端点击按钮navM的变化
    $(".navBtn").click(function () {
        if ($(this).hasClass("navShow")) {
            $(this).removeClass("navShow")
            $(".navM").slideUp();
        } else {
            $(this).addClass("navShow")
            $(".navM").slideDown();
        }
        return false;
    });
    // nav的隐藏和显示
    $(".navBtn2").click(function () {
        if ($(this).hasClass("navShow")) {
            $(this).removeClass("navShow")
            $(".nav").animate({ left: 0, opacity: "show" });

        } else {
            $(this).addClass("navShow")
            $(".nav").animate({ left: 50, opacity: "hide" });
        }
        return false;
    });
    // 保持navM的高度为整屏减56
    $(window).resize(function () {
        setNavMHeight();
    });
    // 触顶head的一个动态变化
    $(window).scroll(function () {
        var sT = $(window).scrollTop();
        if (sT > 0) {
            $(".head").addClass("headFixed");
        } else {
            $(".head").removeClass("headFixed");
        }

    });
    // 设置在移动端nav的高度为window高度减56
    function setNavMHeight() {
       $(".navM").height($(window).height() - 56);
        
    }
});