function updateConfirm(){
    var freq_display = selected_frequency=='D28' ? 'regular' : 'single';
    var freq_text = selected_frequency=='D28' ? ' once every 4 weeks' : '';
    $('#summary').html('You are making a <u>'+freq_display+'</u> donation of <u>$'+selected_amount+'</u>'+freq_text);
    console.log('selected_amount updated ', selected_amount);
}

// bind parsley to the form. Exclude all disabled fields

$('form').parsley({
    excluded: 'input[type=hidden], :disabled, .en__field--donationAmt input'
});

$('input#en__field_supporter_firstName, input#en__field_supporter_lastName').keyup(function(){
    var name_input = this.value;
    var name_UP = name_input.substr(0,1).toUpperCase()+name_input.substr(1);
    console.log("name_input ", name_UP);
    $(this).val(name_UP);
});

/**********************************
   get defaults from profiles 
***********************************/

var selected_amount = $('#en__field_transaction_donationAmt1').val(); // use middle button as default
console.log("line 69 selected_amount: ",selected_amount);

var selected_frequency = 'D28'; // default to monthly
// check if single selected on load
$( "#frequency_buttons input" ).each(function( index ) {
    var freqInput = this;
    if( $(freqInput).attr("checked")=="checked" ){
        selected_frequency = freqInput.value=="regular" ? 'D28' : 0;
        console.log("selected_frequency ", selected_frequency);
        if(selected_frequency==0){
            $('#freq_notice').hide(); //25 Nov: hide freq notice when single
            $('#payment_method_buttons label:last-child').hide();
            $('.showOnlyOnSingle').slideDown(); //25 Nov: show
        }
        updateConfirm();
        $("#en__field_supporter_NOT_TAGGED_102").val(selected_frequency);
    }
});

$('.dd').hide();

// Set amount labels to default values
$('.en__field--donationAmt input').each(function(){
    var defaultAmount = $(this).val();
    if ( $(this).next().text()!="Other" ){
        $(this).next().text('$'+defaultAmount);
    }
});

/**********************************
 Get URL Parameters  
***********************************/

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

if(source=="cpc"){
    $("#PhoneInput").prop('required',true);
    $(".en__field--phoneNumber label").text('Phone number (required)');
    
    $('.en__submit').click(function( e ) {
        console.log("submit");
        if(phoneLengthOK==false){
            document.querySelector('.en__field--NOT_TAGGED_92').scrollIntoView();
                $('#error-phoneNumber').text('Phone number is required').show();
                $('#phoneNumber-error').text('');
                $('#phoneNumber-error').show();
            e.preventDefault();
        }
    });
    // console.log( '.en__field--phoneNumber .en__field__error ', $('en__field--phoneNumber .en__field__error').text().length );
    //     if( $('.en__field--phoneNumber .en__field__error').text().length == 0 ){
    //         //$('#error-phoneNumber').text('Phone number is required').show();
    //         //$('#phoneNumber-error').text('');
    //         $('#phoneNumber-error').show();
    //         console.log('#phoneNumber-error show ');
    //         document.querySelector('.en__field--NOT_TAGGED_92').scrollIntoView();
    //     }
    // });
}



var dt = GetURLParameter('dt');
// var das = GetURLParameter('das');
var dam = GetURLParameter('dam');

var das0 = GetURLParameter('das0')!=null ? GetURLParameter('das0') : '' ;
var das1 = GetURLParameter('das1')!=null ? GetURLParameter('das1') : '' ;
var das2 = GetURLParameter('das2')!=null ? GetURLParameter('das2') : '' ;
var das3 = GetURLParameter('das3')!=null ? GetURLParameter('das3') : '' ;

var dam1 = GetURLParameter('dam1')!=null ? GetURLParameter('dam1') : '' ;
var dam2 = GetURLParameter('dam2')!=null ? GetURLParameter('dam2') : '' ;
var dam3 = GetURLParameter('dam3')!=null ? GetURLParameter('dam3') : '' ;

console.log("line 190 das0 ", das0);
console.log("das1 ", das1);
console.log("das2 ", das2);
console.log("das3 ", das3);

console.log("dam1 ", dam1);
console.log("dam2 ", dam2);
console.log("dam3 ", dam3);

var fn = GetURLParameter('fn')!=null ? GetURLParameter('fn') : '' ;
var ln = GetURLParameter('ln')!=null ? GetURLParameter('ln') : '' ;
var e = GetURLParameter('e')!=null ? GetURLParameter('e') : '' ;

if(fn!=''){
    $('#en__field_supporter_firstName').val(fn);
}
if(ln!=''){
    $('#en__field_supporter_lastName').val(ln);
}
if(e!=''){
    $('#en__field_supporter_emailAddress').val(e);
}
if(das0!=''){
    $('#en__field_transaction_donationAmt0').val(das0).next().text("$"+das0);
}
if(das1!=''){
    $('#en__field_transaction_donationAmt1').val(das1).next().text("$"+das1);
}
if(das2!=''){
    $('#en__field_transaction_donationAmt2').val(das2).next().text("$"+das2);
}
if(das3!=''){
    $('#en__field_transaction_donationAmt3').val(das3).next().text("$"+das3);
}

if(dam1!=''){
    $('#en__field_transaction_donationAmt0').val(dam1).next().text("$"+dam1);
}
if(dam2!=''){
    $('#en__field_transaction_donationAmt1').val(dam2).next().text("$"+dam2);
}
if(dam3!=''){
    $('#en__field_transaction_donationAmt2').val(dam3).next().text("$"+dam3);
}

if(dam==0){
    $('#freq_notice').hide();
    selected_frequency = 0;
    $('#frequency_monthly').hide();
    $('#frequency_monthly').next().hide();
    $('#frequency_single').attr("checked", "checked");
    $('#summary').html('You are making a single donation of <u>$'+selected_amount+'</u>');
    console.log("selected_amount ",selected_amount);
    console.log("selected_frequency ",selected_frequency);
}

var defaultSelected = (GetURLParameter('selected')) ? GetURLParameter('selected') : '';
// middle button selected by default unless: 
if(defaultSelected!=''){
    // select 
    console.log("defaultSelected: ", defaultSelected);
    switch(defaultSelected){
        case 'das0':
            $('#en__field_transaction_donationAmt0').click();
                console.log("line 121 donationAmt0 clicked");
                selected_amount = das0;
                updateConfirm();
        break;
        case 'das1':
            $('#en__field_transaction_donationAmt1').click();
                console.log("donationAmt1 clicked");
                selected_amount = das1;
                updateConfirm();
        break;
        case 'das2':
            $('#en__field_transaction_donationAmt2').click();
                console.log("donationAmt2 clicked");
                selected_amount = das2;
                updateConfirm();
                
        break;
        case 'dasOther':
            $('#en__field_transaction_donationAmt3').click();
                console.log("donationAmt3 clicked");
                selected_amount = das3;
                updateConfirm();
        break;
    }
}

/**********************************
 Background image from Page builder  
***********************************/

var heroImgURL = "NA";
// check if the component exists
var images = $('.en__component--imageblock');
var imagesTotal = images.length;
console.log("imagesTotal: ", imagesTotal);

switch(imagesTotal) {
    case 0:
            // no image - use default
            $('body').css({
              'background-color' : '#ddd'
            });
        break;
    case 1:
            // use the 1st and only image
            heroImgURL = $('.en__component--imageblock').find('img').attr('src');
            console.log("heroImgURL: ", heroImgURL);
        break;
    default:
            // if more than 1 image; use the last
            heroImgURL = $(images[imagesTotal-1]).find('img').attr('src');
            console.log("heroImgURL: ", heroImgURL);
}

if(heroImgURL!='NA'){
    $('#banner').css({
      'background-image' : 'url('+heroImgURL+')'
    });
    // hide component
    if(images.length>1){
        $(images[imagesTotal-1]).hide();
    } else {
        $('.en__component--imageblock').hide();
    }
} else {
    $('body').css({
      'background-color' : '#ddd'
    });
}

// ©© add current year
var d = new Date();
var year = d.getFullYear();
$('#current-year').text(year);


$('.navbar-search-toggle').click(function(){
    var searchState = $(this).attr('aria-expanded');
    if(searchState=="false"){
        $(this).attr('aria-expanded','true');
        $(this).parent().find('#search_form').addClass('open');
    } else {
        $(this).attr('aria-expanded','false');
        $(this).parent().find('#search_form').removeClass('open');
    }
});

$( '.navbar-dropdown-toggle' ).click(function() {
    $('#navbar-dropdown').css({
      'display' : 'block'
    });
});

$('.close-navbar-dropdown').click(function() {
    $('#navbar-dropdown').css({
      'display' : 'none'
    });
});


(function(){
  var widget, initAF = function(){
    widget = new AddressFinder.Widget(
      document.getElementById('en__field_supporter_NOT_TAGGED_92'),
      'C63FLUJN48PT9AVY7BDK',
      'NZ',
      {
        //   "address_params": { "delivered" : 1 },
          "address_metadata_params": { "census": 2018}
      }
    );

    widget.on("result:select", function(fullAddress, metaData) {
        var selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);
        console.log(selected);
        $('#en__field_supporter_country').val('New Zealand');
        //document.getElementById('en__field_supporter_NOT_TAGGED_92').value = metaData.a; // full address
        document.getElementById('en__field_supporter_address1').value = metaData.postal_line_1;
        document.getElementById('en__field_supporter_city').value = metaData.city;
        document.getElementById('en__field_supporter_postcode').value = metaData.postcode;
        document.getElementById('en__field_supporter_NOT_TAGGED_83').value = metaData.meshblock;
        document.getElementById('en__field_supporter_NOT_TAGGED_84').value = metaData.x; // latitude
        document.getElementById('en__field_supporter_NOT_TAGGED_85').value = metaData.y; // longditude
        document.getElementById('en__field_supporter_NOT_TAGGED_91').value = metaData.suburb; // suburb
        document.getElementById('en__field_supporter_region').value = metaData.region; // region
        // document.getElementById('en__field_supporter_NOT_TAGGED_86').value = metaData.dpid;
        // document.getElementById('en__field_supporter_NOT_TAGGED_87').value = metaData.aims_address_id;
        document.getElementById('en__field_supporter_NOT_TAGGED_88').value = metaData.rural; // true or false
        var mdru = metaData.rural;
        console.log("mdru", mdru);
        if(mdru){
            console.log("metaData.postal_line_2", metaData.postal_line_2);
            var rd = metaData.postal_line_2;
            console.log("rd", rd);
            var rdval = rd.substring(0, 2);
            console.log("rdval", rdval);
            if(rdval==="RD"){
                document.getElementById('en__field_supporter_address2').value = metaData.postal_line_2; // RD 
            } else { // cleanse unnecessary address fields
                document.getElementById('en__field_supporter_address2').value = "";
                document.getElementById('en__field_supporter_address3').value = "";
            }
        }
        
        /***************************************
         Unit/Flat Apartment process by Francis  
        ****************************************/
        
        // Alpha
        var annoying_alpha = metaData.alpha != null ? metaData.alpha : "";
        console.log("annoying_alpha", annoying_alpha);
        // Address in apartment or high rise case
        // eg)
        // Suite 1 Level 3, 53 Cuba Street, Te Aro, Wellington 6011
        // Suite C Floor 1, 2 Marine Parade, Mount Maunganui 3116
        //
        var floor_with_unit = metaData.unit_type != null && metaData.floor != null ? metaData.unit_type + " " +
        metaData.unit_identifier + " " + metaData.floor + ", " + metaData.number + annoying_alpha + " " + metaData.street : "";
        
        console.log("floor_with_unit ", floor_with_unit);
        
        // Same as above without unit (if whole floor is just one unit)
        // eg)
        // Floor 2, 124 Vincent Street, Auckland Central, Auckland 1010
        //
        var floor_only = metaData.floor != null ? metaData.floor + ", " +
        metaData.number + annoying_alpha + " " + metaData.street : "";
        
        console.log("floor_only ", floor_only);
        
        // Address with unit_type case
        // Flat/Unit/Suite/Room/Villa/Apartment all gets dropped and only show unit_identifier with /
        //
        var unit_only = metaData.unit_type != null ? metaData.unit_identifier + "/" + metaData.number + annoying_alpha + " " + metaData.street : "";
        
        console.log("unit_only ", unit_only);
        
        // Address with box_type case
        // CMB => no suburb (box_type number, city postcode)
        // Counter Delivery => (box_type, lobby_name, city postcode)
        // PO Box => (box_type number, lobby_name, city postcode)
        // Private Bag => (box_type number, lobby_name, city postcode)
        //
        var box_numbers = metaData.box_type != null ? metaData.box_type + " " + metaData.number : "";
        
        console.log("box_numbers ", box_numbers);
        
        // Simple address
        //
        var simple_address = metaData.number != null ? metaData.number + annoying_alpha + " " + metaData.street : "";
        
        console.log("simple_address ", simple_address);
        
        // Address assigning logic
        //
        
        if (metaData.floor != null){
               document.getElementById('en__field_supporter_address1').value = metaData.unit_type != null ? floor_with_unit : floor_only;
        } else {
            if (metaData.unit_type != null){
    	           document.getElementById('en__field_supporter_address1').value = unit_only;
    	        } else if (metaData.box_type != null){ // all box_type cases
    	           document.getElementById('en__field_supporter_address1').value = box_numbers;
    	        } else { // simple address case
    	           document.getElementById('en__field_supporter_address1').value = simple_address;
    	        }
    	}
        
    });
    };

function downloadAF(f){
    var script = document.createElement('script');
    script.src = 'https://api.addressfinder.io/assets/v3/widget.js';
    script.async = true;
    script.onload=f;
    document.body.appendChild(script);
  };

  document.addEventListener("DOMContentLoaded", function () {
    downloadAF(initAF);
  });

})();

/******************************
 Payment Type Buttons
*******************************/

$('#visa').click(function(){
    $('.cc').show();
    $('.dd').hide();
    console.log('.CC show');
    $('#en__field_transaction_paymenttype').val("Visa");
    $('.dd').find("input").prop('disabled', true);
    $('.cc').find("input").prop('disabled', false);
});
$('#masc').click(function(){
    $('.cc').show();
    $('.dd').hide();
    console.log('.CC show');
    $('#en__field_transaction_paymenttype').val("MasterCard");
    $('.dd').find("input").prop('disabled', true);
    $('.cc').find("input").prop('disabled', false);
});
$('#amex').click(function(){
    $('.cc').show();
    $('.dd').hide();
    console.log('.CC show');
    $('#en__field_transaction_paymenttype').val("American Express");
    $('.dd').find("input").prop('disabled', true);
    $('.cc').find("input").prop('disabled', false);
});

$('#DD').click(function(){
    $('.dd').show();
    $('.cc').hide();
    console.log('.dd show');
    $('.dd').find("input").prop('disabled', false);
    $('.cc').find("input").prop('disabled', true);
    $('#en__field_transaction_paymenttype').val("CASH");
});

$('#frequency_single').click(function(){
    $('#freq_notice').hide();
    $('#payment_method_buttons label:last-child').hide();
    selected_frequency = '0';
    $('#single_amount_buttons').show();
    $('#monthly_amount_buttons').hide();
    $('#dam_other_amount').hide();
    $('.showOnlyOnSingle').slideDown();
    
    $('.dd').hide();
    $('.cc').show();
    
    $("#en__field_supporter_NOT_TAGGED_102").val(selected_frequency);
    updateConfirm();
});
$('#frequency_monthly').click(function(){
    $('#freq_notice').show();
    $('#payment_method_buttons label:last-child').show();
    selected_frequency = 'D28';
    $('#monthly_amount_buttons').show();
    $('#single_amount_buttons').hide();
    $('#das_other_amount').hide();
    $('.showOnlyOnSingle').slideUp();
    
    $('.dd').hide();
    $('.cc').show();
    $("#en__field_supporter_NOT_TAGGED_102").val(selected_frequency);
    updateConfirm();
});  

// Remove and replace with disable autocomplete autofill
$('#en__field_supporter_NOT_TAGGED_92').remove();
$('.en__field--NOT_TAGGED_92 .en__field__element--text').append('<input id="en__field_supporter_NOT_TAGGED_92" type="search" placeholder="start typing then select your address" class="en__field__input en__field__input--text" name="supporter.NOT_TAGGED_92" value="" autocomplete="off">');

// add required / default disabled
$('#en__field_supporter_NOT_TAGGED_97').prop('required',true); // Name on Account
$('#en__field_supporter_NOT_TAGGED_97').prop('disabled',true);

$('#en__field_supporter_NOT_TAGGED_99').prop('required',true); // Authorisation
$('#en__field_supporter_NOT_TAGGED_99').prop('disabled',true);

$('#en__field_supporter_NOT_TAGGED_100').prop('required',true); // Terms
$('#en__field_supporter_NOT_TAGGED_100').prop('disabled',true);

$('#en__field_supporter_creditCardHolderName').prop('required',true);

$('#en__field_transaction_ccvv').prop('required',true);

$('#BankAccount').prop('disabled',true);

// $('#en__field_transaction_ccvv').attr('data-parsley-errors-container', '#ccvvError');
// $('#en__field_transaction_ccvv').attr('data-parsley-required-message', 'CVC required');

// set selected_amount field on click
$('.en__field--donationAmt input').click(function(){
   console.log('line 529 .en__field--donationAmt input')
    if(this.value=="Other"){
        // if other do nothing
    } else {
        selected_amount = this.value;
         console.log("line 534 input .click selected_amount", selected_amount);
        //$('#en__field_transaction_donationAmt').val(selected_amount);
        updateConfirm();
    }
});

$('input.en__field__input.en__field__input--other').keyup(function(){
    selected_amount = this.value;
    console.log("other selected_amount ", selected_amount);
    // $('#en__field_transaction_donationAmt').val(selected_amount);
    updateConfirm();
});


/******************************
 Phone number input mask
*******************************/
// $(":input").inputmask();

$('#PhoneInput').inputmask({"mask": "(999) 999-9999999", "placeholder": " "});

$('#maskedCC').inputmask({'mask': '9999 9999 9999 9999', "placeholder": " "});
$('#maskedCC').keyup(function(){
    currentCC = this.value;
    console.log("currentCC ", currentCC);
    var reformat = currentCC.replace(/\D/g,'');
    $('#en__field_transaction_ccnumber').val(reformat);
});

$('#en__field_transaction_ccvv').inputmask({'mask': '999', "placeholder": " "});

var countrycode = 64;
var prefix = '';
/*************************************
 phoneLength input validation process
**************************************/

$('#PhoneInput').keyup(function(){
    $('#error-phoneNumber').hide();
    var current = $('#PhoneInput').val();
    console.log("current: ", current);
    
    var n1 = current.substr(1, 1);
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
        current = current.substring(3); // remove 1st 3 characters
        console.log("remove 1st 3 characters ", current);
        n2 = current.charAt(0);
        console.log("n2 ", n2);
    }
    
    if(n1!='0'){
        console.log("1st char not zero ");
        $('#PhoneInput').val('0'+current);
    } 
    
    switch(n2){
        case '2':
            console.log("mobile ");
            $('#PhoneInput').inputmask({"mask": "(999) 999-9999999", "placeholder": " "});
            if ( digits > 8 && digits < 12 ) {
                    validationErrors("phoneLength","ok");
                    var format = current.replace(/\D/g,''); // replace all non numeric characters
                    var prefix = countrycode+format.substring(1); // remove leading 0
                    console.log("prefix: ", prefix);
            } else if ( digits > 11){
                $(this).val($(this).val().substr(0, 16));
            } else {
                validationErrors("phoneLength","Must be 6 to 9 digits after prefix");
            }
        break;
        default:
            $('#PhoneInput').inputmask({"mask": "(99) 999-9999999", "placeholder": " "});
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

/******************************
 country selector phone prefix 
*******************************/

$(document).ready(function() {
    ENphoneInput = $('#PhoneInput');
    console.log("ENphoneInput", ENphoneInput);
    $(ENphoneInput)
            .intlTelInput({
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.2/js/utils.js",
                autoPlaceholder: true,
                preferredCountries: ['nz', 'au', 'gb', 'us']
    });
    $(".selected-flag" ).attr('tabindex', '-1');
    $('.intl-tel-input').prepend('<span id="ccprefix">+'+countrycode+'</span>');
    
    $('li.country').click(function(){
        // li.country.preferred.highlight.active
        countrycode = $(this).data("dial-code");
        // processPhone();
        $('#ccprefix').text('+'+countrycode);
        var flagOffset = countrycode.toString().length;
        console.log("flagOffset ", flagOffset);
        $('.selected-flag').css('left',(applyflagOffset = flagOffset<3 ? 2 : flagOffset)+'em');
        $('#PhoneInput').css('padding-left',(applyflagOffset = flagOffset<3 ? 5 : (flagOffset-2)+5)+'em');
    });
});


/******************************
 NZ Bank Account Validator
*******************************/

new Cleave("#BankAccount", {
  delimiter: '-',
  blocks: [2, 4, 7, 3]
});
var bankAccountValidator = window['NZ-Bank-Account-Validator'];

var validateBankAccStatus = false;

$("#BankAccount").on('input', function() {
    validateBankAccStatus = bankAccountValidator.validate( $("#BankAccount").val() );
    console.log("validateBankAccStatus ", validateBankAccStatus);
    if (bankAccountValidator.validate($(this).val()) && $(this).val().length>=18 ) {
          console.log('BankAccount ok');
          $('#BankAccountError').text("Valid Account Number").css('color','green').show();
          var validBankAccount = $(this).val();
          $('#en__field_supporter_NOT_TAGGED_98').val( validBankAccount );
          // set EN bank account field
        $('#BankAccount').addClass('parsley-success');
        $('#BankAccount').removeClass('parsley-error');
    } else {
      console.log('BankAccount length', $(this).val().length);
      if($(this).val().length<=18){
        console.log('BankAccount error');
        $('#BankAccountError').hide();
          $('#BankAccount').removeClass('parsley-success');
          $('#BankAccount').addClass('parsley-error');
      }
  }
});

// var form = document.querySelector('form');
// form.addEventListener('submit', function () {

$('.en__submit').click(function( event ) {
    console.log('form submit');
    
    var transtype = $('#en__field_transaction_paymenttype').val();
    // need to get disabled status properly
    if(transtype=="CASH"){
            if ( validateBankAccStatus==true ){
                // continue
                // $('.en__submit').click(function(){
                //     $(this).text("processing");
                // });
                // alert("validateBankAccStatus==true");
            } else {
                event.preventDefault();
                $('#BankAccountError').text("Invalid Account Number").css('color','red').show();
                console.log("else validateBankAccStatus ",  validateBankAccStatus);
                // alert("validateBankAccStatus==false");
            }
    }

});

function updateAmountButtons(freq){
    if(freq=='regular'){
        
        $('.amount-button span').each(function(i) {
          $( this ).text(regular[i]);
        });
    } else {
        
        $('.amount-button span').each(function(i) {
          $( this ).text(single[i]);
        }); 
    }
};

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
            $('#en__field_supporter_emailAddress').before('<div class="errorMessage">' + customErrorMessage + '</div>');
            
            $('#en__field_supporter_emailAddress').addClass('errorBorder');
        break;
        case "phone":
            $('#error-phoneNumber').text(customErrorMessage);
            $('#error-phoneNumber').show();
            $('.parsley-errors-list').hide();
        break;
        case "phoneLength":
            $('#error-phoneLength').text(customErrorMessage);
            if(customErrorMessage=="ok"){
                $('#error-phoneLength').css( "color", "green" );
                phoneLengthOK = true;
                console.log("green");
            } else {
                $('#error-phoneLength').css( "color", "red" );
                phoneLengthOK = false;
                console.log("red");
            }
            $('#error-phoneLength').show();
            $('.parsley-errors-list').hide();
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

$('#showHiddenFields').click(function(event){
    event.preventDefault();
    $('.hidden-fields-block').slideToggle();
});


$('#maskedCC').click(function(){
   console.log(this);
   if($('#maskedCC').prop('disabled')==true){
       console.log("#maskedCC disabled");
   }
});

if ($(window).width() < 600) {
  console.log('Less than 960');
  var prompt = $('.en__component--column en__component--column--1 .en__component--copyblock p strong').text();
  console.log( "prompt", prompt );
  //   .text("Please donate now.")
}
else {
  console.log('More than 600');
}

$('#summary').append('<div id="error-captcha">captcha error</div>');

// remove &nbsp;
$('#error-phoneNumber').text('');
$('#error-phoneLength').text('');

$('#ccParsleyError').text('');

$('#en__field_transaction_donationAmt3').click(function(){
    var check = $(this).parent().next();
    console.log('$(this).parent()', check.attr("id") );
    // if( check.attr("id") == "currency"){
    //     $(this).parent().after('<div id="currency">$</div>');
    // }
});

$('.en__field__item--other input').keyup(function (){
    var currentOtherVal = this.value;
    console.log("currentOtherVal", currentOtherVal);
    
    if(currentOtherVal.charAt(0)=="$"){
        currentOtherVal=currentOtherVal.substring(1);
        console.log("currentOtherVal", currentOtherVal);
        $('.en__field__item--other input').val(currentOtherVal);
    }
});
