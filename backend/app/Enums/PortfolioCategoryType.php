<?php

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;

/**
 * @method static self APP()
 * @method static self DESIGN()
 * @method static self WEB()
 */
final class PortfolioCategoryType extends Enum
{
    protected static function values(): array
    {
        return [
            'APP' => 1,
            'DESIGN' => 2,
            'WEB' => 3,
        ];
    }

    protected static function labels(): array
    {
        return [
            'APP' => 'App',
            'DESIGN' => 'Design',
            'WEB' => 'Web',
        ];
    }
}
