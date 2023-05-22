# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AccountEmailaddress(models.Model):
    id = models.IntegerField(primary_key=True)
    email = models.CharField(unique=True, max_length=254)
    verified = models.BooleanField()
    primary = models.BooleanField()
    user = models.ForeignKey('GoogleLoginUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'account_emailaddress'


class AccountEmailconfirmation(models.Model):
    id = models.IntegerField(primary_key=True)
    created = models.DateTimeField()
    sent = models.DateTimeField(blank=True, null=True)
    key = models.CharField(unique=True, max_length=64)
    email_address = models.ForeignKey(AccountEmailaddress, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'account_emailconfirmation'


class AuthGroup(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigIntegerField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)
# Unable to inspect table 'authtoken_token'
# The error was: list index out of range


class CustomerCustomerDetails(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=200)
    email = models.CharField(unique=True, max_length=254)
    phone_number = models.CharField(max_length=31, blank=True, null=True)
    location = models.CharField(max_length=50)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'customer_customer_details'


class DjangoAdminLog(models.Model):
    id = models.IntegerField(primary_key=True)
    action_time = models.DateTimeField()
    object_id = models.CharField(max_length=65535, blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.CharField(max_length=65535)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('GoogleLoginUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    id = models.IntegerField(primary_key=True)
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigIntegerField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.CharField(max_length=65535)
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class DjangoSite(models.Model):
    id = models.IntegerField(primary_key=True)
    domain = models.CharField(unique=True, max_length=100)
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'django_site'


class GamesGameDetail(models.Model):
    id = models.BigIntegerField(primary_key=True)
    game_name = models.CharField(max_length=50)
    short_name = models.CharField(unique=True, max_length=20)
    category = models.CharField(max_length=20)
    image = models.CharField(max_length=100)
    details = models.CharField(max_length=5000)
    customer_id = models.ForeignKey(CustomerCustomerDetails, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'games_game_detail'


class GoogleLoginUser(models.Model):
    id = models.BigIntegerField(primary_key=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()
    email = models.CharField(unique=True, max_length=254)
    mobile_number = models.CharField(max_length=31, blank=True, null=True)
    location = models.CharField(max_length=50)
    name = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'google_login_user'


class GoogleLoginUserGroups(models.Model):
    id = models.BigIntegerField(primary_key=True)
    user = models.ForeignKey(GoogleLoginUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'google_login_user_groups'
        unique_together = (('user', 'group'),)


class GoogleLoginUserUserPermissions(models.Model):
    id = models.BigIntegerField(primary_key=True)
    user = models.ForeignKey(GoogleLoginUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'google_login_user_user_permissions'
        unique_together = (('user', 'permission'),)


class PartnersChildRefid(models.Model):
    id = models.BigIntegerField(primary_key=True)
    child = models.CharField(unique=True, max_length=30)
    parent_refid = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'partners_child_refid'


class PartnersCountry(models.Model):
    id = models.BigIntegerField(primary_key=True)
    country_name = models.CharField(max_length=300)

    class Meta:
        managed = False
        db_table = 'partners_country'


class PartnersPartner(models.Model):
    id = models.BigIntegerField(primary_key=True)
    refid = models.CharField(max_length=30)
    partner_name = models.CharField(max_length=100)
    department = models.CharField(max_length=30)
    start_date = models.DateField()
    end_date = models.DateField()
    country = models.CharField(max_length=12)
    share_cost = models.IntegerField()
    cpl_cost = models.FloatField()
    multiple_refid = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'partners_partner'


class PartnersRefstatsSums(models.Model):
    id = models.BigIntegerField(primary_key=True)
    referral = models.CharField(max_length=300)

    class Meta:
        managed = False
        db_table = 'partners_refstats_sums'
# Unable to inspect table 'temp'
# The error was: list index out of range


class VenueIdent(models.Model):
    venueid = models.BigIntegerField(primary_key=True)
    venuename = models.CharField(max_length=100, blank=True, null=True)
    venuecity = models.CharField(max_length=30, blank=True, null=True)
    venuestate = models.CharField(max_length=2, blank=True, null=True)
    venueseats = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'venue_ident'
