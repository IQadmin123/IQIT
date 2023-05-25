#!/bin/bash
cd /var/www/iqit_backend_dev

composer install
php artisan key-generate


