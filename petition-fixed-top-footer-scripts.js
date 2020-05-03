
    /*************************************
     phoneLength input validation process
    **************************************/

    /* Apply input mask */
    $('#en__field_supporter_NOT_TAGGED_4').inputmask({"mask": "(999) 999-9999999", "placeholder": " "});

    var countrycode = 64;
    var prefix = '';

    $('#en__field_supporter_NOT_TAGGED_4, .footer-logos-right').bind('click keyup',function(){
        if( $(this).hasClass('footer-logos-right') ){
            $('#en__field_supporter_NOT_TAGGED_4').val("6421222222");
        }
        
        $('#error-phoneNumber').hide();
        var current = $('#en__field_supporter_NOT_TAGGED_4').val();
        console.log("current: ", current);
        
        var n1 = current.substr(1, 1);
        
        if(n1!='0'){
            console.log("1st char not zero ");
            current = '0'+current;
            $('#en__field_supporter_NOT_TAGGED_4').val(current);
            validationErrors("phoneLength","more numbers required");
        }
        
        n1 = current.substr(1, 1);
        var n2 = current.substr(2, 1);
        var n3 = current.substr(3, 1);
        console.log("1st char: ", n1);
        console.log("2nd char: ", n2);
        console.log("3rd char: ", n3);
        
        var digits = 0;
        var i = 0;
        while ( i < current.length) {
            var step = current.substring(i,i+1);
            if ( isNaN(step) || step==" "){
                // do nothing
            } else {
                digits++;
            }
          i++;
        }
        console.log("digits: ", digits);
        
        if(n1==6 && n2==4){
            console.log("64 found ", current);
            current = current.substring(3); // remove leading characters
            console.log("remove 1st 3 characters ", current);
            n2 = current.charAt(0);
            console.log("n2 ", n2);
        }
    
        switch(n2){
            case '2':
                console.log("mobile ");
                $('#en__field_supporter_NOT_TAGGED_4').inputmask({"mask": "(999) 999-9999999", "placeholder": " "});
                if ( digits > 8 && digits < 13 ) {
                        validationErrors("phoneLength","ok");
                        var format = current.replace(/\D/g,''); // replace all non numeric characters
                        if(n1=='0'){
                            var prefix = countrycode+format.substring(1); // remove leading 0
                        } else {
                            var prefix = countrycode+format;
                        }
                        console.log("prefix: ", prefix);
                } else if ( digits > 12){
                    $(this).val($(this).val().substr(0, 16));
                } else {
                    validationErrors("phoneLength","Must be 6 to 9 digits after prefix");
                }
            break;
            default:
                $('#en__field_supporter_NOT_TAGGED_4').inputmask({"mask": "(99) 999-9999999", "placeholder": " "});
                if ( digits > 8 ) {
                    console.log("landline ");
                    $(this).val($(this).val().substr(0, 13));
                    validationErrors("phoneLength","ok");
                        var format = current.replace(/\D/g,''); // replace all non numeric characters
                        var prefix = countrycode+format.substring(1); // remove leading 0
                        console.log("prefix: ", prefix);
                } else if(digits > 1){
                    console.log("landline ");
                    validationErrors("phoneLength","Must be exactly 7 digits after prefix");
                } else {
                    console.log("exception ");
                }
        }

        $('#en__field_supporter_phoneNumber').val(prefix);
        
    });
    
    /**********************
     validation errors  
    ***********************/
    var errorMessage = '';
    var phoneLengthOK = false;
    function validationErrors(type,customErrorMessage){
        switch(type){
            case "reset":
                $('.errorMessage').remove();
                $('#error-phoneNumber').hide();
            break;
            case "amount":
                $('#other-amount').before('<div class="errorMessage">' + "Please select or input a donation amount" + '</div>');
            break;
            case "email":
                $('#en__field_supporter_emailAddress').after('<div class="errorMessage">' + customErrorMessage + '</div>');
                
                $('#en__field_supporter_emailAddress').addClass('errorBorder');
            break;
            case "phone":
                $('.error-custom').remove();
                // $('#error-phoneNumber').text(customErrorMessage);
                $('#en__field_supporter_NOT_TAGGED_4').after('<div class="en__field__error" id="error-phoneNumber">'+customErrorMessage+'</div>');
                //$('#error-phoneNumber').show();
                $('.parsley-errors-list').hide();
            break;
            case "phoneLength":
                $('.error-custom').remove();
                $('#error-phoneLength').text(customErrorMessage);
                $('.en__field--NOT_TAGGED_4 label').after(' <span class="error-custom" id="error-phoneLength">'+customErrorMessage+'</span>');
                if(customErrorMessage=="ok"){
                    phoneLengthOK = true;
                    console.log("green customErrorMessage==ok");
                    $('#error-phoneLength').css( "color", "#29e5b7" );
                } else {
                    $('#error-phoneLength').css( "color", "red" );
                    phoneLengthOK = false;
                    console.log("red");
                }
                // $('.parsley-errors-list').hide();
            break;
            case "captcha":
                $('#error-captcha').text(customErrorMessage);
                $('#error-captcha').show();
            break;
            case "min":
                $('#error-captcha').text(customErrorMessage);
                $('#error-min').show();
            break;
        }
    }
    

  /* ***************************** */
  /*        Counter Script         */
  /* ***************************** */
    
    console.log("campaignID ",campaignID);
    
    // This is the URL the page uses to pull the signatures from
    var counterBaseUrl = 'https://act.greenpeace.org/ea-dataservice/data.service?service=EaDataCapture&token=873e349c-beaa-42ed-abca-b0e43f5a6463&campaignId='+campaignID+'&contentType=json&resultType=summary';
    
    var participatingSupporters = 0;

  /* Get Petition Count */
  $.ajax({
    type: 'GET',
    url: counterBaseUrl,
    dataType: 'json',
    success: function (response) {
	  if(response.rows){
		  participatingSupporters = response.rows[0].columns[5].value;
		  participatingSupporters = parseInt(participatingSupporters)+parseInt(startOffset);
	  }
	  console.log("participatingSupporters ", participatingSupporters);
	  console.log("startOffset ", startOffset);
	  console.log("response ", response);
      // ticker(participatingSupporters, tickerElementId)
      //setBar(participatingSupporters)
      setProgBar(participatingSupporters);
    }
  })

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

function setProgBar(n){
    switch(true){
        case n<5000:
            var target = 10000;
        break;
        case n<10000:
            var target = 20000;
        break;
        case n<20000:
            var target = 30000;
        break;       
        case n<30000:
            var target = 40000;
        break;
        case n<40000:
            var target = 40000;
        break;  
        case n<50000:
            var target = 60000;
        break;
    }
    $('#count').text(numberWithCommas(participatingSupporters));
    $('#target').text(numberWithCommas(target));
    var proportion = n/target;
    var percentage = proportion*100;
    console.log("percentage ", percentage);
    $('.progress-bar').css('max-width', percentage + '%');
}

// counter thresholds

  function setBar(n) {
    var total
    switch (true) {
      case n < 1000:
        total = 5000
        break
      case n >= 1000 && n < 5000:
        total = 10000
        break
      case n >= 5000 && n < 10000:
        total = 20000
        break
      case n >= 10000 && n < 30000:
        total = 50000
        break
      case n >= 30000 && n < 80000:
        total = 100000
        break
      case n >= 50000 && n < 150000:
        total = 200000
        break
      case n >= 150000 && n < 200000:
        total = 250000
        break
      case n >= 200000 && n < 300000:
        total = 350000
        break
      case n >= 300000 && n < 400000:
        total = 450000
        break
      case n >= 400000 && n < 500000:
        total = 550000
        break
      case n >= 500000 && n < 1000000:
        total = 1000000
        break
      case n >= 1000000 && n < 2000000:
        total = 2000000
        break
      case n >= 2000000 && n < 3000000:
        total = 3000000
        break
      case n >= 3000000 && n < 4000000:
        total = 4000000
        break
      case n >= 4000000 && n < 5000000:
        total = 5000000
        break
      case n >= 5000000 && n < 6000000:
        total = 6000000
        break
      case n >= 6000000 && n < 7000000:
        total = 7000000
        break
      case n >= 8000000 && n < 9000000:
        total = 9000000
        break
      case n >= 9000000 && n < 10000000:
        total = 10000000
        break
      default:
        total = 20000000
    }
    $('#total').html(numberWithCommas(total))
    $('#signed').text(numberWithCommas(participatingSupporters)+' signatures so far... ');
    $('.thermom_tooltip').addClass('animateIn')
    var percentage = Math.round((n / total) * 100)
    if(percentage<5){
	    percentage = 5;
    }
    // $('.bar').css('max-height', perc + '%')
    //$('.progress-bar').css('max-width', perc + '%');
  }

function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) 
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) 
            {
                return sParameterName[1];
            }
        }
}

var source = (GetURLParameter('source')) ? GetURLParameter('source') : '';
console.log("source ", source);
var medium = (GetURLParameter('utm_medium')) ? GetURLParameter('utm_medium') : ''; //also get utm_medium
    
if(source=="cpc" || medium=="cpc"){
    $("#en__field_supporter_NOT_TAGGED_4").prop('required',true);
    
    $('.en__field--NOT_TAGGED_4 label').text('Phone number (required)');
    
    $('#en__field_supporter_phoneNumber').prop('required',true);
    
    //$("#en__field_supporter_NOT_TAGGED_111").attr('placeholder', 'Phone number (required)');
    // var phoneInput = document.getElementById("en__field_supporter_NOT_TAGGED_4");
    // phoneInput.placeholder = "Phone number (required)";
    
    // console.log("phoneInput.placeholder", phoneInput.placeholder);
}

var redirectUrl = '';


$('.en__submit').click(function( e ) {
    e.preventDefault();
    console.log("submit preventDefault", e);
    // run validation on mandatory fields

    var emailValue = $('#en__field_supporter_emailAddress').val();
    var firstNameValue = $('#en__field_supporter_firstName').val();
    var lastNameValue = $('#en__field_supporter_lastName').val();
    // var phoneValue = $('#en__field_supporter_NOT_TAGGED_4').val();
    var phoneValue = $('#en__field_supporter_phoneNumber').val();
    console.log("phoneValue ",phoneValue);
    console.log("source ",source);
    
    function isValidEmailAddress(){
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(emailValue);
    }
    if(emailValue==''){
      $('#en__field_supporter_emailAddress').addClass('en__field__error required'); 
      $('#en__field_supporter_emailAddress').parent().prev().css('color','red'); 
    } else {
        $('#en__field_supporter_emailAddress').removeClass('en__field__error required');
        $('#en__field_supporter_emailAddress').parent().prev().css('color','#999');
    }
    
    if(isValidEmailAddress(emailValue)==false){
        console.log("isValidEmailAddress(emailValue)", isValidEmailAddress(emailValue) );
        $('#en__field_supporter_emailAddress').addClass('en__field__error required');
        $('#en__field_supporter_emailAddress').parent().prev().css('color','red');
    } else {
        console.log("isValidEmailAddress(emailValue) else", isValidEmailAddress(emailValue) );
        $('#en__field_supporter_emailAddress').removeClass('en__field__error required');
        $('#en__field_supporter_emailAddress').parent().prev().css('color','#999');
    }
    if(firstNameValue==''){
      $('#en__field_supporter_firstName').addClass('en__field__error required'); 
      $('#en__field_supporter_firstName').parent().prev().css('color','red'); 
    } else {
        $('#en__field_supporter_firstName').removeClass('en__field__error required');
        $('#en__field_supporter_firstName').parent().prev().css('color','#999');
    }
    if(lastNameValue==''){
      $('#en__field_supporter_lastName').addClass('en__field__error required'); 
      $('#en__field_supporter_lastName').parent().prev().css('color','red'); 
    } else {
        $('#en__field_supporter_lastName').removeClass('en__field__error required');
        $('#en__field_supporter_lastName').parent().prev().css('color','#999');
    }
    
    if(source=="cpc"){
        console.log("cpc");
        if(phoneValue==''){
            $('#en__field_supporter_NOT_TAGGED_4').addClass('en__field__error required');
            $('#en__field_supporter_NOT_TAGGED_4').parent().prev().css('color','red');
            console.log("phoneValue=");
        } else {
            $('#en__field_supporter_NOT_TAGGED_4').removeClass('en__field__error required');
            $('#en__field_supporter_NOT_TAGGED_4').parent().prev().css('color','#999');
            console.log("else phoneValue=");
        }
    } else {
        console.log("else cpc");
    }
    
    $('.en__submit button').prop('disabled', true)
    $('input[name="supporter.emailAddress"]').val($('input[name="supporter.emailAddress"]').val().trim())
    setTimeout(function () {
      if ($('.en__field__error').length == 0) {
	    console.log("errors=0");
        // check if there is any errors present
        $.ajax({
          method: 'POST',
          url: $('form.en__component--page').attr('action'),
          data: $('form.en__component--page').serialize()
        }).done(function (msg) {
          if (~msg.indexOf('Thanks for signing! 12345')) {
            window.dataLayer = window.dataLayer || []
            dataLayer.push({
              event: 'petitionSignup'
            })
            console.log('success');
            console.log('dataLayer ', dataLayer);
            // if ($.fn.fbq) {
            //     fbq('track', 'Lead'); 
            // }
            if (redirectUrl) {
              window.location.href = redirectUrl
            } else {
                $('.formStage').hide();
                var nameToken = $('#en__field_supporter_firstName').val();
                $('.shareStage h1').text("Thanks for signing "+nameToken+".");
                $('.shareOptionsStage h1').text("Thanks "+nameToken+".");
                $('.en__component.en__component--row.en__component--row--1').hide();
                $(".shareStage").show();
                
                $('html').css({
                        'background-size': 'cover',
                        'background-repeat': 'no-repeat',
                        'animation': 'none'
                    });
                
                $('html, body').animate({
                    scrollTop: $(".shareStage").offset().top
                }, 1000);
                console.log("show/scroll share journey");
                return false;
            }
          } else if (
            ~msg.indexOf('not a valid email address. Can you try again?')
          ) {
            console.log('email error')
            $('#en__field_supporter_emailAddress')
              .parent()
              .prepend(
                '<div class="en__field__error">Please enter a valid Email</div>'
              )
            $('.en__submit button').prop('disabled', false)
          } else {
            console.log('error')
            $('.en__submit button').prop('disabled', false)
          }
        })
      } else {
        console.log('error') // console log error if any ajax errors are found
        $('.en__submit button').prop('disabled', false)
      }
    }, 150)
  })

/**************************************************
 set background image from page builder component
***************************************************/

pagetitle = $('title').text();

var imageBlock = $('.en__component--imageblock').find('img').css({height: 'auto', width: '100%'});
var heroImgURL = $('.en__component--imageblock').find('img').attr('src');
console.log("heroImgURL ", heroImgURL);

$('body').prepend('<div id="cropped"></div>');
$('body').prepend('<div id="slide"></div>');


if( $(imageBlock).hasClass('circle')==true ){
    console.log( "$(heroImgURL).hasClass('circle')" );
    $('.en__component--imageblock').find('img').hide();
    $('#cropped').css('background-image', 'url('+heroImgURL+')');
}
if( $(imageBlock).hasClass('background')==true ){
    console.log( "$(heroImgURL).hasClass('background')" );
    $('.en__component--imageblock').find('img').hide();
    $('body').css({
        'background-image': 'url('+heroImgURL+')',
        'background-size': 'cover'
    });
}


$('.shareButton').click(function(){
    if( $(this).text()=='YES' ){
        $(".shareOptionsStage").show();
        $('html, body').animate({
            scrollTop: $(".shareOptionsStage").offset().top
        }, 1000);
        return false;
    } else { // NO
        $('.donateStage').show();
        $('html, body').animate({
            scrollTop: $(".donateStage").offset().top
        }, 1500);
        return false;
    }
});

$('#facebook').click(function(){
        window.open(facebookURL);
        $('.donateStage').show();
        $('html, body').animate({
            scrollTop: $(".donateStage").offset().top
        }, 1000);
        // return false;
});
$('#twitter').click(function(){
        window.open(twitterURL);
        $('.donateStage').show();
        $('html, body').animate({
            scrollTop: $(".donateStage").offset().top
        }, 1000);
        // return false;
});
$('#whatsapp').click(function(){
        window.open(whatsappURL);
        $('.donateStage').show();
        $('html, body').animate({
            scrollTop: $(".donateStage").offset().top
        }, 1000);
        // return false;
});
$('#skippy').click(function(){
        $('.donateStage').show();
        $('html, body').animate({
            scrollTop: $(".donateStage").offset().top
        }, 1000);
        return false;
});

$('#back').click(function(){
        $('.shareOptionsStage').show();
        $('html, body').animate({
            scrollTop: $(".shareOptionsStage").offset().top
        }, 1000);
        return false;
});

    var selected = 'unselected';
    var das0 = $('#das0').text();
    das0 = das0.substring(1);
    var das1 = $('#das1').text();
    das1 = das1.substring(1);
    var das2 = $('#das2').text();
    das2 = das2.substring(1);
    console.log("button vals ", 'https://act.greenpeace.org/page/39822/donate/1?selected=' +selected+ '&das0=' +das0+ '&das1=' +das1+ '&das2=' +das2 );

var donatePageID = 39822;
console.log("donatePageID DEFAULT ",donatePageID);
var profileID = '';


$('.donateButton').click(function(){
    var selected = $(this).attr('id');
    window.location.href = 'https://act.greenpeace.org/page/'+donatePageID+'/donate/1?chain&'+profileID+'ea.tracking.id=petition&selected=' +selected+ '&das0=' +das0+ '&das1=' +das1+ '&das2=' +das2+'&en_txn7='+pageJson.pageName; 
    //window.location.href = 'https://act.greenpeace.org/page/39822/donate/1?selected=' +selected+ '&das0=' +das0+ '&das1=' +das1+ '&das2=' +das2;
});

// on load > if email but no phone
var supporter_emailAddress = $('#en__field_supporter_emailAddress').val();
var supporter_phoneNumber = $('#en__field_supporter_phoneNumber').val();
if(supporter_emailAddress!=''){
    console.log("have supporter email");
    if(supporter_phoneNumber==''){
        console.log("no supporter email");
        $('.form-toggle').show(); // show phone field
    }
}

$('input#en__field_supporter_firstName, input#en__field_supporter_lastName').keyup(function(){
    var name_input = this.value;
    var name_UP = name_input.substr(0,1).toUpperCase()+name_input.substr(1);
    console.log("name_input ", name_UP);
    $(this).val(name_UP);
});

$("input").prop('required',true);

$('.main_form').appendTo('#form_replace');

$('.en__component.en__component--row.en__component--row--1').css('margin-right','0');

console.log("pageJson ",pageJson);
