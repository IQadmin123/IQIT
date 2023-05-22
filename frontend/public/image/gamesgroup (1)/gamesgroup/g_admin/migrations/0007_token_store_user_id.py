# Generated by Django 3.2.13 on 2022-11-04 11:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('g_admin', '0006_remove_token_store_is_expire'),
    ]

    operations = [
        migrations.AddField(
            model_name='token_store',
            name='user_id',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]