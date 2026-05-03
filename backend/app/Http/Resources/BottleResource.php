<?php

namespace App\Http\Resources;

use App\Models\Price;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BottleResource extends JsonResource
{
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'name' => $this->name,
            'size_ml' => $this->size_ml,
            'base_price' => $this->base_price,

            'ingredients' => $this->ingredients->map(function ($ingredient) {
                return [
                    'id' => $ingredient->id,
                    'name' => $ingredient->name,
                    'unit' => $ingredient->unit,
                    'cost_per_unit' => $ingredient->cost_per_unit,
                    'quantity' => $ingredient->pivot->quantity,
                ];
            }),

            'price' => $this->latestPrice?->total_price,
        ];
    }
}
