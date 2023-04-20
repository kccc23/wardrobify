# Wardrobify

Team:

* Jason Jang - Shoe
* Kaining Chen - Hat

## Design

Welcome to the newest in Wardrobe technology. We used cutting-edge technology to generate an app that will take care of the hassle that is organizing your massive wardrobe.
Got too many hats? Too many shoes? Too little time to put them into their respective bins and wardrobes? Well, look no further than Wardrobify.
With our app, you can add hats or shoes to your wardrobe and specify which shoe bin and hat location you wish, just as you always dreamed of.
Use the navigation page from anywhere to access either hat or shoe at your own leisure!
Add hats based on their fabric, style, and color. A picture will also be included so you may identify your hat with a quick glance.
Of course, we haven't forgotten about the shoes. Shoes may also be added based on their manufacturer, model name, and color. Picture identification is also included in our shoes.
If you threw out a hat or shoe, don't fret, for Wardrobify's new "DELETE" function allows our users to delete any item they created from the app itself.
    The hats delete function comes with a beautiful "confirmation" design that asks you if you truly wish to dispose of your selected hat. This way, you avoid any accidental deletions.
    This feature is coming soon to shoes!

*Disclaimer: Wardrobify does not and will not organize any other articles of clothing. Wardrobify is not responsible for any lost articles of t-shirts, pants, socks, or any other articles of clothing.
User experience may vary.

## Shoes microservice

The shoes microservice provides a method in which you may store and create hats based on the bins located in the wardrobes microservice by taking a bin value object and linking it to a shoe object

You may create a shoe by specifying its manufacturer, model name, color, image, and the bin in which the shoe belongs to.

RESTful APIs are used to view, create and delete shoes.

Used polling to run in specific time intervals to acquire data from the wardrobe microservice.

## Hats microservice

The hats microservice tracks and provides information about hats (including fabric, style, color and picture of each hat, plus the location in the wardrobe where it locates).

We use RESTful APIs to access all the hats, create a new hats and delete an existing hat on the service side. The user can access and execute these functions from the browser.

There is a polling task running in an interval time to get the location data from wardrobe microservice, which tracks and provides informaiton about locations and bins inside the wardrobe.
