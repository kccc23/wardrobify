from django.db import models
from django.urls import reverse

#might need to add a few more properties to the VO
class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)

class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture = models.URLField()
    bin = models.ForeignKey(
        BinVO,
        related_name="shoe",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.model_name

    def get_api_url(self):
        return reverse("api_show_show", kwargs={"id": self.id})
