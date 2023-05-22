from django.db import models
from g_customer.models import customer_details


class Game_Detail(models.Model):
    game_name=models.CharField(default='N/A',max_length=50)
    short_name=models.CharField(max_length=20,default='N/A',unique=True)
    category=models.CharField(max_length=20,default='N/A')
    image=models.FileField(upload_to='images/')
    details=models.CharField(default=' ',max_length=5000)
    customer_id=models.ForeignKey(customer_details,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table='games_detail'
    def __str__(self):
        return f'{self.id}'