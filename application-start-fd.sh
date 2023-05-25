#!/bin/bash
cd /var/www/tcg_backend_dev
php bin/console doctrine:migration:migrate -n
php bin/console cache:clear