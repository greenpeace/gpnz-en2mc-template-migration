# EN2MC
## Engaging Networks migration to Marketing Cloud - Template Documentation

## Style Guide
* P4 Design styleguide https://planet4.greenpeace.org/style-guide/
* P4 Form example https://www.greenpeace.org/new-zealand/subscribe/

## Live page examples:
* Petition fixed-top https://act.greenpeace.org/page/59284/petition/1
* General donation (single column option required): https://act.greenpeace.org/page/35110/donate/1
* Email To Target https://act.greenpeace.org/page/55056/action/1
* Email Preferences https://act.greenpeace.org/page/46440/subscriptions/1

### Pages are constructed from several elements:
* Global template Header & Footer (developer only)
* Editor & Form blocks (for teams to personalise campaigns)
  * library save/load can be used across multiple campaigns
* Hidden fields - used to validate/reformat for SF Staging
* EN default scripts & stylesheets
* Custom JS/JQ Libraries/Scripts
  * Validation: Parsley validation https://parsleyjs.org/
  * Tracking: Google Tag Manager - includes global scripts e.g. Facebook Pixel, Google Analytics
  * AddressFinder https://addressfinder.nz/
  * NZ Bank account verification https://github.com/wytlytningNZ/NZ-Bank-Account-Validator
  * Credit Card number format validation https://github.com/nosir/cleave.js
  * Phone number format mask https://github.com/RobinHerbots/Inputmask
  * (optional) Country prefix flag https://github.com/jackocnr/intl-tel-input (intl numbers are not called)

* Custom stylesheets
  * Bootstrap
  * Font Awesome
  * GPNZ P4 (website) style
  
* WYSIWYG Editor elements
  * Rows
  * Text Block
  * Text Image
  * Text Code
  * Auto Responder
  * Conditional
  * Social/Share
  * Widgets
  * Redirect

## Important Notes

Mobile forms need to be near top of page. 
EN uses flex-box so we've overridden thier flex CSS to acheive this.
