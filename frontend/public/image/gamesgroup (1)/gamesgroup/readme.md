## To perform migration on particular schema of django app named as partners.
```
python manage.py custom_migrations -s mj -a g_partners
```

## To perform migration on all schema of django app named as partners.
```
python manage.py custom_migrations -s all -a partners
```
## To insert missing refid in partners_auto table with adding column is_organic as true
```
python manage.py missing_refid
```
## To run add-csv function in background.
### First install library celery and redis from requirement.txt file.
```
sudo apt update
sudo apt install redis-server
```
```
redis-cli ping
```
#### To run django_q in background.
```
python manage.py qcluster #For starting cluster.

```
```
python manage.py qinfo --config #To view configration of settings files have applied.
```
```
python manage.py qinfo #Check overall statistics.
```
```
python manage.py qmonitor #Monitor your clusters.
```

#### To run celery workers in background -Q queue_name and -c number_of_workers to define number of workers.
```
celery -A gamesgroup.celery worker -l info -Q csv_operation
```
#### TO run celery workers in background to calculate spendings with assigned queue named as calculate_spendings.
```
celery -A gamesgroup.celery worker -l info -Q calculate_spendings
```
#### Postman link to test API
```
https://www.getpostman.com/collections/709b5ae587ecce318f24
```

#### Reset django_migration table.
```
python manage.py migrate partners zero
python manage.py migrate games zero
python manage.py migrate google_login zero
python manage.py migrate sessions zero
python manage.py migrate contenttypes zero
python manage.py migrate auth zero
python manage.py migrate customer zero
<!-- We can truncate public.django_migration if we dont want entry of previous django migrations.-->
python manage.py migrate
```

#### To create super user
```
python manage.py createsuperuser --email admin@admin.com --username admin
python manage.py runserver
```
#### After this need to get access token from login api
```
curl --location --request POST 'http://127.0.0.1:8000/api/login' \
--header 'Accept: application/json' \
--header 'Cookie: csrftoken=w6bSTroxUKDCQ2RVxCuKfJQmbXTIj9gdSHHXOPgPGw6XQJhnDhMjOnnBvAUgGNNt; sessionid=qybna45p2ww1r2f1j8bqjg9k39lnc5i0' \
--form 'username="admin"' \
--form 'password="admin"'
```
