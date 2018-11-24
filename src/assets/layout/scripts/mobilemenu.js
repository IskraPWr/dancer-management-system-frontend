function menu()
{   
    if($("#bars i").hasClass("fa fa-lg fa-bars"))
    {

        var menu= $("<div></div>").attr('id', 'menu');
        $("#bars").parent().prepend(menu);

        $("#bars i").attr("class","fa fa-lg fa-times"); 
        $("#bars i").css("color","black"); 
                
       
        $('<form action="#"><div/></form>').appendTo("#menu");
    


        $("#mainav a").each(function()
        {var e=$(this);
            if($(e).parents("ul ul ul").length>=1)
                {$("<a />",{href:e.attr("href"),text:"- - "+e.text()}).appendTo("#menu div")}
            else if($(e).parents("ul ul").length>=1)
                {$("<a />",{href:e.attr("href"),text:"- "+e.text()}).appendTo("#menu div")}
            else if($(e).parents("ul").length>=1)
                {$("<a />",{href:e.attr("href"),text:""+e.text()}).appendTo("#menu div")}
            else
                {$("<a />",{href:e.attr("href"),text:e.text()}).appendTo("#menu div")}
       });

       $("#menu").css('right','-=200');
       $("#menu").css('display','block'); 
       $("#menu").animate({
           'right':'0'
       },200)
     

    }
    else
    {
        $("#bars i").attr('class','fa fa-lg fa-bars');
        $("#bars i").css('color','#EA5616');  
        $("#menu").animate({
            'right':'-=250'
        },200)

        setTimeout(function(){
            $("#menu form").remove();
            $("#menu").css('display','none');
            $("#menu").remove(); 
        },500)
    }

}

$('#box_btn').click(function(){
  
    if($("#box_btn i").hasClass("fa fa-lg fa-bars"))
    {
        $("#box_btn i").attr('class',"fa fa-lg fa-times"); 
        $("#box_btn i").css('color','black'); 
                

       $("#box").css('left','-=250');
       $("#box").css('display','block'); 
       $("#box").animate({
           'left':'0'
       },200)
     

    }
    else
    {
        $("#box_btn i").attr("class","fa fa-lg fa-bars");
        $("#box_btn i").css("color","#EA5616");  
        $("#box").animate({
            'left':'-=250'
        },200)

        setTimeout(function(){
            $("#box").css("display","none"); 
            $("#box").attr('style','');            
        },500)
        
    }

})

$("#bars").on('click',function(){
    menu();
});

