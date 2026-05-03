<?php

namespace App\Repositories;

use App\Models\Bottle;

class BottleRepository extends BaseRepository
{
    public function __construct(Bottle $bottle)
    {
        $this->model = $bottle;
    }
}
