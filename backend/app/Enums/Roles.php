<?php

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;

/**
 * @method static self ADMIN()
 * @method static self HR()
 */
final class Roles extends Enum
{
    protected static function values(): array
    {
        return [
            'ADMIN' => 1,
            'HR' => 2,
        ];
    }

    protected static function labels(): array
    {
        return [
            'ADMIN' => 'Admin',
            'HR' => 'Hr',
        ];
    }
}
