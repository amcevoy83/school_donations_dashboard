
$(document).ready(function() {
    $('menu.button').click(function () {
          $(this).toggleClass("arrow_box");
        });

    $("#myDivOverlay").fadeTo(1200, 0.9);
    setTimeout(function(){
        $(".intro_detail").fadeIn(800)},400);

    $(".continuebtn").click(function(){ // this will run when the document.ready event fires
        $(this).toggleClass("continuebtn_on");
        $(".intro_detail").fadeOut();
        $("#myDivOverlay").fadeOut(); // this will show a div whose id is myDivOverlay
    });

    $("#donations_btn").click(function(){
        $('#time-chart').slideToggle(800);
        $('.donations_arrow').toggleClass("arrow_active");
        //$(".chart-stage").show();
    });


    $("#donations_btn").click(function () {
        $('.donations_arrow').hide();
        $('.close').show();
    });

     $(".close").click(function () {
        $(this).parent().slideToggle(800);
        $(this).hide();
        $('.donations_arrow').show();
    });

    $("#navitem2").click(function () {
        $('#funding-chart').slideToggle(800);
        $(this).toggleClass("navactive");
    });
    $("#navitem3").click(function () {
        $('#poverty-level-row-chart').slideToggle(800);
        $(this).toggleClass("navactive");
    });
    $("#navitem4").click(function () {
        $('#resource-type-row-chart').slideToggle(800);
        $(this).toggleClass("navactive");
    });
    $("#navitem5").click(function () {
        $('#primary-focus-row-chart').slideToggle(800);
        $(this).toggleClass("navactive");
    });


});