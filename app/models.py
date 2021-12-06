from django.db import models
from django.contrib.auth.models import User
from djongo.models.fields import ObjectIdField
from django.core.validators import MinValueValidator


class Profile(models.Model):
    _id = ObjectIdField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=42)
    private_key = models.CharField(max_length=56)

    def __str__(self):
        return f"{self.user}({self._id})"


class TokenNft(models.Model):
    _id = ObjectIdField()
    image = models.ImageField(upload_to='media/', null=True, blank=True)
    name = models.CharField(max_length=200)
    uri = models.CharField(max_length=200)
    token_id = models.IntegerField(default=0)
    price = models.FloatField(validators=[MinValueValidator(0.1)])

    def __str__(self):
        return f"{self.name}({self.token_id})"
# Create your models here.
