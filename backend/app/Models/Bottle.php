<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bottle extends Model
{
    protected $fillable = ['name', 'size_ml', 'base_price'];

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class)
            ->withPivot('quantity')
            ->withTimestamps();
    }

    public function prices()
    {
        return $this->hasMany(Price::class);
    }

    public function latestPrice()
    {
        return $this->hasOne(Price::class)->latestOfMany();
    }
}
