<?php

namespace App\Foundation;

use Exception;

abstract class Rules
{
    /**
     * Check rules
     *
     * @return bool
     */
    public function check(): bool
    {
        try {
            $this->enforce();
        } catch (Exception $e) {
            return false;
        }

        return true;
    }
}
