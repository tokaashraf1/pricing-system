<?php

namespace App\Repositories;

use App\Models\Price;

class PriceRepository extends BaseRepository
{
    public function __construct(Price $price)
    {
        $this->model = $price;
    }
}
