$(function () {
    var ans;
    var last;
    $(document).ready(function(){
        $.ajax('ajaxgallery.php', {
            'method': 'POST',
            'data': {
                'question': 'gallery',
            },
            'success': function (dane) {
                try {
                    ans = jQuery.parseJSON(dane);
                    insertingInformation(ans,0);
                } catch (err) {
                    console.error(dane);
                    console.error(err);
                }
            },
            'error': function () {
                $("#ajax-gallery").append('<p class="error center"> Niestety w tej chwili nie można wyświetlic galerii.</p>');
            }
        });
    })

    function insertingInformation(answer,number){
        last=number;
        if (answer[0] == 'gallery-true') {
            $("#ajax-gallery").children().remove();
            $("#ajax-gallery").append(answer[2][number]);
        }

        path='';
        for(i=0;i<answer[1];i++){
                if(i==number){
                    path=path +'<li class="current"><strong>'+(i+1)+'</strong></li>';
                }else if(i==number+1 || i==number-1 || i==0 || i==1 || i==answer[1]-1 || i==answer[1]-2){
                    path=path +'<li><a href="#">'+(i+1)+'</a></li>';
                }else if(i==number+2 || i==number-2){
                    path=path +'<li><a href="#">...</a></li>';
                }else{
                    continue;
                }
        }
        if(number>0)
        path='<li><a href="#">« Previous</a></li>'+path;
        if(number<answer[1]-1)
        path= path+ '<li><a href="#">Next »</a></li>'

        $("#ajax-pages").children().remove();
        $("#ajax-pages").append(path);

        $("#ajax-name").children().remove();
        $("#ajax-name").append('<p>'+answer[3]+'</p>');
    }

    $("#ajax-pages").on("click","a", function(e){
        e.preventDefault();
        $target = $(e.target);
        if($target.text()=='...'){
            return 0;
        }else if($target.text()=='Next »'){
            insertingInformation(ans,last+1);
        }else if($target.text()=='« Previous'){
            insertingInformation(ans,last-1);
        }else{
            insertingInformation(ans,$target.text()-1);
        }

    })

})
