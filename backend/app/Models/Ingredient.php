<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    protected $fillable = ['name', 'unit', 'cost_per_unit'];

    public function bottles()
    {
        return $this->belongsToMany(Bottle::class)
            ->withPivot('quantity')
            ->withTimestamps();
    }
}
