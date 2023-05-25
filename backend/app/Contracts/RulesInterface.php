<?php

namespace App\Contracts;

interface RulesInterface
{
    public function check(): bool;

    public function enforce();
}
