$(document).ready(function(){
    $('form').on('submit', function(e){

        let form = $(e.currentTarget);

        let action = form.attr('action');

        let canSubmit = true;

        $("form[action='"+action+"'] input.required").each(function(i){
            let input = $(this);

            console.log(input);

            console.log(input.val());

            if(!input.val()){
                console.log("HELLO");
                if(!input.next().hasClass('required-error')){
                    $("<p class='required-error'>This is a required field</p>").insertAfter(input);
                }
                e.preventDefault();
            } else {
                if(input.next().hasClass('required-error')){
                    input.next().remove();
                }
            }
        });
    });
});