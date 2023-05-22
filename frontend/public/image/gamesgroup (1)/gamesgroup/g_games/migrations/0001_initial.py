# Generated by Django 3.2.13 on 2022-10-20 10:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('g_customer', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Game_Detail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('game_name', models.CharField(default='N/A', max_length=50)),
                ('short_name', models.CharField(default='N/A', max_length=20, unique=True)),
                ('category', models.CharField(default='N/A', max_length=20)),
                ('image', models.FileField(upload_to='images/')),
                ('details', models.CharField(default=' ', max_length=5000)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('customer_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='g_customer.customer_details')),
            ],
        ),
    ]