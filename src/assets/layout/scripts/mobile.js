function aktualnosci()
{   
    
    
    if(window.innerWidth<=900)
    {
        if((location.href=="http://localhost/Iskra/index.html") || (location.href=="http://localhost/Iskra/szkola-tanca-iskra" )
            || (location.href=="http://www.sktt.pwr.edu.pl/") || (location.href=="http://www.sktt.pwr.edu.pl#") || (location.href=="http://www.sktt.cba.pl")
                || (location.href=="sktt.pwr.edu.pl/index.html") || (location.href=="sktt.pwr.edu.pl/szkola-tanca-iskra") || (location.href=="sktt.pwr.edu.pl")
                    || (location.href=="http://localhost/Iskra/index.html#") || (location.href=="http://localhost/Iskra/szkola-tanca-iskra#") || (location.href=="http://www.sktt.cba.pl#")
                          || (location.href=="www.sktt.pwr.edu.pl") || (location.href=="http://www.sktt.cba.pl/szkola-tanca-iskra#") || (location.href=="sktt.pwr.edu.pl#")
                               || (location.href=="sktt.pwr.edu.pl/index.html#") || (location.href=="sktt.pwr.edu.pl/szkola-tanca-iskra#"))
        {
            document.getElementById("change").href="sktt/pages/terminy-zajec";
        }
    
        else
       {
            document.getElementById("change").href="terminy-zajec";
       }

       $(".padding").removeClass("inspace-10");


       
    }
    else
    {
        document.getElementById("change").href="#";

        $("#topbar ul ul").removeAttr("style");

        $("#menu form").remove();

        $(".padding").addClass("inspace-10");
        
        
    }
    

}

