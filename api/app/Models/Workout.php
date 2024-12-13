<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    use HasFactory;

    public const TABLE = 'workouts';

    protected $table = self::TABLE;

    protected $fillable = [
        'name',
        'workout_date',
        'intensity_id',
    ];

    public function intensity()
    {
        return $this->belongsTo(Intensity::class);
    }

    public function workoutParts()
    {
        return $this->hasMany(WorkoutPart::class);
    }
}
