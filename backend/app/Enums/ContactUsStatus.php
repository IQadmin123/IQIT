<?php

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;

/**
 * @method static self READ()
 * @method static self UNREAD()
 */
final class ContactUsStatus extends Enum
{
    protected static function values(): array
    {
        return [
            'READ' => 'read',
            'UNREAD' => 'unread',
        ];
    }

    protected static function labels(): array
    {
        return [
            'READ' => 'Read',
            'UNREAD' => 'Unread',
        ];
    }
}
