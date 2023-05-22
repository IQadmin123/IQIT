<?php

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;

/**
 * @method static self FRONTEND()
 * @method static self BACKEND()
 * @method static self IOS()
 * @method static self ANDROID()
 * @method static self SALES()
 */
final class JobCategoryType extends Enum
{
    protected static function values(): array
    {
        return [
            'FRONTEND' => 1,
            'BACKEND' => 2,
            'IOS' => 3,
            'ANDROID' => 4,
            'SALES' => 5,
        ];
    }

    protected static function labels(): array
    {
        return [
            'FRONTEND' => 'Front-end developer',
            'BACKEND' => 'Back-end developer',
            'IOS' => 'Ios',
            'ANDROID' => 'Android',
            'SALES' => 'Sales',
        ];
    }
}
