# Generated by Django 3.2.9 on 2021-12-08 01:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocialComp', '0004_auto_20211204_1517'),
    ]

    operations = [
        migrations.AddField(
            model_name='postmodel',
            name='QueryId',
            field=models.CharField(default=3, max_length=100),
            preserve_default=False,
        ),
    ]