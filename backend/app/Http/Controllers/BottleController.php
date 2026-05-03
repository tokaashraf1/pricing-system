<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBottleRequest;
use App\Http\Requests\UpdateBottleRequest;
use App\Http\Resources\BottleResource;
use App\Models\Bottle;
use App\Services\BottleService;
use Illuminate\Http\Request;

class BottleController extends Controller
{
    protected BottleService $bottleService;

    public function __construct(BottleService $bottleService)
    {
        $this->bottleService = $bottleService;
    }

    public function index()
    {
        $bottles = $this->bottleService->getAllBottles();

        return BottleResource::collection($bottles);
    }

    public function show($id)
    {
        $bottle = $this->bottleService->getBottleById($id);

        return new BottleResource($bottle);
    }

    public function store(CreateBottleRequest $request)
    {
        $bottle = $this->bottleService->createBottleWithIngredients(
            $request->validated()
        );

        return new BottleResource($bottle);
    }
    public function update(UpdateBottleRequest $request, $id)
    {
        $bottle = Bottle::findOrFail($id);
        $bottle = $this->bottleService->updateBottleWithIngredients($bottle, $request->validated());
        return new BottleResource($bottle);
    }

    public function destroy($id)
    {
        $bottle = $this->bottleService->getBottleById($id);

        $this->bottleService->deleteBottle($bottle);

        return response()->json([
            'message' => 'Bottle deleted successfully'
        ]);
    }
    public function getAllIngredients()
    {
        $ingredients = $this->bottleService->getAllIngredients();

        return response()->json($ingredients);
    }
}
