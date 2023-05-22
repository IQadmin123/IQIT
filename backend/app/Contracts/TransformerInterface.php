<?php

namespace App\Contracts;

use Spatie\DataTransferObject\DataTransferObject;

interface TransformerInterface
{
    public function __construct(array|object $input, string $dto);

    public function transform(): DataTransferObject;

    public function mappings(): array;
}
