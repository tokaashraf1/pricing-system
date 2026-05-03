<?php

namespace App\Services;

use App\Models\Bottle;
use App\Models\Ingredient;
use App\Models\Price;
use App\Repositories\BottleRepository;
use App\Repositories\IngredientRepository;
use App\Repositories\PriceRepository;

class BottleService
{
    public function __construct(
        protected BottleRepository $bottleRepo,
        protected IngredientRepository $ingredientRepo,
        protected PriceRepository $priceRepo
    ) {}

    public function calculateAndStorePrice($bottle)
    {
        $bottle->load('ingredients');

        $ingredientsCost = $bottle->ingredients->sum(function ($ingredient) {
            return $ingredient->pivot->quantity * $ingredient->cost_per_unit;
        });

        $totalPrice = round($bottle->base_price + $ingredientsCost, 2);

        $this->priceRepo->create([
            'bottle_id' => $bottle->id,
            'total_price' => $totalPrice,
        ]);

        return $totalPrice;
    }
    public function getAllBottles()
    {
        return $this->bottleRepo
            ->with(['ingredients', 'latestPrice'])
            ->get();
    }

    public function getBottleById($id)
    {
        return $this->bottleRepo
            ->with(['ingredients', 'latestPrice'])
            ->find($id);
    }
    public function createBottleWithIngredients(array $data)
    {
        $bottle = $this->bottleRepo->create([
            'name' => $data['name'],
            'size_ml' => $data['size_ml'],
            'base_price' => $data['base_price'],
        ]);

        $attachData = [];

        foreach ($data['ingredients'] as $item) {
            $attachData[$item['id']] = [
                'quantity' => $item['quantity']
            ];
        }

        $bottle->ingredients()->attach($attachData);

        $totalPrice = $this->calculateAndStorePrice($bottle);

        return $this->bottleRepo
            ->with(['ingredients', 'latestPrice'])
            ->find($bottle->id);
    }


    public function updateBottleWithIngredients(Bottle $bottle, array $data)
    {
        $this->bottleRepo->update($bottle->id, [
            'name' => $data['name'] ?? $bottle->name,
            'size_ml' => $data['size_ml'] ?? $bottle->size_ml,
            'base_price' => $data['base_price'] ?? $bottle->base_price,
        ]);

        if (!empty($data['ingredients'])) {

            $attachData = [];

            foreach ($data['ingredients'] as $item) {
                $attachData[$item['id']] = [
                    'quantity' => $item['quantity']
                ];
            }
            $bottle->ingredients()->sync($attachData);
        }

        $totalPrice = $this->calculateAndStorePrice($bottle);
        return $this->bottleRepo
            ->with(['ingredients', 'latestPrice'])
            ->find($bottle->id);
    }

    public function deleteBottle(Bottle $bottle): void
    {
        $bottle->ingredients()->detach();
        $this->bottleRepo->delete($bottle->id);
    }
    public function findBottleOrFail($id)
    {
        return $this->bottleRepo
            ->with(['ingredients', 'latestPrice'])
            ->find($id);
    }
    public function getAllIngredients()
    {
        return $this->ingredientRepo->get();
    }
}
