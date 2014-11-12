
$(function() {

    var carousel_items = [
        {
            "type":"country",
            "title":"Nepal",
            "link":"#",
            "data": {
                "activities": 1000,
                "disbursements": 1000000
            }
        },{
            "type":"tool",
            "title":"Famine Analysis",
            "link":"#",
            "data": {
                "description":"info"
            }
        },{
            "type":"alert",
            "title":"Alert: Famine",
            "link":"#",
            "data": {
                "regions": "Eastern Nepal",
                "severity":"moderate",
                "description": "info"
            }
        },{
            "type":"country",
            "title":"Malawi",
            "link":"#",
            "data": {
                "activities": 2000,
                "disbursements": 2000000
            }
        },{
            "type":"country",
            "title":"Uganda",
            "link":"#",
            "data": {
                "activities": 3000,
                "disbursements": 3000000
            }
        },{           
            "type":"country",
            "title":"Senegal",
            "link":"#",
            "data": {
                "activities": 4000,
                "disbursements": 4000000
            }
        },{
            "type":"tool",
            "title":"Data Extraction Tool",
            "link":"#",
            "data": {
                "description":"info"
            }
        },{
            "type":"tool",
            "title":"Rapid Visualization Tool",
            "link":"#",
            "data": {
                "description":"info"
            }
        },{
            "type":"tool",
            "title":"Other Tool",
            "link":"#",
            "data": {
                "description":"info"
            }
        },{
            "type":"alert",
            "title":"Alert: Violence",
            "link":"#",
            "data": {
                "regions": "Eastern Nepal",
                "severity":"moderate",
                "description": "info"
            }
        },{
            "type":"alert",
            "title":"Alert: Other",
            "link":"#",
            "data": {
                "regions": "Eastern Nepal",
                "severity":"moderate",
                "description": "info"
            }
        }
    ]



    function initCarousel(){

        var jcarousel = $('.jcarousel');

        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var width = jcarousel.innerWidth();
                if (width >= 600) {
                    width = width / 3;
                } else if (width >= 350) {
                    width = width / 2;
                }
                // var width = 300
                jcarousel.jcarousel('items').css('width', width + 'px');
            })
            .jcarousel({
                wrap: 'circular'
            });

        $('.jcarousel-control-prev')
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .on('click', function(e) {
                e.preventDefault();
            })
            .jcarouselPagination({
                carousel: jcarousel,
                perPage: 1,
                item: function(page) {
                    return '<a href="#' + page + '">' + page + '</a>';
                }
            });
    }


    function buildCarousel(type){
        $(".jcarousel ul").empty()
         // $('.jcarousel-pagination').empty()

        for (var i=0;i<carousel_items.length;i++){
            if ( type == "jcarousel-general" || type == "jcarousel-"+carousel_items[i].type){
                var data_info = carousel_items[i].data
                var data_html = ""
                for (var key in data_info){
                    data_html += "<span><b>"+key+"</b>: "+data_info[key]+"</span>"
                }
                $(".jcarousel ul").append('<li class="jcarousel-'+carousel_items[i].type+'"><div class="jcarousel-content"><span><a class="jcarousel-title" title="'+carousel_items[i].title+'" href="'+carousel_items[i].link+'">'+carousel_items[i].title+'</a></span> <div class="jcarousel-data">'+data_html+'</div> </div></li>')
            } 
        }
    }

    var carousel_init = true
    $(".jcarousel-tab-container").on("click", function(){

        // console.log($(this).attr("id")+"!")

        if ( $(this).hasClass("jcarousel-tab-active") && carousel_init == false ){
            return 0
        }

        $(".jcarousel-tab-active").removeClass("jcarousel-tab-active")
        $(this).addClass("jcarousel-tab-active")

        var tab_class = $(this).children().eq(0).attr("id")

        $("#intro_carousel").animate({opacity:0}, function(){

            if ($(".jcarousel ul").children().length == 0){
                initCarousel()
            }

            buildCarousel(tab_class)
                

            $(window).resize()

            $(".jcarousel").jcarousel('reload')
            $('.jcarousel-pagination').jcarouselPagination('reloadCarouselItems');
            $('.jcarousel-pagination').jcarouselPagination('reload');

            carousel_init = false

           $("#intro_carousel").animate({opacity:1});

        })

    })

    $("#jcarousel-general").parent().trigger("click")

});

