FROM php:8.1-apache

RUN mkdir /app
WORKDIR /app

COPY . /app/


# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath gd
    

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer




RUN composer update && composer install && chmod +x /app/artisan

WORKDIR /app
# USER $user
EXPOSE 8000
CMD ["php", "/app/artisan", "serve", "--host=0.0.0.0", "--port=8000" ]
