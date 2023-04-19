from django.db import models

class ShoeVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    model_name = models.CharField(max_length=200)

class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture = models.URLField()
    bin = models.ForeignKey(
        ShoeVO,
        related_name="shoe",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name
