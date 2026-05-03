<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    protected $fillable = ['bottle_id', 'total_price'];

    public function bottle()
    {
        return $this->belongsTo(Bottle::class);
    }
}
