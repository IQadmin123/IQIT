<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder as QueryBuilder;

interface QueryInterface
{
    public function compose(array $params = []): EloquentBuilder|QueryBuilder;
}
