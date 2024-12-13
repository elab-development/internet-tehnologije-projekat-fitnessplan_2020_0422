<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    public const TABLE = 'exercises';

    protected $table = self::TABLE;

    protected $fillable = [
        'name',
        'description',
    ];

    public function workoutParts()
    {
        return $this->hasMany(WorkoutPart::class);
    }
}
