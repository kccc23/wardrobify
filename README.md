# Wardrobify

Team:

* Jason Jang - Shoe
* Kaining Chen - Hat

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

## Hats microservice

The hats microservice tracks and provides information about hats, which includes fabric, style, color and picture of each hat, plus the location in the wardrobe where it locates.

We use RESTful APIs to access all the hats, create a new hat and delete an existed hat on the service side.

There is a polling task running in an interval time to get the location data from wardrobe microservice, which tracks and provides informaiton about locations and bins inside the wardrobe.