# Generated by Django 4.0.3 on 2023-04-19 19:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0002_rename_shoevo_binvo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='binvo',
            name='model_name',
        ),
    ]
