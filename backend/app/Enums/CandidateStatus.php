<?php

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;

/**
 * @method static self NEW()
 * @method static self TELEPHONIC()
 * @method static self HRROUND()
 * @method static self TECHNICALROUND()
 * @method static self FINALROUND()
 * @method static self ACCEPTED()
 * @method static self REJECTED()
 */
final class CandidateStatus extends Enum
{
    protected static function values(): array
    {
        return [
            'NEW' => 'new',
            'TELEPHONIC' => 'telephonic',
            'HRROUND' => 'hr_round',
            'TECHNICALROUND' => 'technical_round',
            'FINALROUND' => 'final_round',
            'ACCEPTED' => 'accepted',
            'REJECTED' => 'rejected',
        ];
    }

    protected static function labels(): array
    {
        return [
            'NEW' => 'New',
            'TELEPHONIC' => 'Telephonic',
            'HRROUND' => 'Hr Round',
            'TECHNICALROUND' => 'Technical Round',
            'FINALROUND' => 'Final Round',
            'ACCEPTED' => 'Accepted',
            'REJECTED' => 'Rejected',
        ];
    }
}
