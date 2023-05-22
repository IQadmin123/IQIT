from datetime import datetime
from django.db import models

class country(models.Model):
    iso_name = models.CharField(max_length=300, default='')
    country_name = models.CharField(max_length=300, default='')

    class Meta:
        managed = False
        # db_table = 'public\".\"country'
        db_table = 'country'


class Partner(models.Model):
    refid = models.CharField(max_length=200, default='')
    partner_name = models.CharField(max_length=200, default='')
    department = models.CharField(max_length=200, default='')
    start_date = models.DateField(default=datetime.now)
    end_date = models.DateField(default=datetime.now)
    share_cost = models.IntegerField(default=0)
    cpl_cost = models.FloatField(default=0)
    is_organic = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    ref_stream = models.CharField(max_length=200, default='', null=True, blank=True)
    bei_partner = models.CharField(max_length=200, default='', null=True, blank=True)
    valid = models.IntegerField(default=1)
    credit = models.FloatField(default=0)
    report = models.FloatField(default=0)

    def __str__(self):
        return f'{self.id}'

    class Meta:
        db_table = 'partners_auto'


class child_refid(models.Model):
    child = models.CharField(max_length=200, unique=True)
    parent_refid = models.CharField(max_length=200)
    # parent_refid = models.ForeignKey(Partner,related_name='child_ref',on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f'{self.child}'

    class Meta:
        db_table = 'partners_child_auto'


class PartnerCountry(models.Model):
    partner = models.ForeignKey(Partner, on_delete=models.CASCADE,related_name='country')
    country_id = models.IntegerField(default=0)
    country = models.CharField(max_length=30, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'partners_country_auto'
    def __str__(self):
        return  str(self.country)


class PartnerPlatform(models.Model):
    partner = models.ForeignKey(Partner, on_delete=models.CASCADE,related_name='platform')
    platform = models.CharField(max_length=2000, default='', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'partners_platform_auto'
    def __str__(self):
        return str(self.platform)


class PartnersRefstatSums(models.Model):
    current_date = models.DateField(default=datetime.now, db_column='date')
    country = models.CharField(max_length=16383)
    referral = models.CharField(max_length=16383, primary_key=True)
    regs = models.IntegerField()
    nau = models.IntegerField()
    dau = models.IntegerField()
    actives = models.IntegerField()
    mau = models.IntegerField()
    returnees = models.IntegerField()
    itrans_euro = models.FloatField(db_column='itrans euro')
    napu = models.IntegerField()
    dapu = models.IntegerField()
    activepayuser = models.IntegerField()
    mapu = models.IntegerField()
    returneespayuser = models.IntegerField()
    net_euro = models.FloatField(db_column="net euro")
    three_d_retention = models.IntegerField(db_column="3d_retention")
    seven_d_retention = models.IntegerField(db_column="7d_retention")
    platform = models.TextField(default='',blank=False, null=False, db_column="platform")

    class Meta:
        db_table = 'refstats_sums'

class SpedingsAuto(models.Model):
    date=models.DateField(default=datetime.now, db_column='date')
    net_euro=models.FloatField(db_column='net euro')
    regs=models.FloatField(default=0)
    share_cost=models.FloatField()
    cpl_cost=models.FloatField()
    refid=models.TextField(blank=False,null=False)
    platform=models.TextField(blank=False,null=False)
    country=models.TextField(blank=False,null=False)
    class Meta:
        db_table = 'spendings_auto'